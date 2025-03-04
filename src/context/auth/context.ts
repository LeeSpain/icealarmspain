
import { createContext } from 'react';
import { AuthContextType } from './types';

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {
    throw new Error('login not implemented');
    return {} as any;
  },
  signIn: async () => {
    throw new Error('signIn not implemented');
    return false;
  },
  signUp: async () => {
    throw new Error('signUp not implemented');
    return {} as any;
  },
  logout: async () => {
    throw new Error('logout not implemented');
  },
  updateUserProfile: async () => {
    throw new Error('updateUserProfile not implemented');
  },
});
