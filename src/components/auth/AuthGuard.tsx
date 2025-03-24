
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  let authContext;
  try {
    authContext = useAuth();
  } catch (error) {
    console.error("Auth context not available in AuthGuard", error);
    // Redirect to login if auth context is not available
    return <Navigate to="/login" replace />;
  }
  
  const { user, profile, isLoading } = authContext;
  const location = useLocation();

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
