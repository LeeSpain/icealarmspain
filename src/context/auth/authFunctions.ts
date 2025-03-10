
import { supabase } from '../../integrations/supabase/client';
import { User } from './types';
import { determineUserRole } from './utils';

// Login function
export const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
  try {
    console.log('Attempting login for:', email, 'Remember me:', rememberMe);
    
    // Set persistence type based on remember me option
    const persistence = rememberMe ? 'local' : 'session';
    localStorage.setItem('authPersistence', persistence);
    
    // Detailed logging for debugging
    console.log(`Login attempt details: Email: ${email}, Password length: ${password.length}, Remember me: ${rememberMe}`);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error from Supabase:', error);
      throw error;
    }
    
    if (!data.user) {
      console.error('No user data returned from successful login');
      throw new Error('Failed to get user after login');
    }
    
    console.log('Login successful, user data:', data.user);
    
    // First check for role in user metadata, then fall back to email determination
    const role = data.user.user_metadata?.role || determineUserRole(email);
    console.log('User metadata:', data.user.user_metadata);
    console.log('Determined role:', role);
    
    // After successful login, update user metadata if role was determined from email
    if (!data.user.user_metadata?.role) {
      try {
        await supabase.auth.updateUser({
          data: { role }
        });
        console.log('Updated user metadata with role:', role);
      } catch (updateError) {
        console.error('Failed to update user metadata:', updateError);
        // Continue with login even if metadata update fails
      }
    }
    
    const user: User = {
      uid: data.user.id,
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || data.user.email?.split('@')[0],
      displayName: data.user.user_metadata?.name || data.user.email?.split('@')[0],
      role,
      profileCompleted: !!data.user.user_metadata?.name,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: data.user.created_at
    };
    
    // Store user data in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
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
    
    return user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Create user function (for admin use)
export const createUser = async (email: string, password: string, displayName: string, role: string): Promise<User> => {
  try {
    console.log('Admin creating new user:', email, 'with role:', role);
    
    // Use signUp with specified role
    const user = await signUp(email, password, displayName, role);
    
    return user;
  } catch (error) {
    console.error('Create user error:', error);
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
  } catch (error) {
    console.error('Update role error:', error);
    throw error;
  }
};

// Logout function - Improved implementation
export const logout = async (): Promise<void> => {
  try {
    console.log('Logging out user');
    
    // Clean up local state first
    localStorage.removeItem('authPersistence');
    localStorage.removeItem('currentUser');
    
    // Attempt to sign out the user
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error during signOut:', error);
      // Even if there's an error, we've already cleaned up local storage
      return;
    }
    
    // Check if we're really logged out by getting the session
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
  } catch (error) {
    console.error('Update profile error:', error);
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
    throw error;
  }
};

// Delete user function (admin only)
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    
    if (error) throw error;
    
    console.log('User deleted:', userId);
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};
