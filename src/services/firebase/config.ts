
// Firebase configuration utils

// Check if we have Firebase config in environment variables
export const hasRealFirebaseConfig = 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;

// Log configuration status
console.log('Firebase config check:', {
  hasConfig: hasRealFirebaseConfig,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Defined' : 'Undefined',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Defined' : 'Undefined'
});

// Get Firebase configuration from environment variables
export const getFirebaseConfig = () => {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };
};
