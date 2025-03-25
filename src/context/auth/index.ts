
// Re-export everything from the auth context
export * from './context';
export * from './types';
export * from './AuthProvider';
export * from './hooks';
export * from './utils';

// Explicitly re-export the useAuth hook for clarity
export { useAuth } from './hooks';
