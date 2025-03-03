
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { mockCallData } from "../stats/mock-data";
import { mockTickets } from "../ticketing/mock-data";
import { getMockNotifications } from "../notifications/mock-notifications";

// Import the new components
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
    <div className="space-y-4">
      {/* Welcome Card with Urgent Notifications stacked (changed from side by side) */}
      <div className="space-y-4">
        <WelcomeCard user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <UrgentNotifications 
              notifications={getMockNotifications()} 
              setActiveSection={setActiveSection} 
            />
          </div>
          <div className="lg:col-span-2">
            <StatsCards 
              totalCalls={totalCalls}
              avgResponseTime={avgResponseTime}
              pendingTickets={pendingTickets.length}
              criticalTickets={criticalTickets.length}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content Area with Pending Alerts and Activity Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PendingAlerts pendingTickets={pendingTickets} />
        <ActivitySidebar recentCalls={recentCalls} upcomingTasks={upcomingTasks} />
      </div>
      
      {/* Device Monitoring */}
      <DeviceMonitoring />
      
      {/* Assistance Footer */}
      <AssistanceFooter />
    </div>
  );
};

export default AgentDashboard;
