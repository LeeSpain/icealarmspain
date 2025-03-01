
import React from "react";
import AgentDashboard from "./AgentDashboard";
import TicketingSystem from "../ticketing/TicketingSystem";
import ChatSystem from "../chat/ChatSystem";
import ClientDetails from "../ClientDetails";
import CallStats from "../stats/CallStats";
import PlaceholderSection from "./placeholder-section";

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
  setActiveSection
}) => {
  // Function to render the appropriate section based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <AgentDashboard setActiveSection={setActiveSection} />;
      case "tickets":
        return <TicketingSystem onClientSelect={setSelectedClient} />;
      case "chat":
        return <ChatSystem />;
      case "clients":
        return <ClientDetails selectedClientId={selectedClient} />;
      case "stats":
        return <CallStats />;
      case "all-clients":
      case "clients-alerts":
      case "clients-history":
      case "clients-devices":
      case "stats-performance":
      case "schedule":
      case "knowledge":
      case "notifications":
      case "profile":
        return <PlaceholderSection title={activeSection} />;
      default:
        return <AgentDashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="h-[calc(100vh-9rem)]">
      {renderSection()}
    </div>
  );
};

export default DashboardContent;
