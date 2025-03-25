
import { useEffect, useState } from 'react';
import { User } from './types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { isMockAuthEnabled } from '@/utils/environment';

export interface AuthStateHook {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuthStateListener(): AuthStateHook {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Setting up auth state listener');

    // If mock auth is enabled, use mock data
    if (isMockAuthEnabled()) {
      console.log('Using mock auth data');
      
      // Simulate auth delay
      const timer = setTimeout(() => {
        const mockUser = localStorage.getItem('mockUser');
        
        if (mockUser) {
          try {
            const user = JSON.parse(mockUser);
            setCurrentUser({
              uid: user.id || '12345',
              id: user.id || '12345',
              email: user.email || 'mock@example.com',
              name: user.displayName || 'Mock User',
              displayName: user.displayName || 'Mock User',
              role: user.role || 'member',
              profileCompleted: true,
              status: 'active',
              language: 'en'
            });
          } catch (err) {
            console.error('Error parsing mock user:', err);
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
        
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }

    // Real Firebase auth listener
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          console.log('Auth state changed:', firebaseUser);
          
          if (firebaseUser) {
            try {
              // Here you would typically fetch additional user data from your database
              // This is simplified for now
              const user: User = {
                uid: firebaseUser.uid,
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                name: firebaseUser.displayName || '',
                displayName: firebaseUser.displayName || '',
                role: 'member', // Default role, should be fetched from your database
                profileCompleted: true, // Should be determined by your app logic
                photoURL: firebaseUser.photoURL || undefined,
                lastLogin: new Date().toISOString(),
                status: 'active',
                language: 'en'
              };
              
              setCurrentUser(user);
            } catch (err) {
              console.error('Error processing authenticated user:', err);
              setError('Failed to process user data');
              setCurrentUser(null);
            }
          } else {
            setCurrentUser(null);
          }
          
          setLoading(false);
        },
        (err) => {
          console.error('Auth state error:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      // Return unsubscribe function to clean up on unmount
      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up auth listener:', err);
      setError(err instanceof Error ? err.message : 'Authentication setup failed');
      setLoading(false);
      return () => {}; // Empty cleanup function
    }
  }, []);

  return { currentUser, loading, error };
}

// Hook for authStateManager
export function useAuthEffects({ setUser, setIsLoading }: { 
  setUser: React.Dispatch<React.SetStateAction<User | null>>, 
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> 
}): void {
  useEffect(() => {
    if (!isMockAuthEnabled()) {
      try {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Process the Firebase user into our app's user
            const user: User = {
              uid: firebaseUser.uid,
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || '',
              displayName: firebaseUser.displayName || '',
              role: 'member', // Default role
              status: 'active',
              profileCompleted: !!firebaseUser.displayName,
              photoURL: firebaseUser.photoURL || undefined,
              lastLogin: new Date().toISOString(),
              language: 'en'
            };
            setUser(user);
          } else {
            setUser(null);
          }
          setIsLoading(false);
        });
        
        // Return cleanup function
        return () => unsubscribe();
      } catch (error) {
        console.error('Error in auth effects hook:', error);
        setIsLoading(false);
        return () => {}; // Empty cleanup
      }
    }
  }, [setUser, setIsLoading]);
}
