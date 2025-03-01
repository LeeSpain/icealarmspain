
import React, { useState } from "react";
import {
  Users,
  TicketIcon,
  BarChart3,
  Bell,
  User,
  ChevronRight,
  ChevronLeft,
  LogOut,
  LifeBuoy,
  Calendar,
  ClipboardList,
  Clock,
  Shield,
  AlertTriangle,
  Smartphone
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  isActive = false, 
  onClick,
  children,
  collapsed = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!children;
  
  if (collapsed) {
    return (
      <div 
        className={`flex justify-center p-2 rounded-md cursor-pointer mb-1 ${
          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
        }`}
        onClick={() => hasChildren ? setIsOpen(!isOpen) : onClick && onClick()}
      >
        <Icon className="h-5 w-5" />
      </div>
    );
  }
  
  if (hasChildren) {
    return (
      <Collapsible className="w-full mb-1" open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-accent ${
            isActive ? "bg-primary/10 text-primary" : ""
          }`}>
            <div className="flex items-center">
              <Icon className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-8 pr-2 mt-1">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  }
  
  return (
    <div 
      className={`flex items-center px-3 py-2 rounded-md cursor-pointer mb-1 ${
        isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
      }`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed, 
  setCollapsed 
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-screen bg-background border-r p-4 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between mb-8">
        {!collapsed && <h2 className="text-xl font-bold">Call Center</h2>}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex flex-col space-y-1 flex-grow overflow-y-auto">
        <SidebarItem 
          icon={TicketIcon} 
          label="Support Tickets"
          isActive={activeSection === "tickets"} 
          onClick={() => setActiveSection("tickets")}
          collapsed={collapsed}
        />
        
        {collapsed ? (
          <SidebarItem 
            icon={Users} 
            label=""
            isActive={activeSection.startsWith("clients") || activeSection === "all-clients"} 
            onClick={() => setActiveSection("all-clients")}
            collapsed={collapsed}
          />
        ) : (
          <SidebarItem 
            icon={Users} 
            label="Client Management"
            isActive={activeSection.startsWith("clients") || activeSection === "all-clients"}
            collapsed={collapsed}
          >
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
          </SidebarItem>
        )}
        
        {collapsed ? (
          <SidebarItem 
            icon={BarChart3} 
            label=""
            isActive={activeSection.startsWith("stats")} 
            onClick={() => setActiveSection("stats")}
            collapsed={collapsed}
          />
        ) : (
          <SidebarItem 
            icon={BarChart3} 
            label="Call Center Stats"
            isActive={activeSection.startsWith("stats")}
            collapsed={collapsed}
          >
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
          </SidebarItem>
        )}
        
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

      <div className="mt-auto pt-4 border-t">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium">{user?.name || 'Agent'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'agent@example.com'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
