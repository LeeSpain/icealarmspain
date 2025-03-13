
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Admin components
import Sidebar from "@/components/admin/Sidebar";
import AdminDashboardContent from "@/components/admin/dashboard/AdminDashboardContent";
import AdminAIIntegration from "@/components/admin/dashboard/AdminAIIntegration";

// Custom hook - simplified version
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

const AdminDashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  const {
    activeSection,
    dashboardData,
    handleSectionChange,
    addActivity
  } = useAdminDashboard();
  
  // Update active section based on URL path when component mounts or URL changes
  useEffect(() => {
    const path = location.pathname;
    // Extract section from path
    const pathParts = path.split('/');
    const section = pathParts.length > 2 ? pathParts[2] : 'dashboard';
    
    // Only update if different from current section to avoid infinite loops
    if (activeSection !== section) {
      handleSectionChange(section);
    }
  }, [location.pathname]);

  // Force dev user role to admin
  React.useEffect(() => {
    const devUser = {
      uid: `dev-admin-${Date.now()}`,
      id: `dev-admin-${Date.now()}`,
      email: `admin@example.com`,
      name: 'Admin User',
      displayName: 'Admin User',
      role: 'admin',
      status: 'active',
      profileCompleted: true,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(devUser));
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('forceDevMode', 'true');
  }, []);

  return (
    <div className="flex h-screen bg-ice-50/30">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userData={{
          name: 'Admin User',
          displayName: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        }}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto">
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
