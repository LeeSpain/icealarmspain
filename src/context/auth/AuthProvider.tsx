
import React, { useState, useEffect } from 'react';
import { auth, firebaseAuth } from '../../firebase';
import { User, AuthContextType } from './types';
import { determineUserRole } from './utils';
import { AuthContext } from './context';
import * as authFunctions from './authFunctions';

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Check if persistence is enabled
    const persistenceType = localStorage.getItem('authPersistence') || 'session';
    
    // Set the persistence based on the stored value
    if (persistenceType === 'local') {
      auth.setPersistence(firebaseAuth.browserLocalPersistence)
        .catch((error) => {
          console.error('Error setting persistence:', error);
        });
    } else {
      auth.setPersistence(firebaseAuth.browserSessionPersistence)
        .catch((error) => {
          console.error('Error setting persistence:', error);
        });
    }
    
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        const user: User = {
          uid: authUser.uid,
          id: authUser.uid, // Add id property that matches uid
          email: authUser.email,
          name: authUser.displayName,
          displayName: authUser.displayName,
          role: determineUserRole(authUser.email || ''), // Add role based on email
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
    return () => unsubscribe();
  }, []);

  // Create wrapped versions of the auth functions that can update state
  const wrappedUpdateUserProfile = async (displayName: string): Promise<void> => {
    await authFunctions.updateUserProfile(displayName);
    setUser(prev => prev ? { ...prev, name: displayName, displayName } : null);
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
