
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/callcenter/sidebar/Sidebar";
import Header from "@/components/callcenter/dashboard/Header";
import DashboardContent from "@/components/callcenter/dashboard/DashboardContent";

const CallCenterDashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  // Redirect if not logged in or not a call center agent
  useEffect(() => {
    console.log("CallCenterDashboard - Checking authentication:", isAuthenticated, "user:", user, "isLoading:", isLoading);
    
    // Only process redirects once and when authentication is confirmed
    if (!isLoading && !redirectAttempted) {
      setRedirectAttempted(true);
      
      if (!isAuthenticated) {
        console.log("CallCenterDashboard - Not authenticated, redirecting to login");
        navigate('/login');
      } else if (user && user.role !== 'callcenter') {
        // Redirect based on role
        console.log("CallCenterDashboard - User has incorrect role:", user.role);
        switch (user.role) {
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/dashboard');
            break;
        }
      } else {
        console.log("CallCenterDashboard - User authenticated with correct role");
      }
    }
  }, [isAuthenticated, user, navigate, isLoading, redirectAttempted]);

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">Loading call center dashboard...</p>
        </div>
      </div>
    );
  }

  // Only render if user is authenticated and has call center role
  if (!isAuthenticated || !user || user.role !== 'callcenter') {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        user={user}
      />

      <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        <Header 
          activeSection={activeSection}
        />
        
        <div className="flex-1 overflow-auto p-6">
          <DashboardContent 
            activeSection={activeSection}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            setActiveSection={setActiveSection}
          />
        </div>
      </main>
    </div>
  );
};

export default CallCenterDashboard;
