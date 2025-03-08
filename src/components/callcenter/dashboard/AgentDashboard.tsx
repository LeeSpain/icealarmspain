
import React from "react";
import { useAuth } from "@/context/auth";
import { mockCallData } from "../stats/mock-data";
import { mockTickets } from "../ticketing/mock-data";
import { getMockNotifications } from "../notifications/mock-notifications";

// Import the components
import WelcomeCard from "./components/WelcomeCard";
import UrgentNotifications from "./UrgentNotifications";
import StatsCards from "./components/StatsCards";
import PendingAlerts from "./components/PendingAlerts";
import ActivitySidebar from "./components/ActivitySidebar";
import DeviceMonitoring from "./components/DeviceMonitoring";
import AssistanceFooter from "./components/AssistanceFooter";

interface AgentDashboardProps {
  setActiveSection: (section: string) => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ setActiveSection }) => {
  const { user } = useAuth();
  
  const pendingTickets = mockTickets.filter(ticket => ticket.status === 'open' || ticket.status === 'pending');
  const criticalTickets = mockTickets.filter(ticket => ticket.priority === 'high');
  
  const recentCalls = [
    { id: 1, client: "Maria García", time: "10:32 AM", duration: "8m 45s", status: "completed" },
    { id: 2, client: "John Stevenson", time: "9:15 AM", duration: "12m 20s", status: "completed" },
    { id: 3, client: "Sarah Williams", time: "Yesterday", duration: "5m 10s", status: "missed" },
  ];
  
  const upcomingTasks = [
    { id: 1, task: "Follow up with Maria García", time: "2:00 PM", priority: "high" },
    { id: 2, task: "Call John Stevenson about device setup", time: "3:30 PM", priority: "medium" },
    { id: 3, task: "Team meeting", time: "4:00 PM", priority: "medium" },
  ];
  
  const totalCalls = mockCallData.dailyCalls.data.reduce((sum, num) => sum + num, 0);
  const avgResponseTime = mockCallData.responseTime.reduce((sum, item) => sum + item.value, 0) / mockCallData.responseTime.length;
  
  return (
    <div className="space-y-6">
      {/* Top section - Welcome Card & Stats Cards */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6 xl:col-span-5">
          <WelcomeCard user={user} />
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-7">
          <StatsCards 
            totalCalls={totalCalls}
            avgResponseTime={avgResponseTime}
            pendingTickets={pendingTickets.length}
            criticalTickets={criticalTickets.length}
          />
        </div>
      </div>
      
      {/* Middle section - Three column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UrgentNotifications 
          notifications={getMockNotifications()} 
          setActiveSection={setActiveSection} 
        />
        <PendingAlerts pendingTickets={pendingTickets} />
        <ActivitySidebar recentCalls={recentCalls} upcomingTasks={upcomingTasks} />
      </div>
      
      {/* Bottom section - Device Monitoring */}
      <DeviceMonitoring />
      
      {/* Assistance Footer */}
      <AssistanceFooter />
    </div>
  );
};

export default AgentDashboard;
