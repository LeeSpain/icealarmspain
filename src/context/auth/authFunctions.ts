
import { supabase } from '../../integrations/supabase/client';
import { User } from './types';
import { determineUserRole } from './utils';
import { toast } from 'react-toastify';

// Login function
export const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
  try {
    console.log('Attempting login for:', email, 'Remember me:', rememberMe);
    
    // Set persistence type based on remember me option
    const persistence = rememberMe ? 'local' : 'session';
    localStorage.setItem('authPersistence', persistence);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error('Failed to get user after login');
    }
    
    // Determine role based on email
    const role = determineUserRole(email);
    console.log('Login successful. Determined role:', role);
    
    const user: User = {
      uid: data.user.id,
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata.name || data.user.email?.split('@')[0],
      displayName: data.user.user_metadata.name || data.user.email?.split('@')[0],
      role,
      profileCompleted: !!data.user.user_metadata.name,
      language: 'en',
    };
    
    toast.success('Login successful!');
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    toast.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

// Sign up function
export const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
  try {
    console.log('Attempting signup for:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: displayName,
          first_name: displayName?.split(' ')[0],
          last_name: displayName?.split(' ').slice(1).join(' '),
        }
      }
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error('Failed to get user after signup');
    }
    
    // Determine role based on email
    const role = determineUserRole(email);
    console.log('Signup successful. Determined role:', role);
    
    const user: User = {
      uid: data.user.id,
      id: data.user.id,
      email: data.user.email,
      name: displayName || data.user.email?.split('@')[0],
      displayName: displayName || data.user.email?.split('@')[0],
      role,
      profileCompleted: !!displayName,
      language: 'en',
    };
    
    toast.success('Account created successfully! Please check your email for verification.');
    
    return user;
  } catch (error) {
    console.error('Signup error:', error);
    toast.error(`Signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    console.log('Logging out user');
    
    // First, clean up local state regardless of session status
    localStorage.removeItem('authPersistence');
    localStorage.removeItem('currentUser');
    
    // Check if there's an active session before attempting to sign out
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.warn('Session check error during logout:', sessionError);
      toast.success('You have been logged out');
      return;
    }
    
    if (!sessionData.session) {
      console.log('No active session found, cleaning up local state only');
      toast.success('You have been logged out');
      return;
    }
    
    // Attempt to sign out if we have a session
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn('Error during signOut:', error);
      // Even with error, we still want to clean local state (already done above)
      toast.success('You have been logged out (session may persist on server)');
      return;
    }
    
    toast.success('You have been logged out');
  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if there's an error, we've already cleaned up the local state
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Logout completed with errors:', errorMessage);
    toast.info('You have been logged out locally');
  }
};

// Update user profile function
export const updateUserProfile = async (displayName: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.updateUser({
      data: { 
        name: displayName,
        first_name: displayName.split(' ')[0],
        last_name: displayName.split(' ').slice(1).join(' ')
      }
    });
    
    if (error) throw error;
    
    console.log('User profile updated:', displayName);
    toast.success('Profile updated successfully');
  } catch (error) {
    console.error('Update profile error:', error);
    toast.error(`Profile update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};
