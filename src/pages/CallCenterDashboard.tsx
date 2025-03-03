
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/callcenter/sidebar/Sidebar";
import AgentDashboard from "@/components/callcenter/dashboard/AgentDashboard";
import TicketingSystem from "@/components/callcenter/ticketing/TicketingSystem";
import ChatSystem from "@/components/callcenter/chat/ChatSystem";
import ClientDetails from "@/components/callcenter/ClientDetails";
import CallStats from "@/components/callcenter/stats/CallStats";
import PlaceholderSection from "@/components/callcenter/dashboard/placeholder-section";

const CallCenterDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in or not a call center agent
  useEffect(() => {
    console.log("CallCenterDashboard - Auth state:", { isAuthenticated, user, isLoading });
    
    // Only process redirects when loading is complete
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log("CallCenterDashboard - Not authenticated, redirecting to login");
        navigate('/login');
      } else if (user && user.role !== 'callcenter') {
        // Redirect based on role
        console.log("CallCenterDashboard - User has incorrect role:", user.role);
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        console.log("CallCenterDashboard - User authenticated with correct role");
      }
    }
  }, [isAuthenticated, user, navigate, isLoading]);

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
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
        return <AgentDashboard setActiveSection={setActiveSection} />;
      case "tickets":
        return <TicketingSystem onClientSelect={setSelectedClient} />;
      case "chat":
        return <ChatSystem />;
      case "clients":
        return <ClientDetails selectedClientId={selectedClient} />;
      case "stats":
        return <CallStats />;
      case "all-clients":
      case "clients-alerts":
      case "clients-history":
      case "clients-devices":
      case "stats-performance":
      case "schedule":
      case "knowledge":
      case "notifications":
      case "profile":
        return <PlaceholderSection title={activeSection} />;
      default:
        return <AgentDashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        user={user}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          <ToastContainer />
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default CallCenterDashboard;
