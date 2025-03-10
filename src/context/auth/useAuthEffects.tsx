
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
        if (parsedUser && parsedUser.uid && isMounted.current) {
          // Check if it's a development user
          if (typeof parsedUser.uid === 'string' && parsedUser.uid.startsWith('dev-')) {
            console.log('Found stored development user:', parsedUser.email);
            setUser(parsedUser);
            setIsLoading(false);
            return; // Exit early for development users - no Firebase auth needed
          }
          console.log('Found stored user data:', parsedUser.email);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
        setUser(null);
      }
    }
    
    // Listen for Firebase auth state changes (only if not a development user)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Firebase auth state changed:', firebaseUser?.email || 'No user');
      
      if (!isMounted.current) return;
      
      if (!firebaseUser) {
        console.log('No Firebase user, clearing user state');
        setUser(null);
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
