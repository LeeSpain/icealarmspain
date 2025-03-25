
import { initializeApp } from 'firebase/app';
import { getEnvVar, getRequiredEnvVar } from '@/utils/environment';

// Check if we have real Firebase config available
export const hasRealFirebaseConfig = (): boolean => {
  return (
    !!getEnvVar('VITE_FIREBASE_API_KEY') &&
    !!getEnvVar('VITE_FIREBASE_PROJECT_ID')
  );
};

// Get Firebase configuration with fallbacks for development
const getFirebaseConfig = () => {
  // Try to use environment variables first
  try {
    return {
      apiKey: getRequiredEnvVar('VITE_FIREBASE_API_KEY'),
      authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', `${getRequiredEnvVar('VITE_FIREBASE_PROJECT_ID')}.firebaseapp.com`),
      projectId: getRequiredEnvVar('VITE_FIREBASE_PROJECT_ID'),
      storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', `${getRequiredEnvVar('VITE_FIREBASE_PROJECT_ID')}.appspot.com`),
      messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '000000000000'),
      appId: getRequiredEnvVar('VITE_FIREBASE_APP_ID'),
      measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID')
    };
  } catch (e) {
    console.error('Failed to load Firebase config, using fallback configuration for development:', e);
    
    // Use development fallback values
    return {
      apiKey: 'fake-api-key-for-development',
      authDomain: 'fake-project-id.firebaseapp.com',
      projectId: 'fake-project-id',
      storageBucket: 'fake-project-id.appspot.com',
      messagingSenderId: '000000000000',
      appId: '1:000000000000:web:0000000000000000000000',
      measurementId: 'G-00000000'
    };
  }
};

// Initialize Firebase app
export const app = initializeApp(getFirebaseConfig());
