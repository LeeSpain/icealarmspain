
// This file provides compatibility with the old AuthContext.tsx approach,
// allowing for a smoother transition to the new auth system

import { useAuth as useNewAuth } from './hooks';

// This is a wrapper around the new useAuth hook that provides compatibility
// with code that imports from the old location
export const useAuth = useNewAuth;
