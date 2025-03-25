
import { initializeApp } from 'firebase/app';
import { getEnvVar, getRequiredEnvVar, isProduction } from '@/utils/environment';

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
    // In production, we must have real Firebase config
    if (isProduction() && !hasRealFirebaseConfig()) {
      console.error('CRITICAL: Missing Firebase configuration in production environment!');
      console.error('Please set the required environment variables in your Lovable project settings');
      throw new Error('Missing Firebase configuration in production');
    }

    return {
      apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'fake-api-key-for-development'),
      authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', `${getEnvVar('VITE_FIREBASE_PROJECT_ID', 'fake-project-id')}.firebaseapp.com`),
      projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'fake-project-id'),
      storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', `${getEnvVar('VITE_FIREBASE_PROJECT_ID', 'fake-project-id')}.appspot.com`),
      messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '000000000000'),
      appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:000000000000:web:0000000000000000000000'),
      measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID', '')
    };
  } catch (e) {
    console.error('Failed to load Firebase config:', e);
    
    if (isProduction()) {
      throw e; // In production, fail immediately
    }
    
    // Use development fallback values
    console.log('Using fallback configuration for development');
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

// Initialize Firebase app with better error handling
let app;
try {
  const config = getFirebaseConfig();
  app = initializeApp(config);
  console.log('Firebase initialized successfully with project:', config.projectId);
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  if (isProduction()) {
    // In production, this will be caught by the error handler in main.tsx
    throw error;
  } else {
    // In development, we can provide a mock Firebase app
    console.warn('Using mock Firebase implementation for development');
    app = null;
  }
}

export { app };
