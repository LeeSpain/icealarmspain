
import { supabase } from '../../../integrations/supabase/client';
import { User } from '../types';
import { determineUserRole } from '../utils';

// Login function
export const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
  try {
    console.log('Starting login process for:', email);
    
    // Clear any existing session data
    console.log('Clearing existing session data...');
    await supabase.auth.signOut({ scope: 'global' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authPersistence');
    
    // Wait a moment to ensure session is cleared
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('Attempting signIn with Supabase for:', email);
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error from Supabase:', error.message);
      throw new Error(error.message);
    }
    
    console.log('Sign in response received:', session ? 'Session exists' : 'No session');
    
    if (!session?.user) {
      console.error('No session or user data returned from Supabase');
      throw new Error('Login failed - no session created');
    }
    
    console.log('Login successful for user:', session.user.email);
    
    // Determine role from email directly
    const role = determineUserRole(email);
    console.log('Determined role for user:', role);
    
    // Create user object
    const user: User = {
      uid: session.user.id,
      id: session.user.id,
      email: session.user.email || email,
      name: session.user.user_metadata?.name || email.split('@')[0],
      displayName: session.user.user_metadata?.name || email.split('@')[0],
      role,
      profileCompleted: !!session.user.user_metadata?.name,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: session.user.created_at
    };
    
    console.log('User object created:', user);
    
    // Store user data
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authPersistence', rememberMe ? 'local' : 'session');
    
    // Update user metadata with role if needed
    if (!session.user.user_metadata?.role || session.user.user_metadata?.role !== role) {
      console.log('Updating user metadata with role:', role);
      const { error: updateError } = await supabase.auth.updateUser({
        data: { role }
      });
      
      if (updateError) {
        console.error('Error updating user metadata:', updateError);
      }
    }
    
    return user;
  } catch (error) {
    console.error('Login process error:', error);
    throw error;
  }
};

// SignIn function (alternative name for login, needed for compatibility)
export const signIn = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
  try {
    await login(email, password, rememberMe);
    return true;
  } catch (error) {
    console.error('SignIn error:', error);
    return false;
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    console.log('Logging out user');
    
    // Clean up local state first
    localStorage.removeItem('authPersistence');
    localStorage.removeItem('currentUser');
    
    // Force global signout
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    
    if (error) {
      console.error('Error during signOut:', error);
    }
    
    // Double check if we're really logged out
    const { data } = await supabase.auth.getSession();
    
    if (data.session) {
      console.warn('Session still exists after logout, forcing cleanup');
      await supabase.auth.signOut({ scope: 'global' });
    }
    
  } catch (error) {
    console.error('Logout error:', error);
    // Clean up local state regardless of server errors
    localStorage.removeItem('authPersistence');
    localStorage.removeItem('currentUser');
  }
};

