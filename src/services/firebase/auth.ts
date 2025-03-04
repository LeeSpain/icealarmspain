
import { 
  getAuth, 
  createUserWithEmailAndPassword as firebaseCreateUser, 
  signInWithEmailAndPassword as firebaseSignIn, 
  signOut as firebaseSignOut, 
  updateProfile as firebaseUpdateProfile,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence as firebaseSetPersistence
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { MockAuth } from './mockAuth';
import { hasRealFirebaseConfig, getFirebaseConfig } from './config';

// Initialize auth service based on configuration
let auth: any;
let firebaseApp: any;

// Create and export auth instance
if (hasRealFirebaseConfig) {
  console.log('Using real Firebase authentication');
  
  try {
    firebaseApp = initializeApp(getFirebaseConfig());
    auth = getAuth(firebaseApp);
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
  if (hasRealFirebaseConfig) {
    return firebaseSignIn(auth, email, password);
  } else {
    return (auth as MockAuth).signInWithEmailAndPassword(email, password);
  }
};

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
  if (hasRealFirebaseConfig) {
    return firebaseCreateUser(auth, email, password);
  } else {
    return (auth as MockAuth).createUserWithEmailAndPassword(email, password);
  }
};

export const signOut = async () => {
  if (hasRealFirebaseConfig) {
    return firebaseSignOut(auth);
  } else {
    return (auth as MockAuth).signOut();
  }
};

export const updateProfile = async (user: any, profile: { displayName?: string, photoURL?: string }) => {
  if (hasRealFirebaseConfig) {
    return firebaseUpdateProfile(user, profile);
  } else {
    return (auth as MockAuth).updateProfile(user, profile);
  }
};

export const setPersistence = async (persistenceType: string) => {
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
  browserSessionPersistence
};

export { auth };
