
// Environment utility functions

/**
 * Check if we're running in development mode
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Check if we should use mock authentication for development
 */
export const isMockAuthEnabled = (): boolean => {
  return isDevelopment() || !hasValidFirebaseConfig();
};

/**
 * Check if we have a valid Firebase configuration
 */
export const hasValidFirebaseConfig = (): boolean => {
  // This would check for Firebase config in a real app
  // For now, we're returning false to force mock auth
  return false;
};
