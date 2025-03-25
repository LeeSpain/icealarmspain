
// This file is kept for backward compatibility
// It re-exports auth functionality from the new auth context location
// to avoid breaking existing imports

import { createContext } from 'react';
import { 
  useAuth as useNewAuth,
  AuthProvider as NewAuthProvider
} from './auth';

// Re-export the hook for backward compatibility
export const useAuth = useNewAuth;

// Re-export the provider for backward compatibility
export const AuthProvider = NewAuthProvider;

// For type safety and direct imports
export * from './auth/types';

// Create a dummy context for TypeScript to be happy
// This context is never actually used since we redirect to the new implementation
const DummyAuthContext = createContext<any>(null);
export default DummyAuthContext;
