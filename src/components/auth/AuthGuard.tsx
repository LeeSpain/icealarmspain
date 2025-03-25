
import React from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

// AuthGuard that simply renders children without any auth checks
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  return <>{children}</>;
};

export default AuthGuard;
