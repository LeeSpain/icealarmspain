
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Header from "./Header";
import { StatsCards } from "./components/StatsCards";
import { PendingAlerts } from "./components/PendingAlerts";
import UrgentNotifications from "./UrgentNotifications";
import { WelcomeCard } from "./components/WelcomeCard";
import { DeviceMonitoring } from "./components/DeviceMonitoring";
import { ActivitySidebar } from "./components/ActivitySidebar";
import { AssistanceFooter } from "./components/AssistanceFooter";

interface AgentDashboardProps {
  setActiveSection: (section: string) => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ setActiveSection }) => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <WelcomeCard setActiveSection={setActiveSection} />
      
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Dashboard Content - Three column layout for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <UrgentNotifications setActiveSection={setActiveSection} />
        </div>
        
        <div className="lg:col-span-1">
          <PendingAlerts setActiveSection={setActiveSection} />
        </div>
      </div>
      
      {/* Bottom section - Three column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DeviceMonitoring />
        <ActivitySidebar />
        <AssistanceFooter />
      </div>
    </div>
  );
};

export default AgentDashboard;
