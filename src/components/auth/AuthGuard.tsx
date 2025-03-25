
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth'; // Use relative path for consistency
import LoadingSpinner from '../ui/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  // For debugging
  console.log("AuthGuard: user=", user, "profile=", profile, "isLoading=", isLoading);

  // Check role access
  const checkRoleAccess = () => {
    if (!allowedRoles || !profile) return true;
    return allowedRoles.includes(profile.role);
  };

  // Show a brief loading state, but don't block rendering for too long
  if (isLoading) {
    return <LoadingSpinner size="md" message="Loading..." />;
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
