
import React, { useState, useEffect, useRef } from 'react';
import { auth, firebaseAuth } from '../../services/firebase';
import { User, AuthContextType } from './types';
import { determineUserRole } from './utils';
import { AuthContext } from './context';
import * as authFunctions from './authFunctions';
import { toast } from 'react-toastify';

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  // Set up cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Check if persistence is enabled
    const persistenceType = localStorage.getItem('authPersistence') || 'session';
    
    // Set the persistence based on the stored value
    if (persistenceType === 'local') {
      firebaseAuth.setPersistence('local')
        .catch((error) => {
          console.error('Error setting persistence:', error);
        });
    } else {
      firebaseAuth.setPersistence('session')
        .catch((error) => {
          console.error('Error setting persistence:', error);
        });
    }
    
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!isMounted.current) return;
      
      console.log("Auth state changed:", authUser ? "User authenticated" : "No user");
      
      if (authUser) {
        // User is signed in
        const role = determineUserRole(authUser.email || '');
        const user: User = {
          uid: authUser.uid,
          id: authUser.uid, // Add id property that matches uid
          email: authUser.email,
          name: authUser.displayName,
          displayName: authUser.displayName,
          role, // Add role based on email
          profileCompleted: false, // Default value
          language: 'en', // Default language
        };
        setUser(user);
        console.log('User authenticated:', user.email, 'Role:', user.role);
      } else {
        // User is signed out
        setUser(null);
        console.log('User signed out');
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
      isMounted.current = false;
    };
  }, []);

  // Create wrapped versions of the auth functions that can update state
  const wrappedUpdateUserProfile = async (displayName: string): Promise<void> => {
    await authFunctions.updateUserProfile(displayName);
    if (isMounted.current) {
      setUser(prev => prev ? { ...prev, name: displayName, displayName } : null);
    }
  };

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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
