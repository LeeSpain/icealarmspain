
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import 'react-toastify/dist/ReactToastify.css';

// Admin components
import Sidebar from "@/components/admin/Sidebar";
import SectionRenderer from "@/components/admin/dashboard/SectionRenderer";
import AdminDashboardLoading from "@/components/admin/dashboard/AdminDashboardLoading";
import { DashboardActivity, useActivityManager } from "@/components/admin/dashboard/ActivityManager";
import AdminUsersManagement from "@/components/admin/AdminUsersManagement";
import UserManagement from "@/components/admin/UserManagement";
import ClientManagement from "@/components/admin/ClientManagement";
import DeviceManagement from "@/components/admin/DeviceManagement";
import AlertsManagement from "@/components/admin/AlertsManagement";
import RolesManagement from "@/components/admin/RolesManagement";
import PermissionsManagement from "@/components/admin/PermissionsManagement";
import InventoryManagement from "@/components/admin/InventoryManagement";
import PlaceholderSection from "@/components/admin/PlaceholderSection";

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();
  const { language } = useLanguage();
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

  // Determine active section from URL path
  useEffect(() => {
    const path = location.pathname;
    let section = 'dashboard';
    
    if (path === '/admin') {
      section = 'dashboard';
    } else {
      // Extract section from path like /admin/users -> users
      const pathParts = path.split('/');
      if (pathParts.length >= 3) {
        section = pathParts[2];
      }
    }
    
    setActiveSection(section);
  }, [location.pathname]);

  useEffect(() => {
    console.log("AdminDashboard - Auth state:", { isAuthenticated, user, isLoading });
    
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log("AdminDashboard - Not authenticated, redirecting to login");
        navigate('/login');
      } else if (user && user.role !== 'admin') {
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
        fetchDashboardData();
        
        if (user) {
          const timeOfDay = getTimeOfDay();
          toast.success(`${timeOfDay}, ${user.displayName || user.email?.split('@')[0] || 'Admin'}! Welcome to IceAlarm España admin dashboard.`);
        }
      }
    }
  }, [isAuthenticated, user, navigate, isLoading]);
  
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const fetchDashboardData = async () => {
    try {
      const data = {
        totalRevenue: "€25,320",
        totalCustomers: "148",
        activeDevices: "243",
        pendingOrders: "12",
        monthlyGrowth: "18%",
        customerSatisfaction: "92%",
        revenueByProduct: [
          { name: "IceAlarm Pro", value: 12500 },
          { name: "IceAlarm Standard", value: 8200 },
          { name: "IceAlarm Basic", value: 4620 },
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

  const { addActivity } = useActivityManager({
    activities: dashboardData.recentActivities as DashboardActivity[],
    onActivityAdded: (updatedActivities) => {
      setDashboardData(prev => ({
        ...prev,
        recentActivities: updatedActivities
      }));
    }
  });

  // Handle section changes
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    navigate(`/admin/${section === 'dashboard' ? '' : section}`);
  };

  if (isLoading) {
    return <AdminDashboardLoading />;
  }

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

  const renderSectionComponent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <SectionRenderer 
            activeSection="dashboard" 
            dashboardData={dashboardData}
            onActivityAdded={addActivity}
          />
        );
      case 'users':
        return <UserManagement />;
      case 'clients':
        return <ClientManagement />;
      case 'devices':
        return <DeviceManagement />;
      case 'alerts':
        return <AlertsManagement />;
      case 'admin-users':
        return <AdminUsersManagement />;
      case 'roles':
        return <RolesManagement />;
      case 'permissions':
        return <PermissionsManagement />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return (
          <PlaceholderSection 
            title={activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} 
            description={`This is the ${activeSection} section of the admin dashboard.`}
          />
        );
    }
  };

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
          {renderSectionComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
