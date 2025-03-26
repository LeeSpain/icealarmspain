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
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize from localStorage immediately in dev mode only
  useEffect(() => {
    console.log("AuthStateManager mounting");
    if (isMockAuthEnabled()) {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          console.log("AuthStateManager: Found user in localStorage");
          const parsedUser = JSON.parse(storedUser);
          
          // Ensure role is properly set
          const storedRole = localStorage.getItem('userRole');
          if (storedRole && (!parsedUser.role || parsedUser.role !== storedRole)) {
            console.log("AuthStateManager: Fixing role mismatch, using storedRole:", storedRole);
            parsedUser.role = storedRole;
            // Update localStorage to match
            localStorage.setItem('currentUser', JSON.stringify(parsedUser));
          }
          
          setUser(parsedUser);
          console.log("AuthStateManager: Initialized user with role:", parsedUser.role);
        } else {
          console.log("AuthStateManager: No user found in localStorage");
        }
      } catch (e) {
        console.error("AuthStateManager: Error initializing from localStorage", e);
      }
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
  };

  return <>{children({ user, isLoading, wrappedUpdateUserProfile })}</>;
};
