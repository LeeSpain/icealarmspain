
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

  // Set up cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set loading to true initially
    setIsLoading(true);
    
    // Check for existing session
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Session check error:", error);
        if (isMounted.current) {
          setIsLoading(false);
          setUser(null);
        }
        return;
      }
      
      if (data?.session?.user) {
        const supabaseUser = data.session.user;
        const role = determineUserRole(supabaseUser.email || '');
        
        if (isMounted.current) {
          setUser({
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
          });
        }
      }
      
      if (isMounted.current) {
        setIsLoading(false);
      }
    }).catch(error => {
      console.error('Error checking session:', error);
      if (isMounted.current) {
        setIsLoading(false);
        setUser(null);
      }
    });
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      
      if (!isMounted.current) return;
      
      if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        if (isMounted.current) {
          setUser(null);
        }
      }
      
      // Set loading to false no matter what to ensure we don't get stuck
      if (isMounted.current) {
        setIsLoading(false);
      }
    });

    // Emergency timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }, 1500);

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timeout);
      isMounted.current = false;
    };
  }, [setUser, setIsLoading]);
};
