
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  displayName: string | null;
}

interface UserProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {}
});

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication for development until Firebase is configured
  useEffect(() => {
    // Simulate auth loading
    setTimeout(() => {
      setIsLoading(false);
      
      // Check for development mock auth
      if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
        console.log('Using mock authentication');
        // Simulate a logged in user for development
        setUser({
          id: 'mock-user-id',
          email: 'dev@example.com',
          displayName: 'Dev User'
        });
        setProfile({
          id: 'mock-profile-id',
          firstName: 'Dev',
          lastName: 'User',
          role: 'member'
        });
      }
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Login attempt with:', email);
      // Mock login for now
      setUser({
        id: 'mock-user-id',
        email,
        displayName: email.split('@')[0]
      });
      setProfile({
        id: 'mock-profile-id',
        firstName: email.split('@')[0],
        lastName: null,
        role: 'member'
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      console.log('Logging out');
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Signup attempt with:', email);
      // Mock signup for now
      setUser({
        id: 'new-user-id',
        email,
        displayName: email.split('@')[0]
      });
      setProfile({
        id: 'new-profile-id',
        firstName: null,
        lastName: null,
        role: 'member'
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
