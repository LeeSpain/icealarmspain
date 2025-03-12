
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isPageReady, setIsPageReady] = useState(false);

  // Try to get authentication info from localStorage if auth context isn't ready
  const [localAuth, setLocalAuth] = useState({
    isAuthenticated: false,
    role: null as string | null,
  });

  // Initialize authentication from localStorage (faster than waiting for context)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const userRole = localStorage.getItem('userRole');
      
      if (storedUser) {
        console.log("ProtectedRoute: Found stored user");
        setLocalAuth({
          isAuthenticated: true,
          role: userRole || (storedUser ? JSON.parse(storedUser)?.role : null)
        });
      }
      
      // Mark the page as ready for rendering
      setTimeout(() => {
        setIsPageReady(true);
      }, 300);
    } catch (error) {
      console.error("ProtectedRoute: Error reading from localStorage", error);
      setIsPageReady(true);
    }
  }, []);

  // Get role from user object first, then fallback to localStorage
  const effectiveRole = user?.role || localAuth.role || localStorage.getItem('userRole');
  
  // Use either context authentication or localStorage authentication
  const effectivelyAuthenticated = isAuthenticated || localAuth.isAuthenticated;

  useEffect(() => {
    console.log("ProtectedRoute - Current auth state:", { 
      contextAuthenticated: isAuthenticated, 
      localAuthenticated: localAuth.isAuthenticated,
      isLoading, 
      user,
      effectiveRole,
      adminOnly,
      allowedRoles,
      path: location.pathname
    });
    
    // Check for authentication issues
    if (!isLoading && !effectivelyAuthenticated) {
      console.log("Not authenticated, will redirect to login");
    }
  }, [isAuthenticated, localAuth.isAuthenticated, isLoading, user, adminOnly, allowedRoles, location.pathname, effectiveRole]);

  // Show loading state while authentication is being verified
  if (isLoading && !isPageReady) {
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
  if (!effectivelyAuthenticated) {
    const loginPath = `/login?redirect=${encodeURIComponent(location.pathname)}`;
    console.log("User not authenticated, redirecting to:", loginPath);
    return <Navigate to={loginPath} replace />;
  }

  // Check for admin access if adminOnly is true
  if (adminOnly && effectiveRole !== 'admin') {
    console.log("Admin access required but user role is:", effectiveRole);
    
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this area",
      variant: "destructive"
    });
    
    return <Navigate to="/dashboard" replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0 && effectiveRole && !allowedRoles.includes(effectiveRole)) {
    console.log("Required roles:", allowedRoles, "User role:", effectiveRole);
    
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this area",
      variant: "destructive"
    });
    
    // Return to appropriate dashboard based on role
    const redirectTarget = effectiveRole === 'admin' ? '/admin' : 
                         effectiveRole === 'callcenter' ? '/call-center' : 
                         '/dashboard';
    
    return <Navigate to={redirectTarget} replace />;
  }

  // If custom redirect path is provided and conditions are met, redirect
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
