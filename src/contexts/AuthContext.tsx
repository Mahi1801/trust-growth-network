
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  organization: string | null;
  location: string | null;
  user_type: 'vendor' | 'ngo' | 'corporate' | 'admin' | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  login: (email: string, password: string, redirectTo?: string) => Promise<{ error: Error | null }>;
  signup: (userData: SignupData, redirectTo?: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticating: boolean;
  pendingRedirect: string | null;
  setPendingRedirect: (redirect: string | null) => void;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
  location: string;
  password: string;
  userType: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  // Function to fetch user profile with retry logic
  const fetchProfile = async (userId: string, retryCount = 0) => {
    try {
      console.log(`Fetching profile for user: ${userId}, attempt: ${retryCount + 1}`);
      
      // Try to fetch from profiles table
      // WORKAROUND: Using 'as any' because the 'profiles' table might not be in the auto-generated types
      // or might not exist in the DB, causing a TypeScript error.
      const { data, error } = await (supabase.from as any)('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        
        // If profile doesn't exist and we haven't retried too many times, wait and retry
        if (error.code === 'PGRST116' && retryCount < 3) {
          console.log(`Profile not found, retrying in ${1000 * (retryCount + 1)}ms...`);
          setTimeout(() => {
            fetchProfile(userId, retryCount + 1);
          }, 1000 * (retryCount + 1));
          return;
        }
        
        // If the profiles table doesn't exist or is not accessible, create a fallback profile
        console.log('Creating fallback profile from user metadata as profiles table might be missing or inaccessible.');
        const fallbackProfile: Profile = {
          id: userId,
          first_name: user?.user_metadata?.first_name || null,
          last_name: user?.user_metadata?.last_name || null,
          email: user?.email || null,
          phone: user?.user_metadata?.phone || null,
          organization: user?.user_metadata?.organization || null,
          location: user?.user_metadata?.location || null,
          user_type: user?.user_metadata?.user_type || 'vendor',
          created_at: user?.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(fallbackProfile);
        return;
      }

      console.log('Profile fetched successfully:', data);
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      
      // Create fallback profile on any unexpected exception
      console.log('Creating fallback profile due to exception in fetchProfile.');
      const fallbackProfile: Profile = {
        id: userId,
        first_name: user?.user_metadata?.first_name || null,
        last_name: user?.user_metadata?.last_name || null,
        email: user?.email || null,
        phone: user?.user_metadata?.phone || null,
        organization: user?.user_metadata?.organization || null,
        location: user?.user_metadata?.location || null,
        user_type: user?.user_metadata?.user_type || 'vendor',
        created_at: user?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProfile(fallbackProfile);
    }
  };

  // Cleanup auth state utility
  const cleanupAuthState = () => {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage if in use
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  };

  // Set up auth state listener
  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to prevent deadlocks
          setTimeout(() => {
            if (mounted) {
              fetchProfile(session.user.id);
            }
          }, 100);
        } else {
          setProfile(null);
        }
        
        // Set loading to false after processing auth change
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          if (mounted) {
            fetchProfile(session.user.id);
          }
        }, 100);
      }
      
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, redirectTo?: string) => {
    if (isAuthenticating) return { error: new Error('Already authenticating') };
    
    setIsAuthenticating(true);
    
    // Store redirect preference
    if (redirectTo) {
      setPendingRedirect(redirectTo);
    }
    
    try {
      console.log('Attempting login for:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { error };
      }

      console.log('Login successful:', data.user?.id);
      toast.success("Successfully logged in!");
      
      return { error: null };
    } catch (error) {
      console.error('Login exception:', error);
      return { error: error as Error };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (userData: SignupData, redirectTo?: string) => {
    if (isAuthenticating) return { error: new Error('Already authenticating') };
    
    setIsAuthenticating(true);
    
    // Store redirect preference
    if (redirectTo) {
      setPendingRedirect(redirectTo);
    }
    
    try {
      console.log('Attempting signup for:', userData.email);
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName.trim(),
            last_name: userData.lastName.trim(),
            phone: userData.phone.trim(),
            organization: userData.organization?.trim() || null,
            location: userData.location.trim(),
            user_type: userData.userType,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        return { error };
      }

      console.log('Signup successful:', data.user?.id);
      
      // Check if email confirmation is required
      if (data.user && !data.user.email_confirmed_at) {
        toast.success("Account created! Please check your email to confirm your account.");
      } else {
        toast.success("Account created and logged in successfully!");
      }
      
      return { error: null };
    } catch (error) {
      console.error('Signup exception:', error);
      return { error: error as Error };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      
      // Clear any pending redirects
      setPendingRedirect(null);
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      // Reset state
      setUser(null);
      setProfile(null);
      setSession(null);
      
      toast.success("Successfully logged out!");
      
      // Force page refresh to ensure clean state
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      
    } catch (error) {
      console.error('Error during logout:', error);
      // Force logout even if there's an error
      setUser(null);
      setProfile(null);
      setSession(null);
      setPendingRedirect(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      session, 
      login, 
      signup, 
      logout, 
      isLoading,
      isAuthenticating,
      pendingRedirect,
      setPendingRedirect
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
