
import React from "react";
import { 
  Home, 
  MessageCircle, 
  Ticket as TicketIcon, 
  Users, 
  Settings, 
  BarChart3, 
  Calendar, 
  HardDrive, 
  Lightbulb, 
  Bell, 
  LogOut,
  CheckCircle
} from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  onLogout?: () => void;
  user?: any;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed, 
  onLogout,
  user
}) => {
  return (
    <div className="px-3 py-2 flex flex-col h-full">
      <div className="flex-grow">
        <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && "DASHBOARD"}
        </div>
        <SidebarItem 
          icon={Home} 
          label="Dashboard" 
          active={activeSection === "dashboard"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("dashboard")}
        />
        <SidebarItem 
          icon={TicketIcon} 
          label="Tickets" 
          active={activeSection === "tickets"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("tickets")}
        />
        <SidebarItem 
          icon={MessageCircle} 
          label="Chat" 
          active={activeSection === "chat"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("chat")}
        />
        <SidebarItem 
          icon={Users} 
          label="All Clients" 
          active={activeSection === "clients"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("clients")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && "MANAGEMENT"}
        </div>
        <SidebarItem 
          icon={HardDrive} 
          label="Devices" 
          active={activeSection === "devices"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("devices")}
        />
        <SidebarItem 
          icon={BarChart3} 
          label="Stats" 
          active={activeSection === "stats"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("stats")}
        />
        <SidebarItem 
          icon={Calendar} 
          label="Schedule" 
          active={activeSection === "schedule"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("schedule")}
        />
        <SidebarItem 
          icon={CheckCircle} 
          label="System Checks" 
          active={activeSection === "system-checks"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("system-checks")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && "OTHER"}
        </div>
        <SidebarItem 
          icon={Lightbulb} 
          label="Knowledge Base" 
          active={activeSection === "knowledge"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("knowledge")}
        />
        <SidebarItem 
          icon={Bell} 
          label="Notifications" 
          active={activeSection === "notifications"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("notifications")}
        />
        <SidebarItem 
          icon={Settings} 
          label="Profile" 
          active={activeSection === "profile"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("profile")}
        />
      </div>
      
      {/* Logout button at the bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <SidebarItem 
          icon={LogOut} 
          label="Logout" 
          active={false} 
          collapsed={collapsed}
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
