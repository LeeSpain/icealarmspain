
import React from "react";
import { 
  Home, 
  MessageCircle, 
  TicketIcon, 
  User, 
  Settings, 
  BarChart3, 
  Calendar, 
  HardDrive, 
  Lightbulb, 
  Bell, 
  LogOut 
} from "lucide-react";
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
    <div className="px-3 py-2 flex flex-col h-full">
      <div className="flex-grow">
        <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && "DASHBOARD"}
        </div>
        <SidebarItem 
          icon={<Home size={18} />} 
          label="Dashboard" 
          active={activeSection === "dashboard"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("dashboard")}
        />
        <SidebarItem 
          icon={<TicketIcon size={18} />} 
          label="Tickets" 
          active={activeSection === "tickets"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("tickets")}
        />
        <SidebarItem 
          icon={<MessageCircle size={18} />} 
          label="Chat" 
          active={activeSection === "chat"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("chat")}
        />
        <SidebarItem 
          icon={<User size={18} />} 
          label="Clients" 
          active={activeSection === "clients"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("clients")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && "MANAGEMENT"}
        </div>
        <SidebarItem 
          icon={<HardDrive size={18} />} 
          label="Devices" 
          active={activeSection === "devices"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("devices")}
        />
        <SidebarItem 
          icon={<BarChart3 size={18} />} 
          label="Stats" 
          active={activeSection === "stats"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("stats")}
        />
        <SidebarItem 
          icon={<Calendar size={18} />} 
          label="Schedule" 
          active={activeSection === "schedule"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("schedule")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && "OTHER"}
        </div>
        <SidebarItem 
          icon={<Lightbulb size={18} />} 
          label="Knowledge Base" 
          active={activeSection === "knowledge"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("knowledge")}
        />
        <SidebarItem 
          icon={<Bell size={18} />} 
          label="Notifications" 
          active={activeSection === "notifications"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("notifications")}
        />
        <SidebarItem 
          icon={<Settings size={18} />} 
          label="Profile" 
          active={activeSection === "profile"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("profile")}
        />
      </div>
      
      {/* Logout button at the bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <SidebarItem 
          icon={<LogOut size={18} />} 
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
