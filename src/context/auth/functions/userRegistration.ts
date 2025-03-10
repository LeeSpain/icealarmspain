import { supabase } from '../../../integrations/supabase/client';
import { User } from '../types';
import { determineUserRole } from '../utils';

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
          last_name: displayName?.split(' ').slice(1).join(' ')
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
