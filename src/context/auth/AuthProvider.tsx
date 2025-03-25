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
          profile: user ? { 
            display_name: user.displayName,
            role: user.role
          } : null,
          isAuthenticated: !!user,
          isLoading,
          login: authFunctions.login,
          signIn: authFunctions.signIn,
          signUp: authFunctions.signUp,
          logout: authFunctions.logout,
          signOut: authFunctions.logout,
          updateUserProfile: wrappedUpdateUserProfile,
          updateProfile: async (data) => {
            // Placeholder implementation
            console.log("Update profile with:", data);
            return { success: true };
          },
          // Admin functions
          createUser: authFunctions.createUser,
          getAllUsers: authFunctions.getAllUsers,
          updateUserRole: authFunctions.updateUserRole,
          deleteUser: authFunctions.deleteUser,
          hasRole: (roles) => {
            if (!user || !user.role) return false;
            return Array.isArray(roles) 
              ? roles.includes(user.role)
              : user.role === roles;
          }
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
