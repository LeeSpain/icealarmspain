import { useEffect, useRef } from 'react';
import { User } from './types';
import { determineUserRole } from './utils';
import { auth, onAuthStateChanged } from '../../services/firebase/auth';

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

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up Firebase auth state listener');
    
    // Set loading to true initially
    setIsLoading(true);
    
    // Try to load user from localStorage first (for faster initial load)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && isMounted.current) {
          console.log('Found stored user data:', parsedUser.email);
          setUser(parsedUser);
          // We still need to listen for Firebase auth changes, but we can show the UI faster
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Firebase auth state changed:', firebaseUser?.email || 'No user');
      
      if (!isMounted.current) return;
      
      if (!firebaseUser) {
        // Check if we have a development user in localStorage (for testing without Firebase)
        const devUser = localStorage.getItem('currentUser');
        if (devUser && JSON.parse(devUser).uid?.startsWith('dev-')) {
          console.log('Using development user from localStorage');
          // Keep the dev user active, don't clear state
        } else {
          console.log('No Firebase user, clearing user state');
          setUser(null);
        }
        // Always set loading to false when auth state is resolved
        setIsLoading(false);
        return;
      }
      
      console.log('Firebase user authenticated:', firebaseUser.email);
      
      // Determine role from email
      const role = determineUserRole(firebaseUser.email || '');
      
      if (isMounted.current) {
        const userData: User = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          role,
          profileCompleted: !!firebaseUser.displayName,
          language: localStorage.getItem('language') || 'en',
          lastLogin: new Date().toISOString(),
          createdAt: firebaseUser.metadata.creationTime || '',
        };
        
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
      }
      
      // Always set loading to false when auth state is resolved
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
      isMounted.current = false;
    };
  }, [setUser, setIsLoading]);
};
