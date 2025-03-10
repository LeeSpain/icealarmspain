
import { useEffect, useRef } from 'react';
import { User } from './types';
import { determineUserRole } from './utils';
import { auth, firebaseAuth } from '../../services/firebase/auth';

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
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
    
    // Listen for Firebase auth state changes
    const unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
      console.log('Firebase auth state changed:', firebaseUser?.email || 'No user');
      
      if (!isMounted.current) return;
      
      if (!firebaseUser) {
        console.log('No Firebase user, clearing user state');
        setUser(null);
        localStorage.removeItem('currentUser');
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
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          role,
          profileCompleted: !!firebaseUser.displayName,
          language: localStorage.getItem('language') || 'en',
          lastLogin: new Date().toISOString(),
          createdAt: firebaseUser.metadata.creationTime,
        };
        
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
      }
      
      setIsLoading(false);
    });

    // Emergency timeout to prevent infinite loading - shortened to 5 seconds
    const timeout = setTimeout(() => {
      if (isMounted.current && setIsLoading) {
        console.log("Emergency timeout triggered to prevent infinite loading");
        setIsLoading(false);
      }
    }, 5000);

    // Cleanup subscription
    return () => {
      unsubscribe();
      clearTimeout(timeout);
      isMounted.current = false;
    };
  }, [setUser, setIsLoading]);
};
