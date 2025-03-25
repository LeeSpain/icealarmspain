
import { createContext } from 'react';
import { AuthContextType } from './types';

// Create a default context with sensible defaults
export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ error: new Error('Not implemented') }),
  signIn: async () => ({ error: new Error('Not implemented') }),
  signUp: async () => ({ error: new Error('Not implemented') }),
  logout: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
  updateProfile: async () => ({ success: false }),
  // Admin functions
  createUser: async () => ({ error: new Error('Not implemented') }),
  getAllUsers: async () => [],
  updateUserRole: async () => ({ success: false }),
  deleteUser: async () => ({ success: false }),
  hasRole: () => false
});
