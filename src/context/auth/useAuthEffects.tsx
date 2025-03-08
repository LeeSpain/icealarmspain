
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
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          throw error;
        }
        
        console.log("Session check result:", data.session ? "Session found" : "No session found");
        
        if (data.session?.user) {
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
      } catch (error) {
        console.error('Error checking session:', error);
        if (isMounted.current) {
          authChecked.current = true;
          setIsLoading(false);
          // Ensure user is null when there's an error
          setUser(null);
        }
      }
    };
    
    // Initial session check
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
      
      if (!isMounted.current) return;
      
      // Force auth check to complete if INITIAL_SESSION event happens
      if (event === 'INITIAL_SESSION') {
        if (!authChecked.current && isMounted.current) {
          authChecked.current = true;
          setIsLoading(false);
        }
        return;
      }
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          // User is signed in
          const supabaseUser = session.user;
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
            setIsLoading(false);
            console.log('User authenticated:', user.email, 'Role:', user.role);
          }
          
          // Store user info in localStorage for persistence across page refreshes
          localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            role: user.role,
            displayName: user.displayName,
            language: user.language
          }));
        }
      } else if (event === 'SIGNED_OUT') {
        // User is signed out
        console.log('User signed out - setting user to null');
        if (isMounted.current) {
          setUser(null);
          setIsLoading(false);
        }
        localStorage.removeItem('currentUser');
      }
      
      // Ensure loading state is completed
      if (isMounted.current) {
        setIsLoading(false);
      }
    });

    // Add a fallback to prevent infinite loading - reduced from 8s to 5s
    const fallbackTimer = setTimeout(() => {
      if (isMounted.current && !authChecked.current) {
        console.log("Auth check fallback timeout triggered");
        setIsLoading(false);
        // Also ensure user is set to null if we hit the fallback timeout
        setUser(null);
      }
    }, 5000); // 5 second fallback instead of 8 seconds

    // Cleanup subscription
    return () => {
      console.log('Cleaning up auth listener');
      authListener.subscription.unsubscribe();
      clearTimeout(fallbackTimer);
      isMounted.current = false;
    };
  }, [setUser, setIsLoading]);
};
