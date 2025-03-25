
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  allowedRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children
}) => {
  // Just render the children with no authentication checks
  return <>{children}</>;
};

export default ProtectedRoute;
