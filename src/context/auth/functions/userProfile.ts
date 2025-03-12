
// User profile functions

// Update user profile
export const updateUserProfile = async (displayName: string): Promise<void> => {
  try {
    // Get the current user from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      // Parse the user data
      const user = JSON.parse(storedUser);
      
      // Update the display name
      user.displayName = displayName;
      user.name = displayName;
      user.profileCompleted = true;
      
      // Save the updated user data back to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      console.log('User profile updated successfully');
    } else {
      throw new Error('No user found in localStorage');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
