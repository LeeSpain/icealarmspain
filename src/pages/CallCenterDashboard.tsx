
import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/callcenter/sidebar/Sidebar";
import DashboardContent from "@/components/callcenter/dashboard/DashboardContent";
import Header from "@/components/callcenter/dashboard/Header";

const CallCenterDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ToastContainer />
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        user={user}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Header 
          activeSection={activeSection} 
          sidebarCollapsed={sidebarCollapsed} 
          setSidebarCollapsed={setSidebarCollapsed} 
        />
        
        <main className="p-6">
          <DashboardContent 
            activeSection={activeSection}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            setActiveSection={setActiveSection}
          />
        </main>
      </div>
    </div>
  );
};

export default CallCenterDashboard;
