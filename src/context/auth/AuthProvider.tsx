
import React from 'react';
import { AuthContext } from './context';
import { AuthStateManager } from './AuthStateManager';
import { User } from './types';
import * as authFunctions from './authFunctions';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log("AuthProvider rendering");
  
  const signIn = async (email: string, password: string, rememberMe?: boolean) => {
    try {
      console.log("AuthProvider: signIn called with email:", email);
      // Call the login function (aliased as signIn in authFunctions)
      const user = await authFunctions.login(email, password, rememberMe || false);
      console.log("AuthProvider: signIn success, user:", user);
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      console.log("AuthProvider: signUp called with email:", email);
      const result = await authFunctions.signUp(email, password, userData);
      if (result.error) {
        throw result.error;
      }
      console.log("AuthProvider: signUp success, user:", result.user);
      // Return just the user object, not the {user, error} structure
      return result.user as User;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("AuthProvider: signOut called");
      // Use logout function instead of signOut
      return await authFunctions.logout();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthStateManager>
      {({ user, isLoading, wrappedUpdateUserProfile }) => {
        console.log("AuthStateManager provided state: user=", user, "isLoading=", isLoading);
        return (
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
        );
      }}
    </AuthStateManager>
  );
};
