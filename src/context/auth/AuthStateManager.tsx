
import React, { useState, useEffect } from 'react';
import { User } from './types';
import { useAuthEffects } from './useAuthEffects';
import * as authFunctions from './authFunctions';

interface AuthStateManagerProps {
  children: (args: {
    user: User | null;
    isLoading: boolean;
    wrappedUpdateUserProfile: (displayName: string) => Promise<void>;
  }) => React.ReactNode;
}

export const AuthStateManager: React.FC<AuthStateManagerProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize from localStorage immediately
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        console.log("AuthStateManager: Found user in localStorage");
        const parsedUser = JSON.parse(storedUser);
        // Ensure role is properly set
        const storedRole = localStorage.getItem('userRole');
        if (storedRole && (!parsedUser.role || parsedUser.role !== storedRole)) {
          parsedUser.role = storedRole;
        }
        setUser(parsedUser);
        console.log("AuthStateManager: Initialized user with role:", parsedUser.role);
      }
      setTimeout(() => setIsLoading(false), 300);
    } catch (e) {
      console.error("AuthStateManager: Error initializing from localStorage", e);
      setIsLoading(false);
    }
  }, []);

  // Use the extracted auth effects hook
  useAuthEffects({ setUser, setIsLoading });

  const wrappedUpdateUserProfile = async (displayName: string): Promise<void> => {
    await authFunctions.updateUserProfile(displayName);
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
  };

  return <>{children({ user, isLoading, wrappedUpdateUserProfile })}</>;
};
