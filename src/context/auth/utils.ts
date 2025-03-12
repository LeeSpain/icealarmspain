
// Utility functions for auth context

/**
 * Determines user role based on email
 */
export const determineUserRole = (email: string): string => {
  // Normalize email for comparison
  const normalizedEmail = email.toLowerCase().trim();
  
  if (normalizedEmail.includes('admin')) {
    return 'admin';
  } else if (normalizedEmail.includes('callcenter')) {
    return 'callcenter';
  } else if (normalizedEmail.includes('technician')) {
    return 'technician';
  } else if (normalizedEmail.includes('support')) {
    return 'support';
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
