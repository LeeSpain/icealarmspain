
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, setPersistence } from '../../firebase';
import { firebaseAuth } from '../../firebase';
import { User } from './types';
import { determineUserRole } from './utils';

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
export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    console.log('Attempting signup for:', email);
    const { user: authUser } = await createUserWithEmailAndPassword(email, password);
    if (!authUser) {
      throw new Error('Failed to get user after signup');
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
    return user;
  } catch (error) {
    console.error('Signup error:', error);
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
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Update user profile function
export const updateUserProfile = async (displayName: string): Promise<void> => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      console.log('User profile updated:', displayName);
    } else {
      throw new Error('No user is signed in');
    }
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};
