
import React from "react";
import TicketingSystem from "../ticketing/TicketingSystem";
import ClientDetails from "../ClientDetails";
import CallStats from "../stats/CallStats";
import PlaceholderSection from "../../admin/PlaceholderSection";
import { Bell, User, Calendar, ClipboardList, Users, BarChart3, Clock } from "lucide-react";

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
      case "tickets":
        return <TicketingSystem 
                 onClientSelect={(clientId) => {
                   setSelectedClient(clientId);
                   if (clientId) setActiveSection("clients");
                 }} 
               />;
      case "clients":
        return <ClientDetails selectedClientId={selectedClient} />;
      case "clients-alerts":
        return (
          <PlaceholderSection 
            title="Client Alerts" 
            description="Monitor critical alerts and warnings for all clients" 
            icon={<Bell className="h-5 w-5" />} 
          />
        );
      case "clients-history":
        return (
          <PlaceholderSection 
            title="Interaction History" 
            description="View complete history of client interactions" 
            icon={<Clock className="h-5 w-5" />} 
          />
        );
      case "stats":
        return <CallStats />;
      case "stats-performance":
        return (
          <PlaceholderSection 
            title="Agent Performance" 
            description="Track individual and team performance metrics" 
            icon={<BarChart3 className="h-5 w-5" />} 
          />
        );
      case "schedule":
        return (
          <PlaceholderSection 
            title="Agent Schedule" 
            description="View and manage your call center schedule" 
            icon={<Calendar className="h-5 w-5" />} 
          />
        );
      case "knowledge":
        return (
          <PlaceholderSection 
            title="Knowledge Base" 
            description="Access product information and troubleshooting guides" 
            icon={<ClipboardList className="h-5 w-5" />} 
          />
        );
      case "notifications":
        return (
          <PlaceholderSection 
            title="Notifications" 
            description="View all system notifications and alerts" 
            icon={<Bell className="h-5 w-5" />} 
          />
        );
      case "profile":
        return (
          <PlaceholderSection 
            title="Agent Profile" 
            description="View and edit your profile information" 
            icon={<User className="h-5 w-5" />} 
          />
        );
      default:
        return <TicketingSystem 
                 onClientSelect={(clientId) => {
                   setSelectedClient(clientId);
                   if (clientId) setActiveSection("clients");
                 }} 
               />;
    }
  };
  
  return (
    <main className="p-6">
      {renderActiveSection()}
    </main>
  );
};

export default DashboardContent;
