
// Utility functions for auth context

/**
 * Determines user role based on email
 */
export const determineUserRole = (email: string): string => {
  // Normalize email for comparison
  const normalizedEmail = email.toLowerCase().trim();
  
  if (normalizedEmail === 'admin@icealarm.es') {
    return 'admin';
  } else if (normalizedEmail === 'callcenter@icealarm.es') {
    return 'callcenter';
  } else if (normalizedEmail === 'technician@icealarm.es') {
    return 'technician';
  } else if (normalizedEmail === 'support@icealarm.es') {
    return 'support';
  } else if (normalizedEmail === 'user@icealarm.es') {
    return 'member';
  } else {
    return 'member';
  }
};

/**
 * Check if we are in development mode
 */
export const isDevelopmentMode = (): boolean => {
  try {
    // Check for development mode flag in localStorage
    return localStorage.getItem('forceDevMode') === 'true';
  } catch (e) {
    // If we can't access localStorage, assume not in dev mode
    return false;
  }
};
