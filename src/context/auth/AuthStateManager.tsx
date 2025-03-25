import React, { useState, useEffect } from 'react';
import { User } from './types';
import { useAuthEffects } from './useAuthEffects';
import * as authFunctions from './authFunctions';
import { isMockAuthEnabled } from '@/utils/environment';

interface AuthStateManagerProps {
  children: (args: {
    user: User | null;
    isLoading: boolean;
    wrappedUpdateUserProfile: (displayName: string) => Promise<void>;
  }) => React.ReactNode;
}

export const AuthStateManager: React.FC<AuthStateManagerProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Start with false to avoid blank screen
  
  // Force loading to false after a timeout to prevent getting stuck
  useEffect(() => {
    console.log("AuthStateManager mounting, setting loading timeout");
    
    // Shorter timeout for faster initial render
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("AuthStateManager: Loading timeout reached, forcing loading to false");
        setIsLoading(false);
      }
    }, 500); // Reduced from 2000ms to 500ms
    
    return () => clearTimeout(loadingTimeout);
  }, [isLoading]);
  
  // Initialize from localStorage immediately in dev mode only
  useEffect(() => {
    console.log("AuthStateManager mounting");
    
    try {
      // Bypass auth check for initial render to avoid blank screen
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        console.log("AuthStateManager: Found user in localStorage");
        setUser(JSON.parse(storedUser));
      }
      
      // Always set loading to false quickly to ensure render happens
      setTimeout(() => setIsLoading(false), 50);
    } catch (e) {
      console.error("AuthStateManager: Error initializing from localStorage", e);
      setIsLoading(false);
    }
  }, []);

  // Listen for localStorage changes to keep user state synced - development only
  useEffect(() => {
    if (isMockAuthEnabled()) {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'currentUser') {
          try {
            if (e.newValue) {
              const parsedUser = JSON.parse(e.newValue);
              console.log("AuthStateManager: Storage event - user updated:", parsedUser.email);
              setUser(parsedUser);
            } else {
              console.log("AuthStateManager: Storage event - user removed");
              setUser(null);
            }
          } catch (error) {
            console.error("Error parsing user from storage event:", error);
          }
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  // Use the extracted auth effects hook - this handles the real Firebase auth
  useAuthEffects({ setUser, setIsLoading });

  const wrappedUpdateUserProfile = async (displayName: string): Promise<void> => {
    try {
      await authFunctions.updateUserProfile(displayName);
      setUser(prev => prev ? {
        ...prev,
        name: displayName,
        displayName,
        profileCompleted: true
      } : null);

      // Update localStorage only in dev mode
      if (isMockAuthEnabled()) {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            const updatedUser = {
              ...parsedUser,
              displayName,
              name: displayName,
              profileCompleted: true
            };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          } catch (e) {
            console.error('Error updating stored user', e);
          }
        }
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Continue even if profile update fails
    }
  };

  return <>{children({ user, isLoading, wrappedUpdateUserProfile })}</>;
};
