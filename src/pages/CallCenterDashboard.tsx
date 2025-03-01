
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Users, 
  TicketIcon, 
  MessageCircle, 
  Phone, 
  Clock, 
  Search,
  Bell,
  User
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Import components
import Sidebar from "@/components/callcenter/Sidebar";
import TicketingSystem from "@/components/callcenter/TicketingSystem";
import ClientDetails from "@/components/callcenter/ClientDetails";
import CallStats from "@/components/callcenter/CallStats";
import PlaceholderSection from "@/components/admin/PlaceholderSection";

const CallCenterDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("tickets");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const { user } = useAuth();

  // Render the appropriate section based on activeSection
  const renderActiveSection = () => {
    switch (activeSection) {
      case "tickets":
        return <TicketingSystem onClientSelect={setSelectedClient} />;
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
        return <TicketingSystem onClientSelect={setSelectedClient} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ToastContainer />
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {activeSection === "tickets" && "Support Tickets"}
            {activeSection === "clients" && "Client Information"}
            {activeSection === "stats" && "Call Center Statistics"}
            {activeSection === "notifications" && "Notifications"}
            {activeSection === "profile" && "Agent Profile"}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="h-10 pl-10 pr-4 rounded-md border border-input bg-background" 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{user?.name || 'Agent'}</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default CallCenterDashboard;
