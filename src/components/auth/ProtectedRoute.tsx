
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useToast } from "@/components/ui/use-toast";

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
  const { isAuthenticated, isLoading, user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute - Current auth state:", { 
      isAuthenticated, 
      isLoading, 
      user,
      adminOnly,
      allowedRoles,
      path: location.pathname
    });
  }, [isAuthenticated, isLoading, user, adminOnly, allowedRoles, location.pathname]);

  // Show loading state while authentication is being verified
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login from:", location.pathname);
    
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  console.log("User authenticated with role:", user?.role);
  
  // Check for admin access if adminOnly is true
  if (adminOnly && user?.role !== 'admin') {
    console.log("Admin access required but user role is:", user?.role);
    
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this area",
      variant: "destructive"
    });
    
    // Redirect based on role
    if (user?.role === 'callcenter') {
      return <Navigate to="/call-center" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role || '')) {
    console.log("Required roles:", allowedRoles, "User role:", user.role);
    
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this area",
      variant: "destructive"
    });
    
    // Redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'callcenter') {
      return <Navigate to="/call-center" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If custom redirect path is provided and conditions are met, redirect
  if (redirectPath && user) {
    console.log("Custom redirect to:", redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
