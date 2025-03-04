
import { 
  getAuth, 
  createUserWithEmailAndPassword as firebaseCreateUser, 
  signInWithEmailAndPassword as firebaseSignIn, 
  signOut as firebaseSignOut, 
  updateProfile as firebaseUpdateProfile,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence as firebaseSetPersistence,
  onAuthStateChanged
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { MockAuth } from './mockAuth';
import { hasRealFirebaseConfig, getFirebaseConfig } from './config';

// Initialize auth service based on configuration
let auth: any;
let firebaseApp: any;
let analytics: any;

// Create and export auth instance
if (hasRealFirebaseConfig) {
  console.log('Using real Firebase authentication');
  
  try {
    firebaseApp = initializeApp(getFirebaseConfig());
    auth = getAuth(firebaseApp);
    
    // Initialize analytics if in browser environment
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(firebaseApp);
      console.log('Firebase Analytics initialized');
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    console.warn('Falling back to mock authentication');
    auth = new MockAuth();
  }
} else {
  console.log('Using mock authentication - for production, set Firebase environment variables');
  auth = new MockAuth();
}

// Export wrapped methods to ensure consistent interface between real and mock
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  console.log('Signing in with email and password...');
  if (hasRealFirebaseConfig) {
    return firebaseSignIn(auth, email, password);
  } else {
    return (auth as MockAuth).signInWithEmailAndPassword(email, password);
  }
};

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
  console.log('Creating user with email and password...');
  if (hasRealFirebaseConfig) {
    return firebaseCreateUser(auth, email, password);
  } else {
    return (auth as MockAuth).createUserWithEmailAndPassword(email, password);
  }
};

export const signOut = async () => {
  console.log('Signing out...');
  if (hasRealFirebaseConfig) {
    return firebaseSignOut(auth);
  } else {
    return (auth as MockAuth).signOut();
  }
};

export const updateProfile = async (user: any, profile: { displayName?: string, photoURL?: string }) => {
  console.log('Updating profile...');
  if (hasRealFirebaseConfig) {
    return firebaseUpdateProfile(user, profile);
  } else {
    return (auth as MockAuth).updateProfile(user, profile);
  }
};

export const setPersistence = async (persistenceType: string) => {
  console.log('Setting persistence to:', persistenceType);
  if (hasRealFirebaseConfig) {
    return firebaseSetPersistence(auth, persistenceType === 'local' ? browserLocalPersistence : browserSessionPersistence);
  } else {
    return (auth as MockAuth).setPersistence(persistenceType);
  }
};

// Export Firebase auth methods compatibility object
export const firebaseAuth = {
  createUserWithEmailAndPassword: (email: string, password: string) => createUserWithEmailAndPassword(email, password),
  signInWithEmailAndPassword: (email: string, password: string) => signInWithEmailAndPassword(email, password),
  signOut: () => signOut(),
  updateProfile: (user: any, profile: { displayName?: string, photoURL?: string }) => updateProfile(user, profile),
  setPersistence: (persistenceType: string) => setPersistence(persistenceType),
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged: (callback: any) => {
    if (hasRealFirebaseConfig) {
      return onAuthStateChanged(auth, callback);
    } else {
      return (auth as MockAuth).onAuthStateChanged(callback);
    }
  }
};

export { auth, analytics };
