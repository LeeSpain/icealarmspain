
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import { DashboardActivity } from "@/components/admin/dashboard/ActivityManager";

export const useAdminDashboard = () => {
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

  // Extract active section from URL
  useEffect(() => {
    const path = location.pathname;
    let section = 'dashboard';
    
    if (path === '/admin') {
      section = 'dashboard';
    } else {
      const pathParts = path.split('/');
      if (pathParts.length >= 3) {
        section = pathParts[2];
      }
    }
    
    setActiveSection(section);
  }, [location.pathname]);

  // Handle authentication and role checking
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

  const addActivity = (type: string, description: string) => {
    const newActivity = {
      id: Date.now(),
      type,
      description,
      time: "Just now"
    };
    
    setDashboardData(prev => ({
      ...prev,
      recentActivities: [newActivity, ...(prev.recentActivities as DashboardActivity[]).slice(0, 4)]
    }));
    
    return description;
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    navigate(`/admin/${section === 'dashboard' ? '' : section}`);
  };

  return {
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
  };
};
