
import { auth, updateProfile } from '../../../services/firebase/auth';

// Update user profile function
export const updateUserProfile = async (displayName: string): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No authenticated user found');
    }
    
    await updateProfile(currentUser, { 
      displayName 
    });
    
    console.log('User profile updated:', displayName);
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};
