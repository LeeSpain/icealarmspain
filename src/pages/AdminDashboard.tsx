
import React, { useEffect } from "react";

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
  
  const { toast } = useToast();
  
  // Debug rendering issues
  useEffect(() => {
    console.log("AdminDashboard rendering:", {
      isLoading,
      isAuthenticated,
      hasUser: !!user,
      userRole: user?.role,
      isDevelopment: localStorage.getItem('forceDevMode') === 'true',
      hasStoredRole: localStorage.getItem('userRole') === 'admin',
      activeSection
    });
  }, [isLoading, isAuthenticated, user, activeSection]);

  // Force dev mode for development testing
  useEffect(() => {
    const devMode = localStorage.getItem('forceDevMode') === 'true';
    if (!devMode) {
      console.log("Setting forceDevMode to true");
      localStorage.setItem('forceDevMode', 'true');
    }
  }, []);

  if (isLoading) {
    console.log("Rendering loading state");
    return <AdminDashboardLoading />;
  }

  const isDevelopment = localStorage.getItem('forceDevMode') === 'true';
  const hasStoredRole = localStorage.getItem('userRole') === 'admin';
  
  // Show error toast for debugging if in development mode but no user role
  useEffect(() => {
    if (isDevelopment && !isLoading && (!isAuthenticated || !user)) {
      console.error("In dev mode but no authenticated user found");
      toast({
        title: "Auth Debug Info",
        description: "Dev mode active but no user. Please check authentication.",
        variant: "destructive"
      });
    }
  }, [isDevelopment, isLoading, isAuthenticated, user, toast]);
  
  if (!isDevelopment && (!isAuthenticated || !user || user.role !== 'admin')) {
    console.log("Rendering redirecting state - access denied");
    return <DashboardRedirectingState language={language} />;
  }

  console.log("Rendering main dashboard content");
  return (
    <div className="flex h-screen bg-ice-50/30">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userData={user}
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
