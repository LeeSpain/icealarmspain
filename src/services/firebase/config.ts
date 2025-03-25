
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
    // Return config with fallbacks for both production and development
    return {
      apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'temp-api-key-for-fallback'),
      authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', `${getEnvVar('VITE_FIREBASE_PROJECT_ID', 'temp-project-id')}.firebaseapp.com`),
      projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'temp-project-id'),
      storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', `${getEnvVar('VITE_FIREBASE_PROJECT_ID', 'temp-project-id')}.appspot.com`),
      messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '000000000000'),
      appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:000000000000:web:0000000000000000000000'),
      measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID', '')
    };
  } catch (e) {
    console.error('Failed to load Firebase config:', e);
    
    // Use fallback values 
    console.log('Using fallback configuration');
    return {
      apiKey: 'temp-api-key-for-fallback',
      authDomain: 'temp-project-id.firebaseapp.com',
      projectId: 'temp-project-id',
      storageBucket: 'temp-project-id.appspot.com',
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
  console.log('Firebase initialized with project:', config.projectId);
  
  // Mark as using fallback if we don't have real config
  if (!hasRealFirebaseConfig()) {
    console.warn('Using placeholder Firebase configuration - some features may be limited');
  }
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // Create a mock app for graceful degradation
  console.warn('Using limited Firebase implementation');
  app = {};
}

export { app };
