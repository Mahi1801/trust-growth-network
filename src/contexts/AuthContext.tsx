
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

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
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If profile doesn't exist and we haven't retried too many times, wait and retry
        if (error.code === 'PGRST116' && retryCount < 3) {
          setTimeout(() => {
            fetchProfile(userId, retryCount + 1);
          }, 1000 * (retryCount + 1)); // Exponential backoff
          return;
        }
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
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
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to prevent deadlocks
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 100);
        } else {
          setProfile(null);
        }
        
        // Only set loading to false if we're not currently authenticating
        if (!isAuthenticating) {
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 100);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isAuthenticating]);

  const login = async (email: string, password: string) => {
    setIsAuthenticating(true);
    
    try {
      // Clean up existing state first
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log('Global signout failed, continuing...');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setIsAuthenticating(false);
        return { error };
      }

      // Auth state change will handle the rest
      return { error: null };
    } catch (error) {
      setIsAuthenticating(false);
      return { error: error as Error };
    } finally {
      // Small delay to allow auth state to update
      setTimeout(() => {
        setIsAuthenticating(false);
      }, 500);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsAuthenticating(true);
    
    try {
      // Clean up existing state first
      cleanupAuthState();
      
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
        setIsAuthenticating(false);
        return { error };
      }

      // Auth state change will handle the rest
      return { error: null };
    } catch (error) {
      setIsAuthenticating(false);
      return { error: error as Error };
    } finally {
      // Small delay to allow auth state to update
      setTimeout(() => {
        setIsAuthenticating(false);
      }, 500);
    }
  };

  const logout = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('Global signout failed, continuing with local cleanup...');
      }
      
      // Reset state
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Force page reload for clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      // Force reload even if there's an error
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
