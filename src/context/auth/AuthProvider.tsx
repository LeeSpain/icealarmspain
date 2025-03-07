
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
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
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
          
          setUser(user);
          console.log('User authenticated from session:', user.email, 'Role:', user.role);
        }
        
        if (isMounted.current) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (isMounted.current) {
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
        
        setUser(user);
        console.log('User authenticated:', user.email, 'Role:', user.role);
        
        // Store user info in localStorage for persistence across page refreshes
        localStorage.setItem('currentUser', JSON.stringify({
          email: user.email,
          role: user.role,
          displayName: user.displayName,
          language: user.language
        }));
      } else if (event === 'SIGNED_OUT') {
        // User is signed out
        setUser(null);
        localStorage.removeItem('currentUser');
        console.log('User signed out');
      }
    });

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
