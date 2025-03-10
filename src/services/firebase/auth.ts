
import { 
  getAuth, 
  createUserWithEmailAndPassword as firebaseCreateUser, 
  signInWithEmailAndPassword as firebaseSignIn, 
  signOut as firebaseSignOut, 
  updateProfile as firebaseUpdateProfile,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence as firebaseSetPersistence,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirebaseConfig } from './config';

// Initialize Firebase app
console.log('Initializing Firebase with configuration');
const firebaseApp = initializeApp(getFirebaseConfig());
const auth = getAuth(firebaseApp);
let analytics;

// Initialize analytics if in browser environment
if (typeof window !== 'undefined') {
  analytics = getAnalytics(firebaseApp);
  console.log('Firebase Analytics initialized');
}

// Export actual Firebase methods
export const signInWithEmailAndPassword = (email: string, password: string) => {
  console.log('Signing in with Firebase authentication', email);
  return firebaseSignIn(auth, email, password);
};

export const createUserWithEmailAndPassword = (email: string, password: string) => {
  console.log('Creating user with Firebase authentication', email);
  return firebaseCreateUser(auth, email, password);
};

export const signOut = () => {
  console.log('Signing out with Firebase authentication');
  return firebaseSignOut(auth);
};

export const updateProfile = (user: any, profile: { displayName?: string, photoURL?: string }) => {
  console.log('Updating profile with Firebase authentication');
  return firebaseUpdateProfile(user, profile);
};

export const setPersistence = (auth: any, persistenceType: any) => {
  console.log('Setting persistence to:', persistenceType === browserLocalPersistence ? 'local' : 'session');
  return firebaseSetPersistence(auth, persistenceType);
};

export const onAuthStateChanged = firebaseOnAuthStateChanged;

// Export Firebase auth compatibility object and constants
export { 
  auth, 
  analytics,
  browserLocalPersistence,
  browserSessionPersistence
};
