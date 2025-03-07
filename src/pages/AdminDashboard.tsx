
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin components
import Sidebar from "@/components/admin/Sidebar";
import AdminDashboardLoading from "@/components/admin/dashboard/AdminDashboardLoading";
import DashboardRedirectingState from "@/components/admin/dashboard/DashboardRedirectingState";
import AdminDashboardContent from "@/components/admin/dashboard/AdminDashboardContent";

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

  return (
    <div className="flex h-screen bg-ice-50/30">
      <ToastContainer />
      
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
    </div>
  );
};

export default AdminDashboard;
