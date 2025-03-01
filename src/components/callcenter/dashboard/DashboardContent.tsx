
import React from "react";
import { 
  Users, 
  TicketIcon,
  BarChart3,
  Bell,
  User,
  Calendar,
  ClipboardList,
  Clock,
  Smartphone,
  AlertTriangle,
  Phone
} from "lucide-react";
import TicketingSystem from "../ticketing/TicketingSystem";
import ClientDetails from "../ClientDetails";
import CallStats from "../stats/CallStats";
import PlaceholderSection from "../../admin/PlaceholderSection";
import AgentDashboard from "./AgentDashboard";

interface DashboardContentProps {
  activeSection: string;
  selectedClient: number | null;
  setSelectedClient: (clientId: number | null) => void;
  setActiveSection: (section: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeSection,
  selectedClient,
  setSelectedClient,
  setActiveSection,
}) => {
  // Render the appropriate section based on activeSection
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <AgentDashboard />;
      case "tickets":
        return <TicketingSystem 
                 onClientSelect={(clientId) => {
                   setSelectedClient(clientId);
                   if (clientId) setActiveSection("clients");
                 }} 
               />;
      case "all-clients":
        return (
          <PlaceholderSection 
            title="All Clients" 
            description="View and manage all client accounts" 
            icon={<Users className="h-5 w-5 text-primary" />} 
          />
        );
      case "clients":
        return <ClientDetails selectedClientId={selectedClient} />;
      case "clients-alerts":
        return (
          <PlaceholderSection 
            title="Client Alerts" 
            description="Monitor critical alerts and warnings for all clients" 
            icon={<AlertTriangle className="h-5 w-5 text-primary" />} 
          />
        );
      case "clients-devices":
        return (
          <PlaceholderSection 
            title="Client Devices" 
            description="Manage and monitor client devices and their status" 
            icon={<Smartphone className="h-5 w-5 text-primary" />} 
          />
        );
      case "clients-history":
        return (
          <PlaceholderSection 
            title="Interaction History" 
            description="View complete history of client interactions" 
            icon={<Clock className="h-5 w-5 text-primary" />} 
          />
        );
      case "stats":
        return <CallStats />;
      case "stats-performance":
        return (
          <PlaceholderSection 
            title="Agent Performance" 
            description="Track individual and team performance metrics" 
            icon={<BarChart3 className="h-5 w-5 text-primary" />} 
          />
        );
      case "schedule":
        return (
          <PlaceholderSection 
            title="Agent Schedule" 
            description="View and manage your call center schedule" 
            icon={<Calendar className="h-5 w-5 text-primary" />} 
          />
        );
      case "knowledge":
        return (
          <PlaceholderSection 
            title="Knowledge Base" 
            description="Access product information and troubleshooting guides" 
            icon={<ClipboardList className="h-5 w-5 text-primary" />} 
          />
        );
      case "notifications":
        return (
          <PlaceholderSection 
            title="Notifications" 
            description="View all system notifications and alerts" 
            icon={<Bell className="h-5 w-5 text-primary" />} 
          />
        );
      case "profile":
        return (
          <PlaceholderSection 
            title="Agent Profile" 
            description="View and edit your profile information" 
            icon={<User className="h-5 w-5 text-primary" />} 
          />
        );
      default:
        return <AgentDashboard />;
    }
  };
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {renderActiveSection()}
    </div>
  );
};

export default DashboardContent;
