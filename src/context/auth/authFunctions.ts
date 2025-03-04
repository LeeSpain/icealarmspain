
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, setPersistence } from '../../services/firebase';
import { User } from './types';
import { determineUserRole } from './utils';
import { toast } from 'react-toastify';

// Login function
export const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
  try {
    console.log('Attempting login for:', email, 'Remember me:', rememberMe);
    
    // Set persistence type based on remember me option
    if (rememberMe) {
      await setPersistence('local');
      localStorage.setItem('authPersistence', 'local');
    } else {
      await setPersistence('session');
      localStorage.setItem('authPersistence', 'session');
    }
    
    const { user: authUser } = await signInWithEmailAndPassword(email, password);
    if (!authUser) {
      throw new Error('Failed to get user after login');
    }
    
    const user: User = {
      uid: authUser.uid,
      id: authUser.uid,
      email: authUser.email,
      name: authUser.displayName,
      displayName: authUser.displayName,
      role: determineUserRole(email),
      profileCompleted: false,
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
    const { user: authUser } = await createUserWithEmailAndPassword(email, password);
    if (!authUser) {
      throw new Error('Failed to get user after signup');
    }
    
    // Update profile with display name if provided
    if (displayName && authUser) {
      await updateProfile(authUser, { displayName });
    }
    
    const user: User = {
      uid: authUser.uid,
      id: authUser.uid,
      email: authUser.email,
      name: displayName || authUser.displayName,
      displayName: displayName || authUser.displayName,
      role: determineUserRole(email),
      profileCompleted: false,
      language: 'en',
    };
    
    toast.success('Account created successfully!');
    
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
    await signOut();
    // Clear remembered auth persistence
    localStorage.removeItem('authPersistence');
    toast.success('You have been logged out');
  } catch (error) {
    console.error('Logout error:', error);
    toast.error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

// Update user profile function
export const updateUserProfile = async (displayName: string): Promise<void> => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      console.log('User profile updated:', displayName);
      toast.success('Profile updated successfully');
    } else {
      throw new Error('No user is signed in');
    }
  } catch (error) {
    console.error('Update profile error:', error);
    toast.error(`Profile update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};
