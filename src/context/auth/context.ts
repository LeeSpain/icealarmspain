
import { createContext } from 'react';
import { AuthContextType } from './types';

// Create the initial auth context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {
    throw new Error('login not implemented');
  },
  signIn: async () => {
    throw new Error('signIn not implemented');
    return { error: 'Not implemented' };
  },
  signUp: async () => {
    throw new Error('signUp not implemented');
    return { error: 'Not implemented' };
  },
  logout: async () => {
    throw new Error('logout not implemented');
  },
  signOut: async () => {
    throw new Error('signOut not implemented');
  },
  updateUserProfile: async () => {
    throw new Error('updateUserProfile not implemented');
  },
  updateProfile: async () => {
    throw new Error('updateProfile not implemented');
  },
  createUser: async () => {
    throw new Error('createUser not implemented');
  },
  getAllUsers: async () => {
    throw new Error('getAllUsers not implemented');
    return [];
  },
  updateUserRole: async () => {
    throw new Error('updateUserRole not implemented');
  },
  deleteUser: async () => {
    throw new Error('deleteUser not implemented');
  },
  hasRole: () => false,
});
