
// Firebase configuration utils
import { getRequiredEnvVar, getEnvVar, isDevelopment } from '@/utils/environment';

export const hasRealFirebaseConfig = (): boolean => {
  try {
    // Check for required Firebase config variables
    const apiKey = getEnvVar('VITE_FIREBASE_API_KEY', '');
    const authDomain = getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', '');
    
    return !!apiKey && !!authDomain;
  } catch (error) {
    console.error('Error checking Firebase config:', error);
    return false;
  }
};

// Log configuration status only in development
if (isDevelopment()) {
  console.log('Firebase config check:', {
    hasConfig: hasRealFirebaseConfig(),
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY') ? 'Defined' : 'Undefined',
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN') ? 'Defined' : 'Undefined'
  });
}

// Get Firebase configuration from environment variables
export const getFirebaseConfig = () => {
  // In production, throw an error if required vars are missing
  // In development, fall back to default values
  const getConfigValue = (key: string): string => {
    try {
      return isDevelopment() 
        ? getEnvVar(`VITE_${key}`, '') 
        : getRequiredEnvVar(`VITE_${key}`);
    } catch (error) {
      if (isDevelopment()) {
        console.warn(`Missing Firebase config: ${key}`);
        return '';
      }
      throw error;
    }
  };

  return {
    apiKey: getConfigValue('FIREBASE_API_KEY'),
    authDomain: getConfigValue('FIREBASE_AUTH_DOMAIN'),
    projectId: getConfigValue('FIREBASE_PROJECT_ID'),
    storageBucket: getConfigValue('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getConfigValue('FIREBASE_MESSAGING_SENDER_ID'),
    appId: getConfigValue('FIREBASE_APP_ID'),
    measurementId: getConfigValue('FIREBASE_MEASUREMENT_ID')
  };
};
