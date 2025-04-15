
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { DashboardActivity } from "@/components/admin/dashboard/ActivityManager";

export const useAdminDashboard = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: "€0",
    totalCustomers: "0",
    activeDevices: "0",
    pendingOrders: "0",
    monthlyGrowth: "0%",
    customerSatisfaction: "0%",
    revenueByProduct: [],
    recentActivities: [],
    userStats: {
      total: 0,
      active: 0,
      new: 0
    },
    alertStats: {
      urgent: 0,
      warning: 0,
      info: 0
    },
    deviceStats: {
      active: 0,
      offline: 0,
      warning: 0
    },
    systemHealth: {
      status: "0%",
      issues: 0
    },
    financialStats: {
      revenue: "€0",
      growth: "0%",
      forecast: "€0"
    },
    marketStats: {
      share: "0%",
      competitors: 0,
      conversion: "0%"
    },
    notifications: {
      unread: 0,
      total: 0
    },
    quickStats: {
      newMembers: 0,
      tickets: 0,
      activations: 0,
      orders: 0,
      sessions: 0
    }
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
    
    console.log("Setting active section to:", section, "from path:", path);
    setActiveSection(section);
  }, [location.pathname]);

  // Always fetch dashboard data
  useEffect(() => {
    console.log("Fetching dashboard data in useAdminDashboard");
    fetchDashboardData();
    
    // Welcome notification
    toast({
      title: "Welcome to Executive Dashboard",
      description: `${getTimeOfDay()}, Admin User!`, 
    });
  }, []);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...");
      
      // Mock data for development
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
          { id: 2, type: "User", description: "Admin User logged in", time: "Just now" },
        ],
        userStats: {
          total: 523,
          active: 496,
          new: 27
        },
        alertStats: {
          urgent: 3,
          warning: 8,
          info: 14
        },
        deviceStats: {
          active: 342,
          offline: 17,
          warning: 25
        },
        systemHealth: {
          status: "98%",
          issues: 2
        },
        financialStats: {
          revenue: "€24,850",
          growth: "12%",
          forecast: "€28,500"
        },
        marketStats: {
          share: "28%",
          competitors: 4,
          conversion: "3.8%"
        },
        notifications: {
          unread: 12,
          total: 36
        },
        quickStats: {
          newMembers: 24,
          tickets: 18,
          activations: 42,
          orders: 7,
          sessions: 156
        }
      };
      
      console.log("Dashboard data loaded:", data);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please refresh the page.",
        variant: "destructive"
      });
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
    console.log("Changing section to:", section);
    setActiveSection(section);
    
    // Navigate to the appropriate URL
    if (section === 'dashboard') {
      navigate('/admin');
    } else {
      navigate(`/admin/${section}`);
    }
    
    // Add activity
    addActivity("Navigation", `Navigated to ${section.replace('-', ' ')}`);
  };

  return {
    activeSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    dashboardData,
    user: { role: 'admin' },
    isAuthenticated: true,
    isLoading: false,
    language,
    handleSectionChange,
    addActivity
  };
};
