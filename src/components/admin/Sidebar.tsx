
import React, { useState } from "react";
import {
  Users,
  BarChart3,
  Home,
  FileText,
  Briefcase,
  DollarSign,
  ShoppingCart,
  Layers,
  Settings,
  Smartphone,
  ServerIcon,
  PieChart,
  Calendar,
  BarChart,
  TrendingUp,
  CreditCard,
  Shield,
  Database,
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
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  isActive = false, 
  onClick, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children !== undefined;

  return (
    <div className="mb-1">
      <div 
        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
        }`}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          } else if (onClick) {
            onClick();
          }
        }}
      >
        <div className="flex items-center">
          <Icon className="mr-2 h-5 w-5" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        {hasChildren && (
          <div>
            {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </div>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {children}
        </div>
      )}
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
        {!collapsed && <h2 className="text-xl font-bold">Admin</h2>}
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
          icon={Home} 
          label={collapsed ? "" : "Dashboard"} 
          isActive={activeSection === "dashboard"} 
          onClick={() => setActiveSection("dashboard")} 
        />
        
        <SidebarItem 
          icon={Users} 
          label={collapsed ? "" : "User Management"} 
          isActive={activeSection === "users"} 
          onClick={() => setActiveSection("users")} 
        />
        
        <SidebarItem 
          icon={Briefcase} 
          label={collapsed ? "" : "Client Management"} 
          isActive={activeSection === "clients"}
          onClick={() => setActiveSection("clients")} 
        />
        
        <SidebarItem 
          icon={Smartphone} 
          label={collapsed ? "" : "Device Management"} 
          isActive={activeSection === "devices"} 
          onClick={() => setActiveSection("devices")} 
        />
        
        <SidebarItem 
          icon={ShoppingCart} 
          label={collapsed ? "" : "Orders & Inventory"} 
          isActive={activeSection === "orders"} 
          onClick={() => setActiveSection("orders")} 
        >
          {!collapsed && (
            <>
              <div 
                className={`px-3 py-2 rounded-md cursor-pointer hover:bg-accent text-sm ${
                  activeSection === "orders-list" ? "bg-primary/10 text-primary" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSection("orders-list");
                }}
              >
                Orders List
              </div>
              <div 
                className={`px-3 py-2 rounded-md cursor-pointer hover:bg-accent text-sm ${
                  activeSection === "inventory" ? "bg-primary/10 text-primary" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSection("inventory");
                }}
              >
                Inventory
              </div>
            </>
          )}
        </SidebarItem>
        
        <SidebarItem 
          icon={DollarSign} 
          label={collapsed ? "" : "Sales & Finance"} 
          isActive={activeSection === "finance"} 
          onClick={() => setActiveSection("finance")} 
        >
          {!collapsed && (
            <>
              <div 
                className={`px-3 py-2 rounded-md cursor-pointer hover:bg-accent text-sm ${
                  activeSection === "sales" ? "bg-primary/10 text-primary" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSection("sales");
                }}
              >
                Sales Analytics
              </div>
              <div 
                className={`px-3 py-2 rounded-md cursor-pointer hover:bg-accent text-sm ${
                  activeSection === "invoices" ? "bg-primary/10 text-primary" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSection("invoices");
                }}
              >
                Invoices
              </div>
            </>
          )}
        </SidebarItem>
        
        <SidebarItem 
          icon={BarChart3} 
          label={collapsed ? "" : "Reports & Analytics"} 
          isActive={activeSection === "reports"} 
          onClick={() => setActiveSection("reports")} 
        />
        
        <SidebarItem 
          icon={Settings} 
          label={collapsed ? "" : "Settings"} 
          isActive={activeSection === "settings"} 
          onClick={() => setActiveSection("settings")} 
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
                <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'admin@example.com'}</p>
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
