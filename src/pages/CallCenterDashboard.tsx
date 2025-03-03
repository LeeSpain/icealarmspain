
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
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in or not an call center agent
  useEffect(() => {
    console.log("CallCenterDashboard - Checking authentication:", isAuthenticated, "user:", user);
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user && user.role !== 'callcenter') {
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/dashboard');
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);

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
