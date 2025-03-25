
// Re-export all auth-related types and hooks
export * from './types';
export * from './hooks';
export * from './utils';
export * from './authFunctions';

// Export the auth provider
export { AuthProvider } from './AuthProvider';

// Export the context itself, but avoid duplicate exports
export { AuthContext } from './context';
