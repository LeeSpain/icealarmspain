/**
 * Determines user role based on email
 */
export const determineUserRole = (email: string): string => {
  // Normalize email for comparison
  const normalizedEmail = email.toLowerCase().trim();
  
  console.log('Determining role for email:', normalizedEmail);
  
  // Use exact email matching to prevent partial matches
  switch (normalizedEmail) {
    case 'admin@icealarm.es':
      return 'admin';
    case 'callcenter@icealarm.es':
      return 'callcenter';
    case 'technician@icealarm.es':
      return 'technician';
    case 'support@icealarm.es':
      return 'support';
    case 'user@icealarm.es':
      return 'member';
    default:
      return 'member'; // Default role
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
