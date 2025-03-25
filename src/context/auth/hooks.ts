
import { useContext } from 'react';
import { AuthContext } from './context';

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Add debug logging to track when the hook is called and if context is available
  console.log("useAuth hook called, context available:", !!context);
  
  if (!context) {
    console.error("Auth context is undefined! This means useAuth was called outside of AuthProvider.");
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
