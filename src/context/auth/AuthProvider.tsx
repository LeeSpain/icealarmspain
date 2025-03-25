
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
          login: async (email, password, rememberMe) => {
            try {
              const user = await authFunctions.login(email, password, rememberMe);
              return { user, error: null };
            } catch (error) {
              return { user: undefined, error };
            }
          },
          signIn: async (email, password, rememberMe) => {
            try {
              const user = await authFunctions.signIn(email, password, rememberMe);
              return { user, error: null };
            } catch (error) {
              return { user: undefined, error };
            }
          },
          signUp: async (email, password, userData) => {
            const result = await authFunctions.signUp(email, password, userData);
            return result;
          },
          logout: authFunctions.logout,
          signOut: authFunctions.logout,
          updateUserProfile: wrappedUpdateUserProfile,
          updateProfile: async (data) => {
            // Placeholder implementation
            console.log("Update profile with:", data);
            return { success: true };
          },
          // Admin functions
          createUser: async (email, password, userData) => {
            const result = await authFunctions.createUser(email, password, userData);
            return result;
          },
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
