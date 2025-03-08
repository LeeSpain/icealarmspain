
import { useEffect, useRef } from 'react';
import { User } from './types';
import { determineUserRole } from './utils';
import { supabase } from '../../integrations/supabase/client';

interface UseAuthEffectsProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAuthEffects = ({ setUser, setIsLoading }: UseAuthEffectsProps) => {
  const isMounted = useRef(true);
  const authChecked = useRef(false);

  // Set up cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Check if the user session exists
    const checkSession = async () => {
      try {
        console.log("Checking for existing session...");
        setIsLoading(true);
        
        // Set a flag to ensure we don't get stuck
        let sessionChecked = false;
        
        // Try to get the session, but don't block rendering on this
        supabase.auth.getSession().then(({ data, error }) => {
          if (error) {
            console.error("Session check error:", error);
            // Don't throw the error, just log it
          }
          
          sessionChecked = true;
          console.log("Session check result:", data?.session ? "Session found" : "No session found");
          
          if (data?.session?.user) {
            const supabaseUser = data.session.user;
            const role = determineUserRole(supabaseUser.email || '');
            
            const user: User = {
              uid: supabaseUser.id,
              id: supabaseUser.id,
              email: supabaseUser.email,
              name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0],
              displayName: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0],
              role,
              profileCompleted: !!supabaseUser.user_metadata?.name,
              language: localStorage.getItem('language') || 'en',
              lastLogin: new Date().toISOString(),
              createdAt: supabaseUser.created_at,
            };
            
            if (isMounted.current) {
              setUser(user);
              console.log('User authenticated from session:', user.email, 'Role:', user.role);
            }
          } else {
            // No session found, ensure user is set to null
            if (isMounted.current) {
              setUser(null);
            }
          }
          
          if (isMounted.current) {
            authChecked.current = true;
            setIsLoading(false);
          }
        }).catch(error => {
          console.error('Error checking session:', error);
          sessionChecked = true;
          if (isMounted.current) {
            authChecked.current = true;
            setIsLoading(false);
            setUser(null);
          }
        });
        
        // Set a short timeout to ensure we don't get stuck
        setTimeout(() => {
          if (!sessionChecked && isMounted.current) {
            console.log("Session check timed out, continuing without auth");
            authChecked.current = true;
            setIsLoading(false);
            setUser(null);
          }
        }, 1000);
        
      } catch (error) {
        console.error('Error in checkSession:', error);
        if (isMounted.current) {
          authChecked.current = true;
          setIsLoading(false);
          setUser(null);
        }
      }
    };
    
    // Initial session check
    checkSession();
    
    // Set up auth state change listener, but don't block rendering on this
    let authListener;
    try {
      authListener = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
        
        if (!isMounted.current) return;
        
        // Set loading to false no matter what to ensure we don't get stuck
        if (isMounted.current) {
          setIsLoading(false);
        }
        
        // User is signed out
        if (event === 'SIGNED_OUT') {
          console.log('User signed out - setting user to null');
          if (isMounted.current) {
            setUser(null);
          }
          localStorage.removeItem('currentUser');
        }
      });
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      // Don't block rendering on this error
      if (isMounted.current) {
        setIsLoading(false);
        setUser(null);
      }
    }

    // Super short fallback timeout to prevent infinite loading
    const fallbackTimer = setTimeout(() => {
      if (isMounted.current) {
        console.log("Auth check emergency fallback triggered");
        setIsLoading(false);
        setUser(null);
      }
    }, 800); // Very short timeout to ensure app renders

    // Cleanup subscription
    return () => {
      console.log('Cleaning up auth listener');
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
      clearTimeout(fallbackTimer);
      isMounted.current = false;
    };
  }, [setUser, setIsLoading]);
};
