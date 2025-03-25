
import { isMockAuthEnabled } from '@/utils/environment';

// Update user profile
export const updateUserProfile = async (displayName: string): Promise<void> => {
  console.log('Updating user profile:', displayName);
  
  try {
    if (isMockAuthEnabled()) {
      // In development, just update localStorage
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.displayName = displayName;
        user.name = displayName;
        user.profileCompleted = true;
        localStorage.setItem('mockUser', JSON.stringify(user));
      }
      return;
    } else {
      // In production, this would update Firebase Auth user profile
      console.log('Update user profile not implemented in production mode');
    }
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

// Update profile with arbitrary data
export const updateProfile = async (profileData: { [key: string]: any }): Promise<{ success: boolean; error?: string }> => {
  console.log('Updating profile with:', profileData);
  
  try {
    if (isMockAuthEnabled()) {
      // In development, just update localStorage
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
      }
      return { success: true };
    } else {
      // In production, this would update the user's profile in Firestore
      console.log('Update profile not implemented in production mode');
      return { success: false, error: 'Update profile not implemented for production yet' };
    }
  } catch (error) {
    console.error('Update profile error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error updating profile'
    };
  }
};
