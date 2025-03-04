
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import 'react-toastify/dist/ReactToastify.css';

// Admin components imports
import Sidebar from "@/components/admin/Sidebar";
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import UserManagement from "@/components/admin/UserManagement";
import PlaceholderSection from "@/components/admin/PlaceholderSection";
import AlertsManagement from "@/components/admin/AlertsManagement";
import InventoryManagement from "@/components/admin/InventoryManagement";
import ClientManagement from "@/components/admin/ClientManagement";
import DeviceManagement from "@/components/admin/DeviceManagement";
import AdminUsersManagement from "@/components/admin/AdminUsersManagement";
import RolesManagement from "@/components/admin/RolesManagement";
import PermissionsManagement from "@/components/admin/PermissionsManagement";

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: "€0",
    totalCustomers: "0",
    activeDevices: "0",
    pendingOrders: "0",
    monthlyGrowth: "0%",
    customerSatisfaction: "0%",
    revenueByProduct: [],
    recentActivities: []
  });

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
        // Fetch initial dashboard data
        fetchDashboardData();
        
        // Welcome the admin user
        if (user) {
          const timeOfDay = getTimeOfDay();
          toast.success(`${timeOfDay}, ${user.displayName || user.email?.split('@')[0] || 'Admin'}! Welcome to IceAlarm España admin dashboard.`);
        }
      }
    }
  }, [isAuthenticated, user, navigate, isLoading]);
  
  // Get time of day for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  // Fetch dashboard data - in a real app, this would come from a database
  const fetchDashboardData = async () => {
    try {
      // For now, we'll use realistic sample data
      // In a real implementation, this would be an API call
      const data = {
        totalRevenue: "€0",
        totalCustomers: "0",
        activeDevices: "0",
        pendingOrders: "0",
        monthlyGrowth: "0%",
        customerSatisfaction: "0%",
        revenueByProduct: [
          { name: "IceAlarm Pro", value: 0 },
          { name: "IceAlarm Standard", value: 0 },
          { name: "IceAlarm Basic", value: 0 },
        ],
        recentActivities: [
          { id: 1, type: "System", description: "Dashboard initialized", time: "Just now" },
          { id: 2, type: "User", description: `${user?.displayName || user?.email?.split('@')[0] || 'Admin'} logged in`, time: "Just now" },
        ]
      };
      
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data. Please refresh the page.");
    }
  };

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">
            {language === 'en' ? 'Loading admin dashboard...' : 'Cargando panel de administración...'}
          </p>
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
          <p className="text-ice-700">
            {language === 'en' ? 'Redirecting...' : 'Redirigiendo...'}
          </p>
        </div>
      </div>
    );
  }

  // Function to add a new activity to the dashboard
  const addActivity = (type: string, description: string) => {
    const newActivity = {
      id: Date.now(),
      type,
      description,
      time: "Just now"
    };
    
    setDashboardData(prev => ({
      ...prev,
      recentActivities: [newActivity, ...prev.recentActivities.slice(0, 4)]
    }));
  };

  // Render the appropriate section based on activeSection
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMetrics dashboardMetrics={dashboardData} />;
      case "users":
        return <UserManagement onAction={(action) => addActivity("User", action)} />;
      case "clients":
        return <ClientManagement onAction={(action) => addActivity("Client", action)} />;
      case "devices":
        return <DeviceManagement onAction={(action) => addActivity("Device", action)} />;
      case "alerts":
        return <AlertsManagement onAction={(action) => addActivity("Alert", action)} />;
      case "admin-users":
        return <AdminUsersManagement onAction={(action) => addActivity("Admin", action)} />;
      case "roles":
        return <RolesManagement onAction={(action) => addActivity("Role", action)} />;  
      case "permissions":
        return <PermissionsManagement onAction={(action) => addActivity("Permission", action)} />;
      case "orders-list":
      case "inventory":
        return <InventoryManagement section={activeSection} onAction={(action) => addActivity("Inventory", action)} />;
      // Use PlaceholderSection for less important or not yet implemented sections
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
      case "general":
      case "security":
      case "notifications":
        return <PlaceholderSection 
          title={activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} 
          description={`Manage ${activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} section`} 
          onAction={(action) => addActivity(activeSection.charAt(0).toUpperCase() + activeSection.slice(1), action)}
        />;
      default:
        return <DashboardMetrics dashboardMetrics={dashboardData} />;
    }
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
        userData={user}
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
