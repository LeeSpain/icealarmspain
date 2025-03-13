
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
  FileText,
  PhoneCall,
  Heart,
  LogOut,
  CalendarCheck,
  ClipboardList
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

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
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };
  
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
    window.scrollTo(0, 0);
  };
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Clear localStorage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      
      // Show toast
      toast({
        title: language === 'en' ? "Logged Out" : "Sesión Cerrada",
        description: language === 'en' ? "You have been logged out successfully" : "Ha cerrado sesión con éxito",
      });
      
      // Navigate to home
      navigate('/');
    }
  };
  
  return (
    <div className="px-3 py-2 flex flex-col h-full overflow-y-auto">
      <div className="flex-grow">
        <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && (language === 'en' ? "DASHBOARD" : "PANEL")}
        </div>
        <SidebarItem 
          icon={<Home size={18} />} 
          label={language === 'en' ? "Dashboard" : "Inicio"} 
          active={isActive("/dashboard") && location.pathname === "/dashboard"} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard")}
        />
        <SidebarItem 
          icon={<MessageSquare size={18} />} 
          label={language === 'en' ? "Chat Support" : "Chat de Soporte"} 
          active={isActive("/dashboard/chat")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/chat")}
        />
        <SidebarItem 
          icon={<FileText size={18} />} 
          label={language === 'en' ? "Personal Details" : "Datos Personales"} 
          active={isActive("/dashboard/personal-details")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/personal-details")}
        />
        <SidebarItem 
          icon={<PhoneCall size={18} />} 
          label={language === 'en' ? "Emergency Contacts" : "Contactos de Emergencia"} 
          active={isActive("/dashboard/emergency-contacts")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/emergency-contacts")}
        />
        <SidebarItem 
          icon={<ClipboardList size={18} />} 
          label={language === 'en' ? "Personal Questionnaire" : "Cuestionario Personal"} 
          active={isActive("/dashboard/questionnaire")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/questionnaire")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && (language === 'en' ? "DEVICES" : "DISPOSITIVOS")}
        </div>
        <SidebarItem 
          icon={<ShieldAlert size={18} />} 
          label={language === 'en' ? "SOS Pendant" : "Colgante SOS"} 
          active={isActive("/dashboard/devices/sos-pendant")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/devices/sos-pendant")}
        />
        <SidebarItem 
          icon={<Activity size={18} />} 
          label={language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa"} 
          active={isActive("/dashboard/devices/glucose-monitor")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/devices/glucose-monitor")}
        />
        <SidebarItem 
          icon={<PillIcon size={18} />} 
          label={language === 'en' ? "Medical Dispenser" : "Dispensador Médico"} 
          active={isActive("/dashboard/devices/medical-dispenser")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/devices/medical-dispenser")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && (language === 'en' ? "HEALTH" : "SALUD")}
        </div>
        <SidebarItem 
          icon={<Stethoscope size={18} />} 
          label={language === 'en' ? "Health Metrics" : "Métricas de Salud"} 
          active={isActive("/dashboard/health/metrics")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/health/metrics")}
        />
        <SidebarItem 
          icon={<Heart size={18} />} 
          label={language === 'en' ? "Medical Info" : "Info Médica"} 
          active={isActive("/dashboard/health/info")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/health/info")}
        />
        <SidebarItem 
          icon={<CalendarCheck size={18} />} 
          label={language === 'en' ? "Medications" : "Medicamentos"} 
          active={isActive("/dashboard/health/medications")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/health/medications")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && (language === 'en' ? "ACCOUNT" : "CUENTA")}
        </div>
        <SidebarItem 
          icon={<User size={18} />} 
          label={language === 'en' ? "Profile" : "Perfil"} 
          active={isActive("/dashboard/profile")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/profile")}
        />
        <SidebarItem 
          icon={<Settings size={18} />} 
          label={language === 'en' ? "Settings" : "Configuración"} 
          active={isActive("/dashboard/settings")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/settings")}
        />
        <SidebarItem 
          icon={<HelpCircle size={18} />} 
          label={language === 'en' ? "Help & Support" : "Ayuda y Soporte"} 
          active={isActive("/dashboard/help")} 
          collapsed={collapsed}
          onClick={() => handleNavigation("/dashboard/help")}
        />
      </div>
      
      {/* Logout button at the bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <SidebarItem 
          icon={<LogOut size={18} />} 
          label={language === 'en' ? "Logout" : "Cerrar Sesión"} 
          active={false} 
          collapsed={collapsed}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
