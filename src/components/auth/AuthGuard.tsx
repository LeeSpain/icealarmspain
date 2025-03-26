
import React from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // Simplified to always allow access
  return <>{children}</>;
};

export default AuthGuard;
