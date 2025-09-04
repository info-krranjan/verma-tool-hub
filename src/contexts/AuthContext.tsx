import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, User as AuthUser } from '@/services/authService';

export interface UserProfile {
  _id: string
  username: string
  name?: string
  role: 'user' | 'admin' | 'superadmin'
  createdAt: Date
}

export interface User extends UserProfile {
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const authUser = await AuthService.verifyToken(token);
      if (authUser) {
        setUser({
          _id: authUser._id,
          username: authUser.username,
          name: authUser.name,
          role: authUser.role,
          createdAt: authUser.createdAt,
          email: authUser.email,
        });
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await AuthService.login(email, password);
      
      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token);
        setUser({
          _id: response.user._id,
          username: response.user.username,
          name: response.user.name,
          role: response.user.role,
          createdAt: response.user.createdAt,
          email: response.user.email,
        });
        return true;
      } else {
        console.error('Login error:', response.message);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('auth_token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const signup = async (email: string, password: string, username: string, name?: string): Promise<boolean> => {
    try {
      const response = await AuthService.signup({
        email,
        password,
        username,
        name,
      });

      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token);
        setUser({
          _id: response.user._id,
          username: response.user.username,
          name: response.user.name,
          role: response.user.role,
          createdAt: response.user.createdAt,
          email: response.user.email,
        });
        return true;
      } else {
        console.error('Signup error:', response.message);
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const createAdmin = async (email: string, password: string, username: string, name?: string, role: 'admin' = 'admin'): Promise<boolean> => {
    try {
      // Check if current user is admin/superadmin
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        console.error('Only admins can create other admin users');
        return false;
      }

      const response = await AuthService.createAdmin({
        email,
        password,
        username,
        name,
      });

      if (response.success) {
        return true;
      } else {
        console.error('Create admin error:', response.message);
        return false;
      }
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