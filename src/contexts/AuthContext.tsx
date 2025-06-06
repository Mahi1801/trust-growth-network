
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

  // Function to fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      // Use raw SQL query to avoid TypeScript issues with missing table definitions
      const { data, error } = await supabase.rpc('get_user_profile', { user_id: userId });

      if (error) {
        console.error('Error fetching profile:', error);
        // If RPC doesn't exist, try direct query as fallback
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('profiles' as any)
          .select('*')
          .eq('id', userId)
          .single();
        
        if (fallbackError) {
          console.error('Error fetching profile with fallback:', fallbackError);
          return;
        }
        
        setProfile(fallbackData);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      // Fallback to direct query
      try {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('profiles' as any)
          .select('*')
          .eq('id', userId)
          .single();
        
        if (!fallbackError && fallbackData) {
          setProfile(fallbackData);
        }
      } catch (fallbackError) {
        console.error('Fallback profile fetch failed:', fallbackError);
      }
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
          }, 0);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { error };
      }

      // Auth state change will handle the rest
      return { error: null };
    } catch (error) {
      setIsLoading(false);
      return { error: error as Error };
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone,
            organization: userData.organization || null,
            location: userData.location,
            user_type: userData.userType,
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { error };
      }

      // Auth state change will handle the rest
      return { error: null };
    } catch (error) {
      setIsLoading(false);
      return { error: error as Error };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Error during logout:', error);
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
      isLoading 
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
