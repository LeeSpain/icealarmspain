
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
            name: supabaseUser.user_metadata.name || supabaseUser.email?.split('@')[0],
            displayName: supabaseUser.user_metadata.name || supabaseUser.email?.split('@')[0],
            role,
            profileCompleted: !!supabaseUser.user_metadata.name,
            language: localStorage.getItem('language') || 'en',
            lastLogin: new Date().toISOString(),
            createdAt: supabaseUser.created_at,
          };
          
          if (isMounted.current) {
            setUser(user);
            console.log('User authenticated from session:', user.email, 'Role:', user.role);
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
        }
      }
    };
    
    // Initial session check
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      
      if (!isMounted.current) return;
      
      // Force auth check to complete if INITIAL_SESSION event happens
      if (event === 'INITIAL_SESSION') {
        if (!authChecked.current && isMounted.current) {
          authChecked.current = true;
          setIsLoading(false);
        }
        return;
      }
      
      if (session?.user) {
        // User is signed in
        const supabaseUser = session.user;
        const role = determineUserRole(supabaseUser.email || '');
        
        const user: User = {
          uid: supabaseUser.id,
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata.name || supabaseUser.email?.split('@')[0],
          displayName: supabaseUser.user_metadata.name || supabaseUser.email?.split('@')[0],
          role,
          profileCompleted: !!supabaseUser.user_metadata.name,
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
      } else if (event === 'SIGNED_OUT') {
        // User is signed out
        if (isMounted.current) {
          setUser(null);
          setIsLoading(false);
        }
        localStorage.removeItem('currentUser');
        console.log('User signed out');
      }
      
      // Ensure loading state is completed
      if (isMounted.current) {
        setIsLoading(false);
      }
    });

    // Add a fallback to prevent infinite loading
    const fallbackTimer = setTimeout(() => {
      if (isMounted.current) {
        console.log("Auth check fallback timeout triggered");
        setIsLoading(false);
      }
    }, 10000); // 10 second fallback

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(fallbackTimer);
      isMounted.current = false;
    };
  }, [setUser, setIsLoading]);
};
