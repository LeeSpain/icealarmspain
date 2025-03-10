
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
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser && isMounted.current) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.uid) {
            // Check if it's a development user
            if (typeof parsedUser.uid === 'string' && parsedUser.uid.startsWith('dev-')) {
              console.log('Found stored development user:', parsedUser.email);
              setUser(parsedUser);
              
              // Set loading to false for dev users after a short delay
              setTimeout(() => {
                if (isMounted.current) {
                  setIsLoading(false);
                }
              }, 500);
            } else {
              console.log('Found stored user data:', parsedUser.email);
              setUser(parsedUser);
            }
          }
        } catch (e) {
          console.error('Error parsing stored user JSON:', e);
          localStorage.removeItem('currentUser');
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      localStorage.removeItem('currentUser');
    }
    
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Firebase auth state changed:', firebaseUser?.email || 'No user');
      
      if (!isMounted.current) return;
      
      if (!firebaseUser) {
        console.log('No Firebase user, clearing user state');
        setUser(null);
        // Set loading to false when auth state is resolved
        setIsLoading(false);
        return;
      }
      
      console.log('Firebase user authenticated:', firebaseUser.email);
      
      // Determine role from email
      const role = determineUserRole(firebaseUser.email || '');
      
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
      setIsLoading(false);
    });

    // Set a timeout to ensure loading state is not stuck forever
    const loadingTimeout = setTimeout(() => {
      if (isMounted.current) {
        console.log('Authentication loading timeout reached - forcing loading to false');
        setIsLoading(false);
      }
    }, 2000); // 2 second timeout as a fallback

    // Cleanup subscription and timeout
    return () => {
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, [setUser, setIsLoading]);
};
