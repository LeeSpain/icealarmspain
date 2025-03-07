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
      lastLogin: new Date().toISOString(),
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
export const signUp = async (email: string, password: string, displayName?: string, role: string = 'member'): Promise<User> => {
  try {
    console.log('Attempting signup for:', email, 'with role:', role);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: displayName,
          role: role,
          first_name: displayName?.split(' ')[0],
          last_name: displayName?.split(' ').slice(1).join(' '),
        }
      }
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error('Failed to get user after signup');
    }
    
    // For admin-created users, we respect the specified role parameter
    // Otherwise, determine role based on email as fallback
    const assignedRole = role || determineUserRole(email);
    console.log('Signup successful. Assigned role:', assignedRole);
    
    const user: User = {
      uid: data.user.id,
      id: data.user.id,
      email: data.user.email,
      name: displayName || data.user.email?.split('@')[0],
      displayName: displayName || data.user.email?.split('@')[0],
      role: assignedRole,
      profileCompleted: !!displayName,
      language: 'en',
      lastLogin: new Date().toISOString(),
    };
    
    toast.success('Account created successfully! Please check your email for verification.');
    
    return user;
  } catch (error) {
    console.error('Signup error:', error);
    toast.error(`Signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

// Create user function (for admin use)
export const createUser = async (email: string, password: string, displayName: string, role: string): Promise<User> => {
  try {
    console.log('Admin creating new user:', email, 'with role:', role);
    
    // Use signUp with specified role
    const user = await signUp(email, password, displayName, role);
    
    toast.success(`User ${displayName} (${role}) created successfully!`);
    return user;
  } catch (error) {
    console.error('Create user error:', error);
    toast.error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

// Update user role function (admin only)
export const updateUserRole = async (userId: string, newRole: string): Promise<void> => {
  try {
    // This requires admin privileges in Supabase
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { role: newRole }
    });
    
    if (error) throw error;
    
    console.log(`User ${userId} role updated to ${newRole}`);
    toast.success(`User role updated to ${newRole}`);
  } catch (error) {
    console.error('Update role error:', error);
    toast.error(`Role update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

// Get all users function (admin only)
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) throw error;
    
    const users: User[] = data.users.map(user => ({
      uid: user.id,
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.email?.split('@')[0],
      displayName: user.user_metadata?.name || user.email?.split('@')[0],
      role: user.user_metadata?.role || determineUserRole(user.email || ''),
      profileCompleted: !!user.user_metadata?.name,
      language: user.user_metadata?.language || 'en',
      lastLogin: user.last_sign_in_at,
      createdAt: user.created_at,
    }));
    
    return users;
  } catch (error) {
    console.error('Get all users error:', error);
    toast.error(`Failed to retrieve users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

// Delete user function (admin only)
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    
    if (error) throw error;
    
    console.log('User deleted:', userId);
    toast.success('User deleted successfully');
  } catch (error) {
    console.error('Delete user error:', error);
    toast.error(`User deletion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};
