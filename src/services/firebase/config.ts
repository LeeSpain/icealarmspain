
import { initializeApp } from 'firebase/app';
import { getEnvVar, getRequiredEnvVar, isProduction, isDevelopment } from '@/utils/environment';

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
    // Use existing config from .env file
    const apiKey = getEnvVar('VITE_FIREBASE_API_KEY', 'AIzaSyCQjyL_ydhCYAPy9JSjzcnc2-A2roFffHE');
    const projectId = getEnvVar('VITE_FIREBASE_PROJECT_ID', 'icealarm-520f3');
    
    // Return config with fallbacks from .env file
    return {
      apiKey,
      authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', `${projectId}.firebaseapp.com`),
      projectId,
      storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', `${projectId}.appspot.com`),
      messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '520286024994'),
      appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:520286024994:web:d972e5b150b12d4889a17b'),
      measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID', 'G-XWNSKESY1C')
    };
  } catch (e) {
    console.error('Failed to load Firebase config:', e);
    
    // Use fallback values from .env file
    console.log('Using fallback configuration from .env file');
    return {
      apiKey: 'AIzaSyCQjyL_ydhCYAPy9JSjzcnc2-A2roFffHE',
      authDomain: 'icealarm-520f3.firebaseapp.com',
      projectId: 'icealarm-520f3',
      storageBucket: 'icealarm-520f3.firebasestorage.app',
      messagingSenderId: '520286024994',
      appId: '1:520286024994:web:d972e5b150b12d4889a17b',
      measurementId: 'G-XWNSKESY1C'
    };
  }
};

// Initialize Firebase app with better error handling
let app;
try {
  const config = getFirebaseConfig();
  
  app = initializeApp(config);
  console.log('Firebase initialized with project:', config.projectId);
  
  // Mark as using fallback if we don't have real config
  if (!hasRealFirebaseConfig()) {
    console.warn('Using Firebase configuration from .env file');
  }
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // Create a mock app for graceful degradation
  console.warn('Using limited Firebase implementation');
  app = {};
}

export { app };
