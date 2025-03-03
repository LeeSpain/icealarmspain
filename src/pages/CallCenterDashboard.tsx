
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
import DeviceManagement from "@/components/callcenter/devices/DeviceManagement";
import AgentSchedule from "@/components/callcenter/schedule/AgentSchedule";
import KnowledgeBase from "@/components/callcenter/knowledge/KnowledgeBase";
import NotificationCenter from "@/components/callcenter/notifications/NotificationCenter";
import AgentProfile from "@/components/callcenter/profile/AgentProfile";

const CallCenterDashboard: React.FC = () => {
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
      } else {
        console.log("CallCenterDashboard - User authenticated with correct role");
      }
    }
  }, [isAuthenticated, user, navigate, isLoading]);

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
      case "devices":
        return <DeviceManagement />;
      case "stats":
        return <CallStats />;
      case "schedule":
        return <AgentSchedule />;
      case "knowledge":
        return <KnowledgeBase />;
      case "notifications":
        return <NotificationCenter />;
      case "profile":
        return <AgentProfile />;
      default:
        return <AgentDashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        user={user}
      />
      
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
