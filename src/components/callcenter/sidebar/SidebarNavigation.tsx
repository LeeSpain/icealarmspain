import React from "react";
import { BarChart3, Users, TicketIcon, MessageCircle, BarChart2, Calendar, BookOpen, Bell, UserCircle, HardDrive } from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  onLogout?: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed,
  onLogout 
}) => {
  return (
    <div className="space-y-1">
      <SidebarItem 
        icon={BarChart3}
        label="Dashboard"
        active={activeSection === "dashboard"}
        onClick={() => setActiveSection("dashboard")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={TicketIcon}
        label="Support Tickets"
        active={activeSection === "tickets"}
        onClick={() => setActiveSection("tickets")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={MessageCircle}
        label="Chat"
        active={activeSection === "chat"}
        onClick={() => setActiveSection("chat")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={Users}
        label="Client Management"
        active={activeSection === "clients"}
        onClick={() => setActiveSection("clients")}
        collapsed={collapsed}
      />
      
      <SidebarItem 
        icon={HardDrive}
        label="Device Management"
        active={activeSection === "devices"}
        onClick={() => setActiveSection("devices")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={BarChart2}
        label="Call Center Stats"
        active={activeSection === "stats"}
        onClick={() => setActiveSection("stats")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={Calendar}
        label="Agent Schedule"
        active={activeSection === "schedule"}
        onClick={() => setActiveSection("schedule")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={BookOpen}
        label="Knowledge Base"
        active={activeSection === "knowledge"}
        onClick={() => setActiveSection("knowledge")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={Bell}
        label="Notifications"
        active={activeSection === "notifications"}
        onClick={() => setActiveSection("notifications")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={UserCircle}
        label="Agent Profile"
        active={activeSection === "profile"}
        onClick={() => setActiveSection("profile")}
        collapsed={collapsed}
      />
    </div>
  );
};

export default SidebarNavigation;
