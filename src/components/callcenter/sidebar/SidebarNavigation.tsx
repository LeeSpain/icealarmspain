
import React, { useState } from "react";
import {
  Users,
  TicketIcon,
  BarChart3,
  Bell,
  User,
  Calendar,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  Clock,
  Smartphone,
  AlertTriangle
} from "lucide-react";
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
    <div className="flex flex-col space-y-1 flex-grow overflow-y-auto">
      <SidebarItem 
        icon={TicketIcon} 
        label="Support Tickets"
        isActive={activeSection === "tickets"} 
        onClick={() => setActiveSection("tickets")}
        collapsed={collapsed}
      />
      
      <SidebarItem 
        icon={Users} 
        label="Client Management"
        isActive={activeSection.startsWith("clients") || activeSection === "all-clients"}
        onClick={collapsed ? () => setActiveSection("all-clients") : undefined}
        collapsed={collapsed}
      >
        {!collapsed && (
          <>
            <div 
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                activeSection === "all-clients" ? "bg-primary/10 text-primary" : "hover:bg-accent"
              }`}
              onClick={() => setActiveSection("all-clients")}
            >
              <span className="text-sm font-medium">All Clients</span>
            </div>
            <div 
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                activeSection === "clients" ? "bg-primary/10 text-primary" : "hover:bg-accent"
              }`}
              onClick={() => setActiveSection("clients")}
            >
              <span className="text-sm font-medium">Client Details</span>
            </div>
            <div 
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                activeSection === "clients-alerts" ? "bg-primary/10 text-primary" : "hover:bg-accent"
              }`}
              onClick={() => setActiveSection("clients-alerts")}
            >
              <span className="text-sm font-medium">Client Alerts</span>
            </div>
            <div 
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                activeSection === "clients-devices" ? "bg-primary/10 text-primary" : "hover:bg-accent"
              }`}
              onClick={() => setActiveSection("clients-devices")}
            >
              <span className="text-sm font-medium">Client Devices</span>
            </div>
            <div 
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                activeSection === "clients-history" ? "bg-primary/10 text-primary" : "hover:bg-accent"
              }`}
              onClick={() => setActiveSection("clients-history")}
            >
              <span className="text-sm font-medium">Interaction History</span>
            </div>
          </>
        )}
      </SidebarItem>
      
      <SidebarItem 
        icon={BarChart3} 
        label="Call Center Stats"
        isActive={activeSection.startsWith("stats")}
        onClick={collapsed ? () => setActiveSection("stats") : undefined}
        collapsed={collapsed}
      >
        {!collapsed && (
          <>
            <div 
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                activeSection === "stats" ? "bg-primary/10 text-primary" : "hover:bg-accent"
              }`}
              onClick={() => setActiveSection("stats")}
            >
              <span className="text-sm font-medium">Overview</span>
            </div>
            <div 
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                activeSection === "stats-performance" ? "bg-primary/10 text-primary" : "hover:bg-accent"
              }`}
              onClick={() => setActiveSection("stats-performance")}
            >
              <span className="text-sm font-medium">Agent Performance</span>
            </div>
          </>
        )}
      </SidebarItem>
      
      <SidebarItem 
        icon={Calendar} 
        label="Schedule" 
        isActive={activeSection === "schedule"} 
        onClick={() => setActiveSection("schedule")}
        collapsed={collapsed}
      />
      
      <SidebarItem 
        icon={ClipboardList} 
        label="Knowledge Base" 
        isActive={activeSection === "knowledge"} 
        onClick={() => setActiveSection("knowledge")}
        collapsed={collapsed}
      />
      
      <SidebarItem 
        icon={Bell} 
        label="Notifications" 
        isActive={activeSection === "notifications"} 
        onClick={() => setActiveSection("notifications")}
        collapsed={collapsed}
      />
      
      <SidebarItem 
        icon={User} 
        label="Agent Profile" 
        isActive={activeSection === "profile"} 
        onClick={() => setActiveSection("profile")}
        collapsed={collapsed}
      />
    </div>
  );
};

export default SidebarNavigation;
