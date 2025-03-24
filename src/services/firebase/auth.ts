// Firebase authentication service
import { mockAuth } from './mockFirebase';
import { hasValidFirebaseConfig } from '@/utils/environment';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseCreateUser,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirebaseConfig } from './config';

// Initialize Firebase if config is valid
let auth: Auth = mockAuth as unknown as Auth;
let analytics: Analytics | null = null;

try {
  if (hasValidFirebaseConfig()) {
    const firebaseConfig = getFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    try {
      // Analytics might fail in some environments
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('Firebase analytics initialization failed:', error);
      analytics = null;
    }
  } else {
    console.warn('Using mock Firebase implementation');
    auth = mockAuth as unknown as Auth;
    analytics = null;
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  auth = mockAuth as unknown as Auth;
  analytics = null;
}

// Re-export Firebase auth functions with safe fallbacks
export { auth, analytics };

// Re-export types
export type { FirebaseUser };

// Export wrapped versions of Firebase functions
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth.signInWithEmailAndPassword(email, password);
  }
  return firebaseSignIn(auth, email, password);
};

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth.createUserWithEmailAndPassword(email, password);
  }
  return firebaseCreateUser(auth, email, password);
};

export const onAuthStateChanged = (callback: (user: FirebaseUser | null) => void) => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth.onAuthStateChanged(callback as (user: any) => void);
  }
  return firebaseOnAuthStateChanged(auth, callback);
};

export const signOut = async () => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth.signOut();
  }
  return firebaseSignOut(auth);
};

export const updateProfile = async (user: FirebaseUser, profile: { displayName?: string; photoURL?: string }) => {
  if (!hasValidFirebaseConfig()) {
    console.log('Mock update profile:', profile);
    return Promise.resolve();
  }
  return firebaseUpdateProfile(user, profile);
};

// This file should export auth-related functions that work regardless of Firebase config

// Export functions that work even without Firebase config
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    // Always return false if using mock auth
    if (!hasValidFirebaseConfig()) {
      console.log('Using mock auth: user is never authenticated');
      return false;
    }
    
    // Actual implementation would check Firebase auth here
    return !!auth.currentUser;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

// Export a safe version of auth that never crashes the app
export const getSafeAuth = () => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth;
  }
  
  return auth;
};

// Other auth functions would go here, all with fallbacks to mock implementations
