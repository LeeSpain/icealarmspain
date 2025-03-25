
import React from 'react';
import LoadingSpinner from '../ui/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

// Simplified AuthGuard that no longer checks authentication
// Just renders children directly for now until auth is re-implemented later
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // Render children immediately without auth checks
  return <>{children}</>;
};

export default AuthGuard;
