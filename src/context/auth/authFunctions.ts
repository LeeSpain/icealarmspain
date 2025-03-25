import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  confirmPasswordReset as firebaseConfirmPasswordReset,
  sendEmailVerification as firebaseSendEmailVerification,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/services/firebase/firebase';
import { User, Credentials, UpdateProfileParams, MockUser } from './types';
import { isMockAuthEnabled } from '@/utils/environment';
import { createUserProfile, getUserProfile } from '@/services/firebase/db';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Creates a new user with email and password.
 *
 * @param credentials Object containing email and password.
 * @returns Promise that resolves with the created user or rejects with an error.
 */
export const createUser = async (credentials: Credentials): Promise<User> => {
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
    return mockUser;
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

    return user;
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Signs in an existing user with email and password.
 *
 * @param credentials Object containing email and password.
 * @returns Promise that resolves with the signed-in user or rejects with an error.
 */
export const signIn = async (credentials: Credentials): Promise<User> => {
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
    return mockUser;
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

    return user;
  } catch (error: any) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Signs out the current user.
 *
 * @returns Promise that resolves when the user is signed out or rejects with an error.
 */
export const signOut = async (): Promise<void> => {
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

/**
 * Updates the user's profile information.
 *
 * @param params Object containing the user's ID and the profile information to update.
 * @returns Promise that resolves when the profile is updated or rejects with an error.
 */
export const updateProfile = async (params: UpdateProfileParams): Promise<void> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    return Promise.resolve();
  }

  try {
    // Update display name in Firebase Authentication
    if (params.displayName) {
      await firebaseUpdateProfile(auth.currentUser as FirebaseUser, {
        displayName: params.displayName,
      });
    }

    // Update user profile in Firestore
    await createUserProfile({
      uid: params.id,
      id: params.id,
      email: auth.currentUser?.email || '',
      name: params.name || '',
      displayName: params.displayName || '',
      role: 'user', // Assuming role doesn't change here
      status: 'active', // Assuming status doesn't change here
      profileCompleted: true, // Assuming profile is completed after update
      language: params.language || 'en',
      // Optional Firebase properties
      emailVerified: auth.currentUser?.emailVerified || false,
      isAnonymous: auth.currentUser?.isAnonymous || false,
      photoURL: auth.currentUser?.photoURL || undefined,
      providerData: auth.currentUser?.providerData || [],
      refreshToken: auth.currentUser?.refreshToken || '',
    });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/**
 * Sends a password reset email to the given email address.
 * @param email The email address to send the reset email to.
 * @returns A promise that resolves when the email has been sent.
 */
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    return Promise.resolve();
  }

  try {
    await firebaseSendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

/**
 * Confirms a password reset with the given code and new password.
 * @param code The password reset code to verify.
 * @param password The new password to set.
 * @returns A promise that resolves when the password has been reset.
 */
export const confirmPasswordReset = async (code: string, password: string): Promise<void> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    return Promise.resolve();
  }

  try {
    await firebaseConfirmPasswordReset(auth, code, password);
  } catch (error: any) {
    console.error('Error confirming password reset:', error);
    throw error;
  }
};

/**
 * Sends an email verification to the current user
 * @returns A promise that resolves when the email has been sent.
 */
export const sendEmailVerification = async (): Promise<void> => {
  if (isMockAuthEnabled()) {
    // In mock mode, just resolve
    return Promise.resolve();
  }

  try {
    await firebaseSendEmailVerification(auth.currentUser as FirebaseUser);
  } catch (error: any) {
    console.error('Error sending email verification:', error);
    throw error;
  }
};

/**
 * Signs in with a social provider (Google, Facebook, etc.)
 * @param provider The social provider to use (e.g. 'google', 'facebook')
 * @returns A promise that resolves with the signed-in user or rejects with an error.
 */
export const signInWithSocialProvider = async (provider: 'google' | 'facebook'): Promise<User> => {
  if (isMockAuthEnabled()) {
    // In mock mode, return a mock user
    const mockUser: MockUser = {
      uid: 'mock-user-uid',
      id: 'mock-user-uid',
      email: 'mock@example.com',
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
    return mockUser;
  }

  try {
    let socialProvider;

    if (provider === 'google') {
      socialProvider = new GoogleAuthProvider();
    } else if (provider === 'facebook') {
      socialProvider = new FacebookAuthProvider();
    } else {
      throw new Error(`Unsupported social provider: ${provider}`);
    }

    const result = await signInWithPopup(auth, socialProvider);
    const firebaseUser = result.user;

    // Check if user exists in Firestore, if not, create a new user profile
    let userProfile = await getUserProfile(firebaseUser.uid);

    if (!userProfile) {
      const newUser: User = {
        uid: firebaseUser.uid,
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || '',
        displayName: firebaseUser.displayName || '',
        role: 'user', // Default role
        status: 'active',
        profileCompleted: true,
        language: 'en',
        // Optional Firebase properties
        emailVerified: firebaseUser.emailVerified,
        isAnonymous: firebaseUser.isAnonymous,
        photoURL: firebaseUser.photoURL || undefined,
        providerData: firebaseUser.providerData,
        refreshToken: firebaseUser.refreshToken,
      };
      await createUserProfile(newUser);
      userProfile = newUser; // Use the new user as the profile
    }

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

    return user;
  } catch (error: any) {
    console.error('Error signing in with social provider:', error);
    throw error;
  }
};
