
import React, { useState, useEffect, useRef } from 'react';
import { User, AuthContextType } from './types';
import { determineUserRole } from './utils';
import { AuthContext } from './context';
import * as authFunctions from './authFunctions';
import { toast } from 'react-toastify';
import { supabase } from '../../integrations/supabase/client';

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
      if (isMounted.current && isLoading) {
        setIsLoading(false);
      }
    });

    // Add a fallback to prevent infinite loading
    const fallbackTimer = setTimeout(() => {
      if (isMounted.current && isLoading) {
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
  }, []);

  // Create wrapped versions of the auth functions that can update state
  const wrappedUpdateUserProfile = async (displayName: string): Promise<void> => {
    await authFunctions.updateUserProfile(displayName);
    if (isMounted.current && user) {
      setUser(prev => prev ? { 
        ...prev, 
        name: displayName, 
        displayName, 
        profileCompleted: true 
      } : null);
      
      // Update localStorage
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          localStorage.setItem('currentUser', JSON.stringify({
            ...parsedUser,
            displayName
          }));
        } catch (e) {
          console.error('Error updating stored user', e);
        }
      }
    }
  };

  // Create the context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: authFunctions.login,
    signIn: authFunctions.signIn,
    signUp: authFunctions.signUp,
    logout: authFunctions.logout,
    updateUserProfile: wrappedUpdateUserProfile,
    // Add admin functions
    createUser: authFunctions.createUser,
    getAllUsers: authFunctions.getAllUsers,
    updateUserRole: authFunctions.updateUserRole,
    deleteUser: authFunctions.deleteUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
