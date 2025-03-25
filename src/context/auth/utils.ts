
// Auth utility functions

/**
 * Determine a user's role based on their email
 * 
 * @param email User's email address
 * @returns The determined role for the user
 */
export function determineUserRole(email: string): string {
  if (!email) return 'member'; // Default role
  
  // Admin emails
  if (email.includes('admin@') || 
      email.endsWith('@admin.icealarm.es') || 
      email === 'admin@icealarm.com') {
    return 'admin';
  }
  
  // Call center accounts
  if (email.includes('callcenter@') || 
      email.includes('support@') ||
      email.endsWith('@support.icealarm.es')) {
    return 'callcenter';
  }
  
  // Test accounts
  if (email.includes('test@')) {
    if (email.includes('admin')) {
      return 'admin';
    } else if (email.includes('callcenter')) {
      return 'callcenter';
    }
  }
  
  // Default to member role
  return 'member';
}

/**
 * Check if a user has a specific role
 * 
 * @param userRole The user's current role
 * @param requiredRole The role(s) to check against
 * @returns True if the user has the required role
 */
export function hasRole(userRole: string, requiredRole: string | string[]): boolean {
  if (!userRole) return false;
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(userRole);
}

/**
 * Format a display name from an email if no display name is provided
 * 
 * @param email User's email address
 * @param displayName Optional display name
 * @returns Formatted display name
 */
export function formatDisplayName(email: string, displayName?: string): string {
  if (displayName) return displayName;
  
  if (email) {
    // Get the part before the @ symbol and capitalize first letter
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  }
  
  return 'User';
}
