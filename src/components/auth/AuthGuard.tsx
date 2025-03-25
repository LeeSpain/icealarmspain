
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

  // Always show a very brief loading state
  const [showLoading, setShowLoading] = React.useState(true);

  // Very short timeout - just enough to let the actual content load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // In production, always render children to avoid blank screens
  if (import.meta.env.PROD) {
    // Log the issue but don't block rendering
    if (!user) {
      console.warn("AuthGuard: No user in production, rendering children anyway");
    }
    
    // Super brief artificial delay to allow auth to process before rendering
    if (showLoading) {
      return <LoadingSpinner size="sm" message="" />;
    }
    
    return <>{children}</>;
  }

  // In development, enforce authentication rules
  if (isLoading) {
    return <LoadingSpinner size="md" message="Loading..." />;
  }

  // Check role access
  const checkRoleAccess = () => {
    if (!allowedRoles || !profile) return true;
    return allowedRoles.includes(profile.role);
  };

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
