
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const location = useLocation();
  
  // Safely try to use auth context
  let user = null;
  let profile = null;
  let isLoading = false;
  
  try {
    // Only import and use the auth context if it's available
    const { useAuth } = require('@/context/AuthContext');
    try {
      const authContext = useAuth();
      user = authContext?.user;
      profile = authContext?.profile;
      isLoading = authContext?.isLoading || false;
    } catch (error) {
      console.error("Auth context not available in AuthGuard", error);
      // Continue to redirect to login below
    }
  } catch (error) {
    console.error("Could not import auth module in AuthGuard", error);
    // Continue to redirect to login below
  }

  const checkRoleAccess = () => {
    if (!allowedRoles || !profile) return true;
    return allowedRoles.includes(profile.role);
  };

  if (isLoading) {
    // You could return a loading spinner here
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (allowedRoles && !checkRoleAccess()) {
    // Redirect to dashboard if user doesn't have required role
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
