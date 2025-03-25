
import { User } from './types';

// Helper function to check if a user has a specific role
export const hasRole = (user: User | null, role: string): boolean => {
  if (!user) return false;
  return user.role === role;
};

// Helper function to check if a user has admin access
export const hasAdminAccess = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'admin';
};

// Helper function to check if a user has call center access
export const hasCallCenterAccess = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'callcenter' || user.role === 'admin';
};

// Helper to check if a user is authenticated
export const isAuthenticated = (user: User | null): boolean => {
  return !!user;
};
