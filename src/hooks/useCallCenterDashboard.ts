
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "react-toastify";

export const useCallCenterDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CallCenterDashboard - Auth state:", { isAuthenticated, user, isLoading });
    
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log("CallCenterDashboard - Not authenticated, redirecting to login");
        navigate('/login');
      } else if (user && user.role !== 'callcenter') {
        console.log("CallCenterDashboard - User has incorrect role:", user.role);
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
        toast.error("You don't have permission to access this area");
      } else {
        console.log("CallCenterDashboard - User authenticated with correct role");
      }
    }
  }, [isAuthenticated, user, navigate, isLoading]);

  // Handle client selection from any component
  const handleClientSelect = (clientId: number | null) => {
    setSelectedClient(clientId);
    if (clientId) {
      setActiveSection("clients");
    }
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    selectedClient,
    handleClientSelect,
    user,
    isAuthenticated,
    isLoading
  };
};
