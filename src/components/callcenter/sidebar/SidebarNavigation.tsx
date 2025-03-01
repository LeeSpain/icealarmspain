
import React from "react";
import { BarChart3, Users, TicketIcon, MessageCircle, BarChart2, Calendar, BookOpen, Bell, UserCircle } from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed 
}) => {
  return (
    <div className="space-y-1">
      <SidebarItem 
        icon={<BarChart3 className="h-5 w-5" />}
        label="Dashboard"
        active={activeSection === "dashboard"}
        onClick={() => setActiveSection("dashboard")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<TicketIcon className="h-5 w-5" />}
        label="Support Tickets"
        active={activeSection === "tickets"}
        onClick={() => setActiveSection("tickets")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<MessageCircle className="h-5 w-5" />}
        label="Chat"
        active={activeSection === "chat"}
        onClick={() => setActiveSection("chat")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<Users className="h-5 w-5" />}
        label="All Clients"
        active={activeSection === "all-clients"}
        onClick={() => setActiveSection("all-clients")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<Users className="h-5 w-5" />}
        label="Client Information"
        active={activeSection === "clients"}
        onClick={() => setActiveSection("clients")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<BarChart2 className="h-5 w-5" />}
        label="Call Center Stats"
        active={activeSection === "stats"}
        onClick={() => setActiveSection("stats")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<Calendar className="h-5 w-5" />}
        label="Agent Schedule"
        active={activeSection === "schedule"}
        onClick={() => setActiveSection("schedule")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<BookOpen className="h-5 w-5" />}
        label="Knowledge Base"
        active={activeSection === "knowledge"}
        onClick={() => setActiveSection("knowledge")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<Bell className="h-5 w-5" />}
        label="Notifications"
        active={activeSection === "notifications"}
        onClick={() => setActiveSection("notifications")}
        collapsed={collapsed}
      />

      <SidebarItem 
        icon={<UserCircle className="h-5 w-5" />}
        label="Agent Profile"
        active={activeSection === "profile"}
        onClick={() => setActiveSection("profile")}
        collapsed={collapsed}
      />
    </div>
  );
};

export default SidebarNavigation;
