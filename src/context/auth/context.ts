
import { createContext } from 'react';
import { AuthContextType } from './types';

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType | null>(null);

// We DO NOT set default implementations here to ensure consumers properly check for null
// This helps prevent silent errors where methods appear to exist but do nothing
