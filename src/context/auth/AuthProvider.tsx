
import React, { createContext } from 'react';
import { AuthContextType, User } from './types';

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | null>(null);

// Create a dummy user that's always "logged in"
const dummyUser: User = {
  uid: 'dummy-user',
  id: 'dummy-user',
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
  // Create a dummy auth context that always provides a user
  const authContextValue: AuthContextType = {
    user: dummyUser,
    profile: dummyUser,
    isAuthenticated: true, // Always authenticated
    isLoading: false,
    login: async () => dummyUser,
    signIn: async () => dummyUser,
    signUp: async () => dummyUser,
    logout: async () => {},
    updateUserProfile: async () => {},
    createUser: async () => dummyUser,
    getAllUsers: async () => [dummyUser],
    updateUserRole: async () => {},
    deleteUser: async () => {}
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
