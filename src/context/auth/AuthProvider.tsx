
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
        
        // Create user profile with additional fields
        const user: User = {
          uid: authUser.uid,
          id: authUser.uid,
          email: authUser.email,
          name: authUser.displayName || authUser.email?.split('@')[0] || 'Admin User',
          displayName: authUser.displayName || authUser.email?.split('@')[0] || 'Admin User',
          role,
          profileCompleted: Boolean(authUser.displayName),
          language: localStorage.getItem('language') || 'en',
          lastLogin: new Date().toISOString(),
          createdAt: authUser.metadata?.creationTime || new Date().toISOString(),
        };
        
        setUser(user);
        console.log('User authenticated:', user.email, 'Role:', user.role);
        
        // Store user info in localStorage for persistence across page refreshes
        localStorage.setItem('currentUser', JSON.stringify({
          email: user.email,
          role: user.role,
          displayName: user.displayName,
          language: user.language
        }));
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem('currentUser');
        console.log('User signed out');
      }
      
      setIsLoading(false);
    });

    // Try to restore user from localStorage to prevent flashing
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser && !user) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Restoring user session from localStorage temporarily');
        // Don't set as fully authenticated, but use for UI display while checking auth
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('currentUser');
      }
    }

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
      setUser(prev => prev ? { 
        ...prev, 
        name: displayName, 
        displayName, 
        profileCompleted: true 
      } : null);
      
      // Update localStorage
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          localStorage.setItem('currentUser', JSON.stringify({
            ...parsedUser,
            displayName
          }));
        } catch (e) {
          console.error('Error updating stored user', e);
        }
      }
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
