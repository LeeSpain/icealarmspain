
import React from "react";
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
  LogOut,
  Phone,
  Clock,
  Smartphone,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import UserProfile from "./sidebar/UserProfile";

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
      "flex flex-col h-screen bg-background border-r transition-all duration-300 p-4",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between mb-8">
        {!collapsed && <h2 className="text-xl font-bold">Call Center</h2>}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={collapsed ? "mx-auto" : ""}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={collapsed}
        />
      </div>

      <div className="mt-auto pt-4 border-t">
        <UserProfile 
          user={user} 
          collapsed={collapsed} 
          handleLogout={handleLogout} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
