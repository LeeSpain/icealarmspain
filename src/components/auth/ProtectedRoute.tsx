
import React from 'react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  console.log("ProtectedRoute rendering for path:", location.pathname);
  
  // In this simplified version, we always render the children without authentication checks
  return <>{children}</>;
};

export default ProtectedRoute;
