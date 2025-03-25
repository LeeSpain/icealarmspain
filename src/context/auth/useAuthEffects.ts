
import { useEffect } from 'react';
import { User } from './types';
import { onAuthStateChanged } from '@/services/firebase/auth';
import { isMockAuthEnabled } from '@/utils/environment';

interface UseAuthEffectsProps {
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

/**
 * Hook to handle authentication state effects
 */
export const useAuthEffects = ({ setUser, setIsLoading }: UseAuthEffectsProps) => {
  useEffect(() => {
    // This effect handles setting up a listener for Firebase auth state changes
    console.log('Setting up auth state listener');
    
    // Mock auth behavior for development
    if (isMockAuthEnabled()) {
      console.log('Using mock auth data');
      
      // Simulate auth state
      console.log('Auth state: ' + JSON.stringify({
        currentUser: null,
        loading: true,
        error: null
      }));
      
      // Delayed loading simulation (development only)
      setTimeout(() => {
        setIsLoading(false);
        console.log('Auth state: ' + JSON.stringify({
          currentUser: null,
          loading: false,
          error: null
        }));
      }, 1000);
      
      // Skip Firebase listener in mock mode
      return () => {};
    }
    
    // For real Firebase auth, set up listener
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user to our User type
        const userWithRole = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          displayName: firebaseUser.displayName || '',
          role: 'user', // Default role
          status: 'active' as const,
          profileCompleted: !!firebaseUser.displayName,
          language: 'en'
        };
        
        setUser(userWithRole);
      } else {
        setUser(null);
      }
      
      // Loading is complete
      setIsLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setUser, setIsLoading]);
};
