
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  Auth,
  User,
  setPersistence as firebaseSetPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  UserCredential
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirebaseConfig } from './config';

// Initialize Firebase with the config
const app = initializeApp(getFirebaseConfig());

// Export the auth instance
export const auth: Auth = getAuth(app);

// Export analytics 
export const analytics = getAnalytics(app);

// Export Firebase auth methods with better naming
export const signInWithEmailAndPassword = firebaseSignIn;
export const createUserWithEmailAndPassword = firebaseSignUp;
export const signOut = firebaseSignOut;
export const onAuthStateChanged = firebaseAuthStateChanged;
export const updateProfile = firebaseUpdateProfile;
export const setPersistence = firebaseSetPersistence;

// Re-export constants
export { 
  browserLocalPersistence, 
  browserSessionPersistence 
};

// Re-export types for easier access
export type { User, UserCredential };
