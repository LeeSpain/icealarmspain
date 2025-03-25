
import { User } from './types';

/**
 * Utility function to extract role from email addresses
 * This can be used to assign admin access to specific email domains
 */
export const determineUserRole = (email: string): string => {
  // Default role for all users
  let role = 'member';
  
  // Simple role determination based on email - add more logic as needed
  if (email.includes('admin') || email.includes('root')) {
    role = 'admin';
  } else if (email.includes('callcenter') || email.includes('support')) {
    role = 'callcenter';
  }
  
  // In development mode, store the determined role in localStorage
  // for easier testing of different role types
  if (import.meta.env.DEV) {
    console.log(`Determined role for ${email}: ${role}`);
    localStorage.setItem('userRole', role);
  }
  
  return role;
};

/**
 * Helper functions to check user roles
 */
export const isAdmin = (user: User | null): boolean => {
  return !!user && user.role === 'admin';
};

export const isCallCenter = (user: User | null): boolean => {
  return !!user && user.role === 'callcenter';
};

export const isMember = (user: User | null): boolean => {
  return !!user && user.role === 'member';
};

/**
 * Utility to safely get user display name
 */
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return '';
  
  return user.displayName || user.name || user.email.split('@')[0] || 'User';
};
