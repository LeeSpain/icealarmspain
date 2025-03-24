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
  User as FirebaseUser
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirebaseConfig } from './config';

// Initialize Firebase if config is valid
let auth;
let analytics;

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
    auth = mockAuth;
    analytics = null;
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  auth = mockAuth;
  analytics = null;
}

// Re-export Firebase auth functions with safe fallbacks
export { auth, analytics };

// Re-export types
export type { FirebaseUser };

// Export wrapped versions of Firebase functions
export const signInWithEmailAndPassword = async (auth, email, password) => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth.signInWithEmailAndPassword(email, password);
  }
  return firebaseSignIn(auth, email, password);
};

export const createUserWithEmailAndPassword = async (auth, email, password) => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth.createUserWithEmailAndPassword(email, password);
  }
  return firebaseCreateUser(auth, email, password);
};

export const onAuthStateChanged = (auth, callback) => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth.onAuthStateChanged(callback);
  }
  return firebaseOnAuthStateChanged(auth, callback);
};

export const signOut = async (auth) => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth.signOut();
  }
  return firebaseSignOut(auth);
};

export const updateProfile = async (user, profile) => {
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
