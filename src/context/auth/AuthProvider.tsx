
import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, User } from './types';

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | null>(null);

// Mock user for development
const mockUser: User = {
  uid: 'mock-user',
  id: 'mock-user',
  email: 'user@example.com',
  name: 'Demo User',
  displayName: 'Demo User',
  role: 'member',
  profileCompleted: true,
  status: 'active',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simplified auth provider - no actual authentication
  useEffect(() => {
    console.log('Auth provider initialized - authentication disabled');
    // Just use the mock user for all interactions to prevent blank screens
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  // Mock authentication functions that don't do anything
  const authContextValue: AuthContextType = {
    user,
    profile: user,
    isAuthenticated: !!user,
    isLoading,
    login: async () => mockUser,
    signIn: async () => mockUser,
    signUp: async () => mockUser,
    logout: async () => {},
    updateUserProfile: async () => {},
    createUser: async () => mockUser,
    getAllUsers: async () => [mockUser],
    updateUserRole: async () => {},
    deleteUser: async () => {}
  };

  console.log('AuthProvider rendering');
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
