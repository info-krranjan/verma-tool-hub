import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface UserProfile {
  id: string
  username: string
  name?: string
  role: 'user' | 'admin' | 'superadmin'
  created_at: string
}

export interface User extends UserProfile {
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, username: string, name?: string) => Promise<boolean>;
  createAdmin: (email: string, password: string, username: string, name?: string, role?: 'admin') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
        return;
      }

      setUser({
        ...profile,
        email: authUser.email,
        role: profile.role as 'user' | 'admin' | 'superadmin'
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const signup = async (email: string, password: string, username: string, name?: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            name,
            role: 'user'
          }
        }
      });

      if (error) {
        console.error('Signup error:', error.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const createAdmin = async (email: string, password: string, username: string, name?: string, role: 'admin' = 'admin'): Promise<boolean> => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) {
        return false;
      }

      const response = await supabase.functions.invoke('create-admin', {
        body: { email, password, username, name, role },
        headers: {
          Authorization: `Bearer ${session.session.access_token}`
        }
      });

      if (response.error) {
        console.error('Create admin error:', response.error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Create admin error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, createAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};