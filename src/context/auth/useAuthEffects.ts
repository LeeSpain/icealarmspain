
import { useEffect } from 'react';
import { User } from './types';
import { isMockAuthEnabled } from '@/utils/environment';
import { onAuthStateChanged } from '@/services/firebase/auth';

interface UseAuthEffectsProps {
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
}

/**
 * A custom hook that sets up authentication state listeners
 * 
 * @param params Object containing state setters for user and loading
 * @returns Cleanup function to unsubscribe from the listener
 */
export const useAuthEffects = (
  { setUser, setIsLoading }: UseAuthEffectsProps
): (() => void) | { unsubscribe: () => void } => {
  if (isMockAuthEnabled()) {
    // In mock mode, we return a no-op cleanup function
    return () => {};
  }

  try {
    // Set up the auth state change listener
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
      
      if (firebaseUser) {
        // Map Firebase user to our User type
        const user: User = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          displayName: firebaseUser.displayName || '',
          role: 'user', // Default role, would be overridden by profile data
          status: 'active',
          profileCompleted: !!firebaseUser.displayName,
          language: 'en',
          // Optional Firebase properties
          emailVerified: firebaseUser.emailVerified,
          isAnonymous: firebaseUser.isAnonymous,
          photoURL: firebaseUser.photoURL || undefined,
          providerData: firebaseUser.providerData,
          refreshToken: firebaseUser.refreshToken,
        };
        
        setUser(user);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up auth listener:', error);
    setIsLoading(false);
    return { unsubscribe: () => {} };
  }
};

export default useAuthEffects;
