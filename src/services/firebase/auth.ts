
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { app } from './config';
import { isDevelopment } from '@/utils/environment';

// Initialize Firebase Authentication with graceful fallbacks
const createAuthFallback = () => {
  console.warn('Creating Firebase Auth fallback due to missing configuration');
  
  // Create a minimal mock implementation
  return {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      console.log('Auth state change requested (fallback mode)');
      callback(null);
      return () => {}; // Return unsubscribe function
    },
    signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase auth not available')),
    createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase auth not available')),
    signOut: () => Promise.resolve()
  };
};

// Try to initialize auth, fall back gracefully
let auth;
let analytics;

try {
  // Only attempt to initialize if app is properly defined
  if (app && typeof app.name === 'string') {
    auth = getAuth(app);
    
    // Analytics is optional, so wrap in try/catch
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.warn('Analytics initialization failed:', e);
      analytics = null;
    }
  } else {
    auth = createAuthFallback();
    analytics = null;
  }
} catch (error) {
  console.error('Failed to initialize Firebase auth:', error);
  auth = createAuthFallback();
  analytics = null;
}

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
