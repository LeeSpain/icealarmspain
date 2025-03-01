
import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { User } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SidebarNavigation from "./SidebarNavigation";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed, 
  setCollapsed,
  user
}) => {
  const { logout } = useAuth();
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

      <SidebarNavigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        collapsed={collapsed} 
      />

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
