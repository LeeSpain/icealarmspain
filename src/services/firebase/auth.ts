
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

export const setPersistence = (persistenceType: string) => {
  console.log('Setting persistence to:', persistenceType);
  return firebaseSetPersistence(auth, persistenceType === 'local' ? browserLocalPersistence : browserSessionPersistence);
};

// Export Firebase auth compatibility object
export const firebaseAuth = {
  createUserWithEmailAndPassword: (email: string, password: string) => createUserWithEmailAndPassword(email, password),
  signInWithEmailAndPassword: (email: string, password: string) => signInWithEmailAndPassword(email, password),
  signOut: () => signOut(),
  updateProfile: (user: any, profile: { displayName?: string, photoURL?: string }) => updateProfile(user, profile),
  setPersistence: (persistenceType: string) => setPersistence(persistenceType),
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged: (callback: any) => onAuthStateChanged(auth, callback)
};

export { auth, analytics };
