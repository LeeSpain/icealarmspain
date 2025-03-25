
import { updateUserProfile as updateProfile } from '@/services/auth';

// Update user profile
export const updateUserProfile = async (displayName: string): Promise<void> => {
  try {
    await updateProfile(displayName);
    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
