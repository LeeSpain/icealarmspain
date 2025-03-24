// Firebase authentication service
import { mockAuth } from './mockFirebase';
import { hasValidFirebaseConfig } from '@/utils/environment';

// This file should export auth-related functions that work regardless of Firebase config

// Export functions that work even without Firebase config
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    // Always return false if using mock auth
    if (!hasValidFirebaseConfig()) {
      console.log('Using mock auth: user is never authenticated');
      return false;
    }
    
    // Actual implementation would check Firebase auth here
    return false;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

// Export a safe version of auth that never crashes the app
export const getSafeAuth = () => {
  if (!hasValidFirebaseConfig()) {
    return mockAuth;
  }
  
  // In a real implementation, this would return the actual Firebase auth
  // For now, we'll return the mock to ensure the app still renders
  return mockAuth;
};

// Other auth functions would go here, all with fallbacks to mock implementations
