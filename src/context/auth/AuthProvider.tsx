
import React from 'react';
import { AuthContext } from './context';
import { AuthStateManager } from './AuthStateManager';
import { User } from './types';
import * as authFunctions from './authFunctions';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const signIn = async (email: string, password: string, rememberMe?: boolean) => {
    try {
      // Call the login function (aliased as signIn in authFunctions)
      const user = await authFunctions.login(email, password, rememberMe || false);
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const result = await authFunctions.signUp(email, password, userData);
      if (result.error) {
        throw result.error;
      }
      // Return just the user object, not the {user, error} structure
      return result.user as User;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Use logout function instead of signOut
      return await authFunctions.logout();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
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
            profile: user, // Use user as profile since they have the same structure
            login: signIn,
            signIn,
            signUp,
            logout: signOut,
            updateUserProfile: wrappedUpdateUserProfile,
            // Add required admin functions with stub implementations
            createUser: signUp,
            getAllUsers: async () => [],
            updateUserRole: async () => {},
            deleteUser: async () => {},
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </AuthStateManager>
  );
};
