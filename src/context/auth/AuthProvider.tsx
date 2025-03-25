
import React from 'react';
import { AuthContext } from './context';
import { AuthStateManager } from './AuthStateManager';
import { User } from './types';
import * as authFunctions from './authFunctions';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const signIn = async (email: string, password: string) => {
    try {
      return await authFunctions.signIn(email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      return { user: null, error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      return await authFunctions.signUp(email, password);
    } catch (error) {
      console.error('Error signing up:', error);
      return { user: null, error };
    }
  };

  const signOut = async () => {
    try {
      return await authFunctions.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  };

  return (
    <AuthStateManager>
      {({ user, isLoading, wrappedUpdateUserProfile }) => (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            profile: user,
            signIn,
            signUp,
            signOut,
            updateUserProfile: wrappedUpdateUserProfile,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </AuthStateManager>
  );
};
