
import { useContext } from 'react';
import { AuthContext } from './context';

// Create the useAuth hook
export const useAuth = () => useContext(AuthContext);
