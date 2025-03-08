
import React from "react";
import Sidebar from "@/components/callcenter/sidebar/Sidebar";
import LoadingState from "@/components/callcenter/dashboard/LoadingState";
import SectionRenderer from "@/components/callcenter/dashboard/SectionRenderer";
import { useCallCenterDashboard } from "@/hooks/useCallCenterDashboard";

const CallCenterDashboard: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    selectedClient,
    handleClientSelect,
    user,
    isAuthenticated,
    isLoading
  } = useCallCenterDashboard();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAuthenticated || !user || user.role !== 'callcenter') {
    return <LoadingState message="Redirecting..." />;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        user={user}
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
