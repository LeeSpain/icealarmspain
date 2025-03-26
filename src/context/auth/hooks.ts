
import { useContext } from 'react';
import { AuthContext } from './context';

// Create the useAuth hook with better error handling
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Add debug logging to track when the hook is called
  console.log("useAuth hook called, context available:", !!context);
  
  // If no context, return a fallback object instead of throwing
  if (!context) {
    console.warn("Auth context is undefined! Using fallback auth object.");
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => {
        console.warn("Auth provider not available");
        return null as any;
      },
      signIn: async () => {
        console.warn("Auth provider not available");
        return null as any;
      },
      signUp: async () => {
        console.warn("Auth provider not available");
        return null as any;
      },
      logout: async () => {
        console.warn("Auth provider not available");
      },
      updateUserProfile: async () => {
        console.warn("Auth provider not available");
      },
      profile: null,
      createUser: async () => {
        console.warn("Auth provider not available");
        return null as any;
      },
      getAllUsers: async () => {
        console.warn("Auth provider not available");
        return [];
      },
      updateUserRole: async () => {
        console.warn("Auth provider not available");
      },
      deleteUser: async () => {
        console.warn("Auth provider not available");
      }
    };
  }
  
  return context;
};
