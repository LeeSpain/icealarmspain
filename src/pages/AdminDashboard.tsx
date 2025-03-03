
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/admin/Sidebar";
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import UserManagement from "@/components/admin/UserManagement";
import PlaceholderSection from "@/components/admin/PlaceholderSection";
import AlertsManagement from "@/components/admin/AlertsManagement";
import InventoryManagement from "@/components/admin/InventoryManagement";
import ClientManagement from "@/components/admin/ClientManagement";
import DeviceManagement from "@/components/admin/DeviceManagement";

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Check authentication and redirect if needed
  useEffect(() => {
    console.log("AdminDashboard - Auth state:", { isAuthenticated, user, isLoading });
    
    // Only process redirects when loading is complete
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log("AdminDashboard - Not authenticated, redirecting to login");
        navigate('/login');
      } else if (user && user.role !== 'admin') {
        // Redirect based on role
        console.log("AdminDashboard - User has incorrect role:", user.role);
        switch (user.role) {
          case 'callcenter':
            navigate('/call-center');
            break;
          default:
            navigate('/dashboard');
            break;
        }
      } else {
        console.log("AdminDashboard - User authenticated with correct role");
      }
    }
  }, [isAuthenticated, user, navigate, isLoading]);

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Only render if user is authenticated and has admin role
  if (!isAuthenticated || !user || user.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Render the appropriate section based on activeSection
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMetrics dashboardMetrics={dashboardMetrics} />;
      case "users":
        return <UserManagement />;
      case "clients":
        return <ClientManagement />;
      case "devices":
        return <DeviceManagement />;
      case "alerts":
        return <AlertsManagement />;
      case "orders-list":
      case "inventory":
        return <InventoryManagement section={activeSection} />;
      case "orders":
      case "finance":
      case "sales":
      case "invoices":
      case "reports":
      case "settings":
      case "device-monitoring":
      case "device-maintenance":
      case "call-center":
      case "call-logs":
      case "agent-performance":
      case "client-details":
      case "client-onboarding":
      case "incidents":
      case "emergency":
      case "regions":
      case "products":
      case "product-catalog":
      case "product-pricing":
      case "subscriptions":
      case "support":
      case "knowledge-base":
      case "faqs":
      case "analytics":
      case "metrics":
      case "admin-users":
      case "roles":
      case "permissions":
      case "general":
      case "security":
      case "notifications":
        return <PlaceholderSection 
          title={activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} 
          description={`Manage ${activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} section`} 
        />;
      default:
        return <DashboardMetrics dashboardMetrics={dashboardMetrics} />;
    }
  };

  // Dummy data for dashboard metrics
  const dashboardMetrics = {
    totalRevenue: "€2,543,960",
    totalCustomers: "1,429",
    activeDevices: "3,892",
    pendingOrders: "47",
    monthlyGrowth: "+12.5%",
    customerSatisfaction: "94%",
    revenueByProduct: [
      { name: "IceAlarm Pro", value: 45 },
      { name: "IceAlarm Standard", value: 30 },
      { name: "IceAlarm Basic", value: 25 },
    ],
    recentActivities: [
      { id: 1, type: "New Order", description: "New order #37429 from Empresa de Madrid", time: "2 hours ago" },
      { id: 2, type: "Support", description: "Support ticket #2947 resolved", time: "4 hours ago" },
      { id: 3, type: "Device", description: "28 new devices activated in Barcelona region", time: "Yesterday" },
      { id: 4, type: "Payment", description: "Payment of €34,500 received from Hotel Group", time: "Yesterday" },
      { id: 5, type: "Maintenance", description: "Scheduled maintenance completed for 156 devices", time: "2 days ago" },
    ]
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      <ToastContainer />
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
