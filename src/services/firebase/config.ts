
import { initializeApp } from 'firebase/app';
import { getEnvVar } from '@/utils/environment';

// Use minimal fallback config values without trying to access environment variables that might not exist
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'AIzaSyCQjyL_ydhCYAPy9JSjzcnc2-A2roFffHE'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'icealarm-520f3.firebaseapp.com'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'icealarm-520f3'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'icealarm-520f3.appspot.com'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '520286024994'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:520286024994:web:d972e5b150b12d4889a17b'),
  measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID', 'G-XWNSKESY1C')
};

console.log("Initializing Firebase with config");

// Always initialize the app with available config
export const app = initializeApp(firebaseConfig);

// Simple check for real config
export const hasRealFirebaseConfig = (): boolean => {
  return !!getEnvVar('VITE_FIREBASE_API_KEY') && !!getEnvVar('VITE_FIREBASE_PROJECT_ID');
};
