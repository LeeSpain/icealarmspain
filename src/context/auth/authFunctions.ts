
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
  Credentials, 
  UpdateProfileParams, 
  MockUser 
} from './types';
import { isMockAuthEnabled } from '@/utils/environment';
import { createUserProfile, getUserProfile } from '@/services/firebase/db';

/**
 * Creates a new user with email and password.
 *
 * @param credentials Object containing email and password.
 * @returns Promise that resolves with the created user or rejects with an error.
 */
export const createUser = async (credentials: Credentials): Promise<{ user?: User; error?: any }> => {
  if (isMockAuthEnabled()) {
    // In mock mode, return a mock user
    const mockUser: MockUser = {
      uid: 'mock-user-uid',
      id: 'mock-user-uid',
      email: credentials.email,
      name: 'Mock User',
      displayName: 'Mock User',
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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
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
 *
 * @param email Email of the user.
 * @param password Password of the user.
 * @param rememberMe Whether to remember the user session.
 * @returns Promise that resolves with the signed-in user or rejects with an error.
 */
export const login = async (
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<{ user?: User; error?: any }> => {
  try {
    if (isMockAuthEnabled()) {
      // In mock mode, return a mock user
      const mockUser: MockUser = {
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

    const credentials: Credentials = { email, password };
    return signIn(credentials);
  } catch (error: any) {
    console.error('Error logging in:', error);
    return { error };
  }
};

/**
 * Signs in an existing user with email and password.
 *
 * @param credentials Object containing email and password.
 * @returns Promise that resolves with the signed-in user or rejects with an error.
 */
export const signIn = async (credentials: Credentials): Promise<{ user?: User; error?: any }> => {
  if (isMockAuthEnabled()) {
    // In mock mode, return a mock user
    const mockUser: MockUser = {
      uid: 'mock-user-uid',
      id: 'mock-user-uid',
      email: credentials.email,
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
      auth,
      credentials.email,
      credentials.password
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
 * 
 * @param email Email of the user.
 * @param password Password of the user.
 * @param userData Additional user data.
 * @returns Promise that resolves with the signed-up user or rejects with an error.
 */
export const signUp = async (
  email: string,
  password: string,
  userData: any = {}
): Promise<{ user?: User; error?: any }> => {
  try {
    if (isMockAuthEnabled()) {
      // In mock mode, return a mock user
      const mockUser: MockUser = {
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

    const credentials: Credentials = { email, password };
    return createUser(credentials);
  } catch (error: any) {
    console.error('Error signing up:', error);
    return { error };
  }
};

/**
 * Signs out the current user.
 *
 * @returns Promise that resolves when the user is signed out or rejects with an error.
 */
export const logout = async (): Promise<void> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    return Promise.resolve();
  }

  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Alias for logout
export const signOut = logout;

/**
 * Updates the user's profile information.
 *
 * @param displayName The user's new display name.
 * @returns Promise that resolves when the profile is updated or rejects with an error.
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
 *
 * @param params Object containing the user's ID and the profile information to update.
 * @returns Promise that resolves when the profile is updated or rejects with an error.
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
 * @returns Promise that resolves with all users.
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
 * @param userId The user's ID.
 * @param role The new role.
 * @returns Promise that resolves with success status.
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
 * @param userId The user's ID.
 * @returns Promise that resolves with success status.
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
