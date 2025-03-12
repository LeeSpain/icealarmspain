
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Admin components
import Sidebar from "@/components/admin/Sidebar";
import AdminDashboardLoading from "@/components/admin/dashboard/AdminDashboardLoading";
import DashboardRedirectingState from "@/components/admin/dashboard/DashboardRedirectingState";
import AdminDashboardContent from "@/components/admin/dashboard/AdminDashboardContent";
import AdminAIIntegration from "@/components/admin/dashboard/AdminAIIntegration";

// Custom hook
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [localUser, setLocalUser] = useState<any>(null);
  const [localRole, setLocalRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize from localStorage for faster response
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const storedRole = localStorage.getItem('userRole');
      
      console.log("AdminDashboard: Initial check -", {
        hasStoredUser: !!storedUser,
        storedRole,
        isDevelopment: localStorage.getItem('forceDevMode') === 'true'
      });
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setLocalUser(user);
          setLocalRole(user.role || storedRole);
        } catch (e) {
          console.error("Error parsing stored user", e);
        }
      } else {
        setLocalRole(storedRole);
      }
      
      // Mark as loaded after a short delay
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    } catch (e) {
      console.error("Error loading initial state", e);
      setIsLoaded(true);
    }
  }, []);
  
  const {
    activeSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    dashboardData,
    user,
    isAuthenticated,
    isLoading,
    language,
    handleSectionChange,
    addActivity
  } = useAdminDashboard();
  
  // Debug rendering issues
  useEffect(() => {
    console.log("AdminDashboard rendering:", {
      contextIsLoading: isLoading,
      contextIsAuthenticated: isAuthenticated,
      contextUser: user?.role,
      localUser: localUser?.role,
      localRole,
      isDevelopment: localStorage.getItem('forceDevMode') === 'true',
      hasStoredRole: localStorage.getItem('userRole') === 'admin',
      activeSection
    });
  }, [isLoading, isAuthenticated, user, localUser, localRole, activeSection]);

  // Force dev mode for development testing
  useEffect(() => {
    const devMode = localStorage.getItem('forceDevMode') === 'true';
    if (!devMode) {
      console.log("Setting forceDevMode to true");
      localStorage.setItem('forceDevMode', 'true');
    }
  }, []);

  if (!isLoaded || isLoading) {
    console.log("Rendering loading state");
    return <AdminDashboardLoading />;
  }

  const effectiveRole = user?.role || localRole;
  const effectiveUser = user || localUser;
  const isDevelopment = localStorage.getItem('forceDevMode') === 'true';
  const hasStoredRole = localStorage.getItem('userRole') === 'admin';
  const hasAdminAccess = isDevelopment || (effectiveRole === 'admin') || hasStoredRole;
  
  // Debug toast for development mode but no user
  if (isDevelopment && !isLoading && !isAuthenticated && !effectiveUser) {
    console.error("In dev mode but no authenticated user found");
    toast({
      title: "Auth Debug Info",
      description: "Dev mode active but no user. Please check authentication.",
      variant: "destructive"
    });
    
    // Redirect to login after showing toast
    setTimeout(() => {
      navigate('/login?redirect=/admin', { replace: true });
    }, 2000);
    
    return <AdminDashboardLoading />;
  }
  
  // Check access to admin dashboard
  if (!hasAdminAccess) {
    console.log("Rendering redirecting state - access denied. Role:", effectiveRole);
    
    // Show access denied toast
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin dashboard",
      variant: "destructive"
    });
    
    // Redirect to appropriate dashboard
    setTimeout(() => {
      if (effectiveRole === 'callcenter') {
        navigate('/call-center', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }, 1000);
    
    return <DashboardRedirectingState language={language} />;
  }

  console.log("Rendering main dashboard content with role:", effectiveRole);
  return (
    <div className="flex h-screen bg-ice-50/30">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userData={effectiveUser}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          <AdminDashboardContent 
            activeSection={activeSection}
            dashboardData={dashboardData}
            addActivity={addActivity}
          />
        </div>
      </div>
      
      <AdminAIIntegration 
        activeSection={activeSection}
        onNavigate={handleSectionChange}
      />
    </div>
  );
};

export default AdminDashboard;
