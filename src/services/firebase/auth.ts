import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { app } from './config';
import { isDevelopment } from '@/utils/environment';

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Export Firebase authentication methods
export { 
  auth, 
  analytics,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
};

// Enable auth emulator in development mode when explicitly configured
if (isDevelopment() && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  console.log('Using Firebase Auth Emulator');
  // connectAuthEmulator(auth, 'http://localhost:9099');
}
