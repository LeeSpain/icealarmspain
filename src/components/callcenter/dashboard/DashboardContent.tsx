
import React from "react";
import TicketingSystem from "../TicketingSystem";
import ClientDetails from "../ClientDetails";
import CallStats from "../stats/CallStats";
import PlaceholderSection from "../../admin/PlaceholderSection";
import { Bell, User } from "lucide-react";

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
      case "stats":
        return <CallStats />;
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
