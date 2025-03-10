
// Firebase configuration utils

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
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCQjyL_ydhCYAPy9JSjzcnc2-A2roFffHE',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'icealarm-520f3.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'icealarm-520f3',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'icealarm-520f3.firebasestorage.app', 
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '520286024994',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:520286024994:web:d972e5b150b12d4889a17b',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-XWNSKESY1C'
  };
};
