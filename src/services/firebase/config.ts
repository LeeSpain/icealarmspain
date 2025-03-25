
import { getEnvVar } from '@/utils/environment';

// Use minimal fallback config values without trying to access environment variables that might not exist
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'mock-api-key'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'mock-auth-domain'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'mock-project-id'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'mock-storage-bucket'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', 'mock-sender-id'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', 'mock-app-id'),
  measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID', 'mock-measurement-id')
};

console.log("Initializing Firebase with config (mock)");

// Mock Firebase app object
export const app = {
  name: "[DEFAULT]",
  options: { ...firebaseConfig }
};

// Simple check for real config
export const hasRealFirebaseConfig = (): boolean => {
  return false; // Always return false since we're using mock implementation
};
