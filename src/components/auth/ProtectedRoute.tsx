
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  allowedRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false,
  allowedRoles = [],
  redirectPath
}) => {
  console.log("ProtectedRoute rendering with no authentication checks");
  
  // Just render the children with no authentication checks
  return <>{children}</>;
};

export default ProtectedRoute;
