
import { supabase } from '../../../integrations/supabase/client';

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

