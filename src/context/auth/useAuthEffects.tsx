
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

  // Initialize auth state with minimal delay
  useEffect(() => {
    // Get the current user synchronously from localStorage
    try {
      const currentUser = getCurrentUser();
      
      if (currentUser && isMounted.current) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      setUser(null);
    } finally {
      // Always set loading to false immediately
      setIsLoading(false);
    }
  }, [setUser, setIsLoading]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser') {
        try {
          if (e.newValue) {
            const parsedUser = JSON.parse(e.newValue);
            setUser(parsedUser);
          } else {
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
