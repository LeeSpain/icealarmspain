
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  User, 
  Settings, 
  HelpCircle, 
  ShieldAlert, 
  Activity, 
  PillIcon,
  MessageSquare,
  PlusCircle,
  Stethoscope,
  CalendarCheck
} from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarNavigationProps {
  collapsed: boolean;
  activePage?: string;
  onLogout?: () => void;
  user?: any;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  collapsed, 
  activePage, 
  onLogout, 
  user 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="px-3 py-2">
      <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
        {!collapsed && "DASHBOARD"}
      </div>
      <SidebarItem 
        icon={<Home size={18} />} 
        label="Dashboard" 
        active={isActive("/dashboard")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard")}
      />
      <SidebarItem 
        icon={<MessageSquare size={18} />} 
        label="Chat Support" 
        active={isActive("/chat")} 
        collapsed={collapsed}
        onClick={() => navigate("/chat")}
      />
      
      <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
        {!collapsed && "DEVICES"}
      </div>
      <SidebarItem 
        icon={<ShieldAlert size={18} />} 
        label="SOS Pendant" 
        active={isActive("/devices/sos-pendant")} 
        collapsed={collapsed}
        onClick={() => navigate("/devices/sos-pendant")}
      />
      <SidebarItem 
        icon={<Activity size={18} />} 
        label="Health Monitor" 
        active={isActive("/devices/glucose-monitor")} 
        collapsed={collapsed}
        onClick={() => navigate("/devices/glucose-monitor")}
      />
      <SidebarItem 
        icon={<PillIcon size={18} />} 
        label="Medical Dispenser" 
        active={isActive("/devices/medical-dispenser")} 
        collapsed={collapsed}
        onClick={() => navigate("/devices/medical-dispenser")}
      />
      <SidebarItem 
        icon={<PlusCircle size={18} />} 
        label="Register Device" 
        active={isActive("/device-registration")} 
        collapsed={collapsed}
        onClick={() => navigate("/device-registration")}
        highlight={true}
      />
      
      <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
        {!collapsed && "HEALTH"}
      </div>
      <SidebarItem 
        icon={<Stethoscope size={18} />} 
        label="Health Metrics" 
        active={isActive("/health/metrics")} 
        collapsed={collapsed}
        onClick={() => navigate("/health/metrics")}
      />
      <SidebarItem 
        icon={<CalendarCheck size={18} />} 
        label="Medications" 
        active={isActive("/health/medications")} 
        collapsed={collapsed}
        onClick={() => navigate("/health/medications")}
      />
      
      <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
        {!collapsed && "ACCOUNT"}
      </div>
      <SidebarItem 
        icon={<User size={18} />} 
        label="Profile" 
        active={isActive("/profile")} 
        collapsed={collapsed}
        onClick={() => navigate("/profile")}
      />
      <SidebarItem 
        icon={<Settings size={18} />} 
        label="Settings" 
        active={isActive("/settings")} 
        collapsed={collapsed}
        onClick={() => navigate("/settings")}
      />
      <SidebarItem 
        icon={<HelpCircle size={18} />} 
        label="Help & Support" 
        active={isActive("/help")} 
        collapsed={collapsed}
        onClick={() => navigate("/help")}
      />
    </div>
  );
};

export default SidebarNavigation;
