
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Header from "./Header";
import StatsCards from "./components/StatsCards";
import PendingAlerts from "./components/PendingAlerts";
import UrgentNotifications from "./UrgentNotifications";
import WelcomeCard from "./components/WelcomeCard";
import DeviceMonitoring from "./components/DeviceMonitoring";
import ActivitySidebar from "./components/ActivitySidebar";
import AssistanceFooter from "./components/AssistanceFooter";
import { mockTickets } from "../ticketing/mock-data";

interface AgentDashboardProps {
  setActiveSection: (section: string) => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ setActiveSection }) => {
  const { language } = useLanguage();
  
  // Mock data for the dashboard
  const dashboardData = {
    totalCalls: 42,
    avgResponseTime: 3.2,
    pendingTickets: mockTickets.filter(t => t.status !== 'closed').length,
    criticalTickets: mockTickets.filter(t => t.priority === 'high').length
  };
  
  // Mock user for the welcome card
  const mockUser = {
    name: "Call Center Agent",
    displayName: "Call Center Agent"
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <WelcomeCard user={mockUser} />
      
      {/* Stats Cards */}
      <StatsCards 
        totalCalls={dashboardData.totalCalls}
        avgResponseTime={dashboardData.avgResponseTime}
        pendingTickets={dashboardData.pendingTickets}
        criticalTickets={dashboardData.criticalTickets}
      />
      
      {/* Dashboard Content - Three column layout for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <UrgentNotifications setActiveSection={setActiveSection} notifications={[]} />
        </div>
        
        <div className="lg:col-span-1">
          <PendingAlerts pendingTickets={mockTickets.filter(t => t.priority === 'high' && t.status !== 'closed')} />
        </div>
      </div>
      
      {/* Bottom section - Three column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DeviceMonitoring />
        <ActivitySidebar 
          recentCalls={[
            { id: 1, client: "John Doe", time: "10:30 AM", duration: "4m 20s", status: "completed" },
            { id: 2, client: "Jane Smith", time: "11:45 AM", duration: "2m 15s", status: "transferred" }
          ]}
          upcomingTasks={[
            { id: 1, task: "Client follow-up", time: "2:00 PM", priority: "medium" },
            { id: 2, task: "Team meeting", time: "3:30 PM", priority: "high" }
          ]}
        />
        <AssistanceFooter />
      </div>
    </div>
  );
};

export default AgentDashboard;
