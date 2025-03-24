
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
          signUp: authFunctions.signUp,
          logout: authFunctions.logout,
          updateUserProfile: wrappedUpdateUserProfile,
          // Admin functions
          createUser: authFunctions.signUp, // Use signUp directly to match types
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
