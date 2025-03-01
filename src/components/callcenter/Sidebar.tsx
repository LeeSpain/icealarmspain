
import React from "react";
import {
  Users,
  TicketIcon,
  BarChart3,
  Bell,
  User,
  ChevronRight,
  ChevronLeft,
  LogOut
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  isActive = false, 
  onClick 
}) => {
  return (
    <div 
      className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
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
          label={collapsed ? "" : "Support Tickets"} 
          isActive={activeSection === "tickets"} 
          onClick={() => setActiveSection("tickets")} 
        />
        
        <SidebarItem 
          icon={Users} 
          label={collapsed ? "" : "Client Information"} 
          isActive={activeSection === "clients"} 
          onClick={() => setActiveSection("clients")} 
        />
        
        <SidebarItem 
          icon={BarChart3} 
          label={collapsed ? "" : "Call Statistics"} 
          isActive={activeSection === "stats"} 
          onClick={() => setActiveSection("stats")} 
        />
        
        <SidebarItem 
          icon={Bell} 
          label={collapsed ? "" : "Notifications"} 
          isActive={activeSection === "notifications"} 
          onClick={() => setActiveSection("notifications")} 
        />
        
        <SidebarItem 
          icon={User} 
          label={collapsed ? "" : "Agent Profile"} 
          isActive={activeSection === "profile"} 
          onClick={() => setActiveSection("profile")} 
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
