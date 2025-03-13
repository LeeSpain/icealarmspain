
import React, { useEffect } from "react";
import Sidebar from "@/components/callcenter/sidebar/Sidebar";
import SectionRenderer from "@/components/callcenter/dashboard/SectionRenderer";
import { useCallCenterDashboard } from "@/hooks/useCallCenterDashboard";

const CallCenterDashboard: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    selectedClient,
    handleClientSelect
  } = useCallCenterDashboard();

  // Force dev user role to callcenter
  useEffect(() => {
    const devUser = {
      uid: `dev-callcenter-${Date.now()}`,
      id: `dev-callcenter-${Date.now()}`,
      email: `callcenter@example.com`,
      name: 'Call Center Agent',
      displayName: 'Call Center Agent',
      role: 'callcenter',
      status: 'active',
      profileCompleted: true,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(devUser));
    localStorage.setItem('userRole', 'callcenter');
    localStorage.setItem('forceDevMode', 'true');
  }, []);

  // Create a user object for the sidebar
  const mockUser = {
    uid: "dev-callcenter",
    id: "dev-callcenter",
    email: "callcenter@example.com",
    name: "Call Center Agent",
    displayName: "Call Center Agent",
    role: "callcenter",
    status: "active",
    profileCompleted: true,
    language: "en"
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        user={mockUser}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-8 max-w-7xl mx-auto w-full">
          <SectionRenderer 
            activeSection={activeSection} 
            selectedClient={selectedClient} 
            handleClientSelect={handleClientSelect}
            setActiveSection={setActiveSection}
          />
        </div>
      </div>
    </div>
  );
};

export default CallCenterDashboard;
