
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
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

  // Add debugging for blank page troubleshooting
  useEffect(() => {
    console.log("useAdminDashboard initial state:", {
      isAuthenticated, 
      user, 
      isLoading,
      location: location.pathname
    });
  }, []);

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

  // In development mode, always fetch dashboard data
  useEffect(() => {
    const isDevelopment = localStorage.getItem('forceDevMode') === 'true';
    if (isDevelopment || (isAuthenticated && user && (user.role === 'admin' || localStorage.getItem('userRole') === 'admin'))) {
      console.log("Fetching dashboard data in useAdminDashboard");
      fetchDashboardData();
    }
  }, [isAuthenticated, user]);

  // Handle authentication and role checking
  useEffect(() => {
    console.log("AdminDashboard - Auth state:", { 
      isAuthenticated, 
      user, 
      isLoading,
      userRole: user?.role,
      storedRole: localStorage.getItem('userRole')
    });
    
    const isDevelopment = localStorage.getItem('forceDevMode') === 'true';
    
    if (!isLoading) {
      if (!isDevelopment && !isAuthenticated) {
        console.log("AdminDashboard - Not authenticated, redirecting to login");
        navigate('/login?redirect=/admin', { replace: true });
      } else if (!isDevelopment && user && user.role !== 'admin' && localStorage.getItem('userRole') !== 'admin') {
        console.log("AdminDashboard - User has incorrect role:", user.role);
        
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard",
          variant: "destructive"
        });
        
        switch (user.role) {
          case 'callcenter':
            navigate('/call-center', { replace: true });
            break;
          default:
            navigate('/dashboard', { replace: true });
            break;
        }
      } else {
        console.log("AdminDashboard - User authenticated with correct role or in dev mode");
        fetchDashboardData();
        
        // Welcome notification
        const userName = user?.displayName || user?.email?.split('@')[0] || 'Admin';
        toast({
          title: "Welcome to Admin Dashboard",
          description: `${getTimeOfDay()}, ${userName}!`, 
        });
      }
    }
  }, [isAuthenticated, user, navigate, isLoading, toast]);

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
          { id: 2, type: "User", description: `${user?.displayName || user?.email?.split('@')[0] || 'Admin'} logged in`, time: "Just now" },
        ]
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
