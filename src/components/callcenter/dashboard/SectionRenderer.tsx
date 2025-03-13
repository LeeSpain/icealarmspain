
import React from "react";
import AgentDashboard from "@/components/callcenter/dashboard/AgentDashboard";
import TicketingSystem from "@/components/callcenter/ticketing/TicketingSystem";
import ChatSystem from "@/components/callcenter/chat/ChatSystem";
import ClientDetails from "@/components/callcenter/ClientDetails";
import CallStats from "@/components/callcenter/stats/CallStats";
import DeviceManagement from "@/components/callcenter/devices/DeviceManagement";
import AgentSchedule from "@/components/callcenter/schedule/AgentSchedule";
import SystemChecks from "@/components/callcenter/system/SystemChecks";
import KnowledgeBase from "@/components/callcenter/knowledge/KnowledgeBase";
import NotificationCenter from "@/components/callcenter/notifications/NotificationCenter";
import AgentProfile from "@/components/callcenter/profile/AgentProfile";

interface SectionRendererProps {
  activeSection: string;
  selectedClient: number | null;
  handleClientSelect: (clientId: number | null) => void;
  setActiveSection: (section: string) => void;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ 
  activeSection, 
  selectedClient, 
  handleClientSelect,
  setActiveSection 
}) => {
  // Add a wrapper div with max-width to match the member dashboard style
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AgentDashboard setActiveSection={setActiveSection} />;
      case "tickets":
        return <TicketingSystem onClientSelect={handleClientSelect} />;
      case "chat":
        return <ChatSystem />;
      case "clients":
        return <ClientDetails selectedClientId={selectedClient} />;
      case "devices":
        return <DeviceManagement />;
      case "stats":
        return <CallStats />;
      case "schedule":
        return <AgentSchedule />;
      case "system-checks":
        return <SystemChecks />;
      case "knowledge":
        return <KnowledgeBase />;
      case "notifications":
        return <NotificationCenter />;
      case "profile":
        return <AgentProfile />;
      default:
        return <AgentDashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
};

export default SectionRenderer;
