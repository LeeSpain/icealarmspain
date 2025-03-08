
import React from "react";
// Remove import for ToastContainer
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Admin components
import Sidebar from "@/components/admin/Sidebar";
import AdminDashboardLoading from "@/components/admin/dashboard/AdminDashboardLoading";
import DashboardRedirectingState from "@/components/admin/dashboard/DashboardRedirectingState";
import AdminDashboardContent from "@/components/admin/dashboard/AdminDashboardContent";
import AdminAIIntegration from "@/components/admin/dashboard/AdminAIIntegration";

// Custom hook
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

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

  if (isLoading) {
    return <AdminDashboardLoading />;
  }

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return <DashboardRedirectingState language={language} />;
  }

  // Handle navigation requested by AI
  const handleAINavigation = (section: string, params?: any) => {
    handleSectionChange(section);
    
    // Add activity for this navigation
    addActivity(
      "System", 
      language === 'en' 
        ? `AI Assistant navigated to ${section}` 
        : `Asistente de IA navegó a ${section}`
    );
    
    // Additional handling for specific parameters could go here
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      {/* Remove ToastContainer */}
      
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
      
      {/* AI Assistant Integration */}
      <AdminAIIntegration 
        activeSection={activeSection}
        onNavigate={handleAINavigation}
      />
    </div>
  );
};

export default AdminDashboard;
