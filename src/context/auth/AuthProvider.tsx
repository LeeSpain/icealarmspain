
import React from 'react';
import { AuthContextType } from './types';
import { AuthContext } from './context';
import * as authFunctions from './authFunctions';
import { AuthStateManager } from './AuthStateManager';

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthStateManager>
      {({ user, isLoading, wrappedUpdateUserProfile }) => {
        // Create the context value
        const contextValue: AuthContextType = {
          user,
          isAuthenticated: !!user,
          isLoading,
          login: authFunctions.login,
          signIn: authFunctions.signIn,
          signUp: async (email, password, userData) => {
            const result = await authFunctions.signUp(email, password, userData);
            if (result.error) throw result.error;
            if (!result.user) throw new Error('Failed to create user');
            return result.user;
          },
          logout: authFunctions.logout,
          updateUserProfile: wrappedUpdateUserProfile,
          // Admin functions
          createUser: async (email, password, userData) => {
            const result = await authFunctions.createUser(email, password, userData);
            if (result.error) throw result.error;
            if (!result.user) throw new Error('Failed to create user');
            return result.user;
          },
          getAllUsers: authFunctions.getAllUsers,
          updateUserRole: authFunctions.updateUserRole,
          deleteUser: authFunctions.deleteUser,
        };

        return (
          <AuthContext.Provider value={contextValue}>
            {children}
          </AuthContext.Provider>
        );
      }}
    </AuthStateManager>
  );
};
