
import React from 'react';
import { AuthContext } from './context';
import { AuthContextType, User } from './types';

// Create a dummy user that's always available
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
