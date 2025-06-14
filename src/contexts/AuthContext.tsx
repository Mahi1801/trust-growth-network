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
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  signup: (userData: SignupData) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticating: boolean;
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

  // Function to fetch user profile with retry logic
  const fetchProfile = async (userId: string, retryCount = 0) => {
    try {
      console.log(`Fetching profile for user: ${userId}, attempt: ${retryCount + 1}`);
      
      // WORKAROUND: Using 'as any' due to potential issues with auto-generated Supabase types (types.ts)
      // not recognizing the 'profiles' table. This allows the build to pass.
      // The underlying types.ts file should ideally be updated by the system to reflect the database schema.
      const { data, error } = await (supabase.from('profiles') as any)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist (PGRST116: 'Fetched result contains 0 rows') 
        // and we haven't retried too many times, wait and retry.
        if (error.code === 'PGRST116' && retryCount < 3) {
          console.log(`Profile not found, retrying in ${1000 * (retryCount + 1)}ms...`);
          setTimeout(() => {
            fetchProfile(userId, retryCount + 1); // Exponential backoff
          }, 1000 * (retryCount + 1));
          return;
        }
        // If error is not PGRST116 or retries exhausted, clear profile
        setProfile(null); 
        return;
      }

      console.log('Profile fetched successfully:', data);
      // Assuming 'data' matches the Profile interface structure after a successful fetch.
      setProfile(data as Profile); 
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setProfile(null); // Clear profile on any unexpected exception during fetch
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

  const login = async (email: string, password: string) => {
    if (isAuthenticating) return { error: new Error('Already authenticating') };
    
    setIsAuthenticating(true);
    
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
      
      // Wait a moment for the profile to be fetched
      setTimeout(() => {
        toast.success("Successfully logged in!");
      }, 500);
      
      return { error: null };
    } catch (error) {
      console.error('Login exception:', error);
      return { error: error as Error };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (userData: SignupData) => {
    if (isAuthenticating) return { error: new Error('Already authenticating') };
    
    setIsAuthenticating(true);
    
    try {
      console.log('Attempting signup for:', userData.email);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
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
      
      if (data.user && !data.user.email_confirmed_at) {
        toast.success("Account created! Please check your email to confirm your account.");
      } else {
        toast.success("Account created successfully!");
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
      isAuthenticating
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
