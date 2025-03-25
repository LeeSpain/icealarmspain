
import { getEnvVar, getRequiredEnvVar, isDevelopment } from '@/utils/environment';

export function getFirebaseConfig() {
  // In development, use fallbacks for easy local development if not set
  if (isDevelopment()) {
    return {
      apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'demo-api-key'),
      authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'demo.firebaseapp.com'),
      projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'demo-project'),
      storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'demo.appspot.com'),
      messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '123456789'),
      appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:123456789:web:abcdef'),
      measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID', 'G-ABCDEF123')
    };
  }
  
  // In production, require these values
  return {
    apiKey: getRequiredEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getRequiredEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getRequiredEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getRequiredEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getRequiredEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getRequiredEnvVar('VITE_FIREBASE_APP_ID'),
    measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID', '')
  };
}
