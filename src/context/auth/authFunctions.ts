
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/services/firebase/firebase';
import { 
  User, 
  UpdateProfileParams
} from './types';
import { isMockAuthEnabled } from '@/utils/environment';
import { createUserProfile, getUserProfile } from '@/services/firebase/db';

// Define Credentials interface locally since it's missing
export interface Credentials {
  email: string;
  password: string;
}

// Define MockUser interface locally since it's missing
export interface MockUser extends User {
  // Any additional properties can be added here
}

/**
 * Creates a new user with email and password.
 */
export const createUser = async (
  email: string,
  password: string,
  userData: any = {}
): Promise<{ user?: User; error?: any }> => {
  if (isMockAuthEnabled()) {
    // In mock mode, return a mock user
    const mockUser: User = {
      uid: 'mock-user-uid',
      id: 'mock-user-uid',
      email: email,
      name: userData.name || 'Mock User',
      displayName: userData.name || 'Mock User',
      role: 'user',
      status: 'active',
      profileCompleted: false,
      language: 'en',
      emailVerified: true,
      isAnonymous: false,
      providerData: [],
      refreshToken: '',
      photoURL: null,
    };
    return { user: mockUser };
  }

  try {
    // We'll use any here to avoid the Auth type issue
    const userCredential = await createUserWithEmailAndPassword(
      auth as any,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // Create user profile in Firestore
    const user: User = {
      uid: firebaseUser.uid,
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: '', // Initially empty, can be updated later
      displayName: '', // Initially empty, can be updated later
      role: 'user', // Default role
      status: 'active',
      profileCompleted: false,
      language: 'en',
      // Optional Firebase properties
      emailVerified: firebaseUser.emailVerified,
      isAnonymous: firebaseUser.isAnonymous,
      photoURL: firebaseUser.photoURL || undefined,
      providerData: firebaseUser.providerData,
      refreshToken: firebaseUser.refreshToken,
    };

    await createUserProfile(user);

    return { user };
  } catch (error: any) {
    console.error('Error creating user:', error);
    return { error };
  }
};

/**
 * Signs in an existing user with email and password.
 */
export const login = async (
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<{ user?: User; error?: any }> => {
  try {
    if (isMockAuthEnabled()) {
      // In mock mode, return a mock user
      const mockUser: User = {
        uid: 'mock-user-uid',
        id: 'mock-user-uid',
        email: email,
        name: 'Mock User',
        displayName: 'Mock User',
        role: 'user',
        status: 'active',
        profileCompleted: true,
        language: 'en',
        emailVerified: true,
        isAnonymous: false,
        providerData: [],
        refreshToken: '',
        photoURL: null,
      };
      return { user: mockUser };
    }

    return signIn(email, password);
  } catch (error: any) {
    console.error('Error logging in:', error);
    return { error };
  }
};

/**
 * Signs in an existing user with email and password.
 */
export const signIn = async (
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<{ user?: User; error?: any }> => {
  if (isMockAuthEnabled()) {
    // In mock mode, return a mock user
    const mockUser: User = {
      uid: 'mock-user-uid',
      id: 'mock-user-uid',
      email: email,
      name: 'Mock User',
      displayName: 'Mock User',
      role: 'user',
      status: 'active',
      profileCompleted: true,
      language: 'en',
      emailVerified: true,
      isAnonymous: false,
      providerData: [],
      refreshToken: '',
      photoURL: null,
    };
    return { user: mockUser };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth as any,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // Fetch user profile from Firestore
    const userProfile = await getUserProfile(firebaseUser.uid);

    const user: User = {
      uid: firebaseUser.uid,
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: userProfile?.name || '',
      displayName: userProfile?.displayName || '',
      role: userProfile?.role || 'user',
      status: userProfile?.status || 'active',
      profileCompleted: userProfile?.profileCompleted || false,
      language: userProfile?.language || 'en',
      // Optional Firebase properties
      emailVerified: firebaseUser.emailVerified,
      isAnonymous: firebaseUser.isAnonymous,
      photoURL: firebaseUser.photoURL || undefined,
      providerData: firebaseUser.providerData,
      refreshToken: firebaseUser.refreshToken,
    };

    return { user };
  } catch (error: any) {
    console.error('Error signing in:', error);
    return { error };
  }
};

/**
 * Signs up a new user with email and password.
 */
export const signUp = async (
  email: string,
  password: string, 
  userData: any = {}
): Promise<{ user?: User; error?: any }> => {
  try {
    if (isMockAuthEnabled()) {
      // Mock authentication for development
      const mockUser: User = {
        uid: 'mock-user-uid',
        id: 'mock-user-uid',
        email: email,
        name: userData.name || email.split('@')[0],
        displayName: userData.name || email.split('@')[0],
        role: 'user',
        status: 'active',
        profileCompleted: false,
        language: userData.language || 'en',
        emailVerified: true,
        isAnonymous: false,
        providerData: [],
        refreshToken: '',
        photoURL: null,
      };
      return { user: mockUser };
    }

    return createUser(email, password, userData);
  } catch (error: any) {
    console.error('Error signing up:', error);
    return { error };
  }
};

/**
 * Signs out the current user.
 */
export const logout = async (): Promise<void> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    return Promise.resolve();
  }

  try {
    await firebaseSignOut(auth as any);
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Alias for logout
export const signOut = logout;

/**
 * Updates the user's profile information.
 */
export const updateUserProfile = async (displayName: string): Promise<void> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    console.log('Mock updateUserProfile with displayName:', displayName);
    return Promise.resolve();
  }

  try {
    // Update display name in Firebase Authentication
    if (auth.currentUser) {
      await firebaseUpdateProfile(auth.currentUser as FirebaseUser, {
        displayName
      });
    }
    
    // In a real implementation, we would also update Firestore
    console.log('User profile updated with displayName:', displayName);
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Updates the user's profile information.
 */
export const updateProfile = async (params: UpdateProfileParams): Promise<void> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    console.log('Mock updateProfile with params:', params);
    return Promise.resolve();
  }

  try {
    // Update display name in Firebase Authentication
    if (params.displayName && auth.currentUser) {
      await firebaseUpdateProfile(auth.currentUser as FirebaseUser, {
        displayName: params.displayName,
      });
    }

    // Update user profile in Firestore - simplified mock version
    console.log('User profile updated with params:', params);
  } catch (error: any) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/**
 * Gets all users - admin function.
 */
export const getAllUsers = async (): Promise<User[]> => {
  if (isMockAuthEnabled()) {
    // In mock mode, return a mock list of users
    return [
      {
        uid: 'mock-user-1',
        id: 'mock-user-1',
        email: 'user1@example.com',
        name: 'User 1',
        displayName: 'User 1',
        role: 'user',
        status: 'active',
        profileCompleted: true,
        language: 'en'
      },
      {
        uid: 'mock-user-2',
        id: 'mock-user-2',
        email: 'user2@example.com',
        name: 'User 2',
        displayName: 'User 2',
        role: 'admin',
        status: 'active',
        profileCompleted: true,
        language: 'en'
      }
    ];
  }

  // In a real implementation, we would fetch users from Firestore
  console.warn('getAllUsers not implemented for production');
  return [];
};

/**
 * Updates a user's role - admin function.
 */
export const updateUserRole = async (userId: string, role: string): Promise<{ success: boolean; error?: string }> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    console.log(`Mock updateUserRole: ${userId} => ${role}`);
    return { success: true };
  }

  // In a real implementation, we would update the user's role in Firestore
  console.warn('updateUserRole not implemented for production');
  return { success: false, error: 'Not implemented' };
};

/**
 * Deletes a user - admin function.
 */
export const deleteUser = async (userId: string): Promise<{ success: boolean; error?: string }> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    console.log(`Mock deleteUser: ${userId}`);
    return { success: true };
  }

  // In a real implementation, we would delete the user from Firebase Auth and Firestore
  console.warn('deleteUser not implemented for production');
  return { success: false, error: 'Not implemented' };
};
