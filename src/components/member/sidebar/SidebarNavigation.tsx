
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
  Stethoscope,
  CalendarCheck,
  PhoneCall
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
    return location.pathname === path || location.pathname.startsWith(path);
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
        active={isActive("/dashboard/chat")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/chat")}
      />
      
      <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
        {!collapsed && "DEVICES"}
      </div>
      <SidebarItem 
        icon={<ShieldAlert size={18} />} 
        label="SOS Pendant" 
        active={isActive("/dashboard/devices/sos-pendant")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/devices/sos-pendant")}
      />
      <SidebarItem 
        icon={<Activity size={18} />} 
        label="Health Monitor" 
        active={isActive("/dashboard/devices/glucose-monitor")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/devices/glucose-monitor")}
      />
      <SidebarItem 
        icon={<PillIcon size={18} />} 
        label="Medical Dispenser" 
        active={isActive("/dashboard/devices/medical-dispenser")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/devices/medical-dispenser")}
      />
      
      <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
        {!collapsed && "HEALTH"}
      </div>
      <SidebarItem 
        icon={<Stethoscope size={18} />} 
        label="Health Metrics" 
        active={isActive("/dashboard/health/metrics")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/health/metrics")}
      />
      <SidebarItem 
        icon={<CalendarCheck size={18} />} 
        label="Medications" 
        active={isActive("/dashboard/health/medications")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/health/medications")}
      />
      <SidebarItem 
        icon={<PhoneCall size={18} />} 
        label="Emergency Contacts" 
        active={isActive("/dashboard/emergency-contacts")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/emergency-contacts")}
      />
      
      <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
        {!collapsed && "ACCOUNT"}
      </div>
      <SidebarItem 
        icon={<User size={18} />} 
        label="Profile" 
        active={isActive("/dashboard/profile")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/profile")}
      />
      <SidebarItem 
        icon={<Settings size={18} />} 
        label="Settings" 
        active={isActive("/dashboard/settings")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/settings")}
      />
      <SidebarItem 
        icon={<HelpCircle size={18} />} 
        label="Help & Support" 
        active={isActive("/dashboard/help")} 
        collapsed={collapsed}
        onClick={() => navigate("/dashboard/help")}
      />
    </div>
  );
};

export default SidebarNavigation;
