
import { useEffect, useRef } from 'react';
import { User } from './types';
import { getCurrentUser } from '@/services/auth';

interface UseAuthEffectsProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAuthEffects = ({ setUser, setIsLoading }: UseAuthEffectsProps) => {
  const isMounted = useRef(true);

  // Set up cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Initialize auth state
  useEffect(() => {
    console.log('Initializing auth state');
    
    // Check for recently logged out flag to prevent auto-login after logout
    const recentlyLoggedOut = sessionStorage.getItem('recentlyLoggedOut');
    if (recentlyLoggedOut) {
      console.log('Recently logged out, not restoring from localStorage');
      sessionStorage.removeItem('recentlyLoggedOut');
      setUser(null);
      return;
    }
    
    // Get the current user from localStorage
    try {
      const currentUser = getCurrentUser();
      
      if (currentUser && isMounted.current) {
        console.log('Found stored user:', currentUser.email);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      setUser(null);
    }
  }, [setUser, setIsLoading]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser') {
        try {
          if (e.newValue) {
            const parsedUser = JSON.parse(e.newValue);
            console.log("Storage event - user updated:", parsedUser.email);
            setUser(parsedUser);
          } else {
            console.log("Storage event - user removed");
            setUser(null);
          }
        } catch (error) {
          console.error("Error parsing user from storage event:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [setUser]);
};
