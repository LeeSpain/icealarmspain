
import { supabase } from '../../../integrations/supabase/client';
import { User } from '../types';
import { determineUserRole } from '../utils';

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

// Update user role function (admin only)
export const updateUserRole = async (userId: string, newRole: string): Promise<void> => {
  try {
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

