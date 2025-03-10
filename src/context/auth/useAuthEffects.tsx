
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
        console.log("Found existing session with user:", supabaseUser.email);
        
        // Extract user roles from metadata or fetch from profiles table
        const role = supabaseUser.user_metadata?.role || determineUserRole(supabaseUser.email || '');
        console.log("Determined user role:", role);
        
        if (isMounted.current) {
          const userData: User = {
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
          
          setUser(userData);
          console.log("User state set:", userData);
          
          // Store user data in localStorage for persistence
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
      } else {
        console.log("No active session found");
        localStorage.removeItem('currentUser');
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
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (!isMounted.current) return;
      
      if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        if (isMounted.current) {
          setUser(null);
          localStorage.removeItem('currentUser');
        }
      } else if (event === 'SIGNED_IN' && session) {
        const supabaseUser = session.user;
        console.log('User signed in:', supabaseUser.email);
        
        const role = supabaseUser.user_metadata?.role || determineUserRole(supabaseUser.email || '');
        
        if (isMounted.current) {
          const userData: User = {
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
          
          setUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
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
        console.log("Emergency timeout triggered to prevent infinite loading");
        setIsLoading(false);
      }
    }, 5000);

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timeout);
      isMounted.current = false;
    };
  }, [setUser, setIsLoading]);
};
