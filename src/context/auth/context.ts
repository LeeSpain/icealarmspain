
import { createContext } from 'react';
import { AuthContextType, User } from './types';

// Create a dummy user
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

// Create a dummy context that's always available
const defaultAuthContext: AuthContextType = {
  user: dummyUser,
  profile: dummyUser,
  isAuthenticated: true,
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

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
