
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { app } from './config';
import { isDevelopment } from '@/utils/environment';

// Simple initialization without complex fallbacks
const auth = getAuth(app);

// Export everything
export { 
  auth, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
};

// Enable development mode features
if (isDevelopment()) {
  // Add any development-specific configuration here
  console.log('Firebase Auth running in development mode');
}
