
/**
 * Utility functions for authentication
 */

import { User } from './types';

/**
 * Check if a user has a specific role
 */
export const hasRole = (user: User | null, role: string | string[]): boolean => {
  if (!user || !user.role) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};

/**
 * Check if a user's profile is complete
 */
export const isProfileComplete = (user: User | null): boolean => {
  if (!user) return false;
  return !!user.profileCompleted;
};

/**
 * Format user display name
 */
export const formatUserName = (user: User | null): string => {
  if (!user) return 'Guest';
  
  if (user.displayName) {
    return user.displayName;
  }
  
  if (user.email) {
    // Use email username portion
    return user.email.split('@')[0];
  }
  
  return 'User';
};
