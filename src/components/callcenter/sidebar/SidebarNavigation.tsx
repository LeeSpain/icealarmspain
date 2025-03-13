
import React from "react";
import { 
  Home, 
  MessageSquare, 
  Ticket, 
  Users, 
  Activity, 
  BarChart, 
  Calendar, 
  Shield, 
  FileText, 
  Bell, 
  User,
  Settings,
  HelpCircle,
  LogOut 
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  onLogout: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed,
  onLogout
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="px-3 py-2 flex flex-col h-full overflow-y-auto">
      <div className="flex-grow">
        <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && (language === 'en' ? "DASHBOARD" : "PANEL")}
        </div>
        <SidebarItem 
          icon={<Home size={18} />} 
          label={language === 'en' ? "Dashboard" : "Inicio"} 
          active={activeSection === "dashboard"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("dashboard")}
        />
        <SidebarItem 
          icon={<Ticket size={18} />} 
          label={language === 'en' ? "Tickets" : "Tickets"} 
          active={activeSection === "tickets"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("tickets")}
        />
        <SidebarItem 
          icon={<MessageSquare size={18} />} 
          label={language === 'en' ? "Chat" : "Chat"} 
          active={activeSection === "chat"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("chat")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && (language === 'en' ? "CLIENTS & DEVICES" : "CLIENTES Y DISPOSITIVOS")}
        </div>
        <SidebarItem 
          icon={<Users size={18} />} 
          label={language === 'en' ? "Clients" : "Clientes"} 
          active={activeSection === "clients"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("clients")}
        />
        <SidebarItem 
          icon={<Activity size={18} />} 
          label={language === 'en' ? "Devices" : "Dispositivos"} 
          active={activeSection === "devices"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("devices")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && (language === 'en' ? "MANAGEMENT" : "GESTIÓN")}
        </div>
        <SidebarItem 
          icon={<BarChart size={18} />} 
          label={language === 'en' ? "Stats" : "Estadísticas"} 
          active={activeSection === "stats"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("stats")}
        />
        <SidebarItem 
          icon={<Calendar size={18} />} 
          label={language === 'en' ? "Schedule" : "Horario"} 
          active={activeSection === "schedule"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("schedule")}
        />
        <SidebarItem 
          icon={<Shield size={18} />} 
          label={language === 'en' ? "System Checks" : "Verificaciones"} 
          active={activeSection === "system-checks"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("system-checks")}
        />
        <SidebarItem 
          icon={<FileText size={18} />} 
          label={language === 'en' ? "Knowledge" : "Conocimiento"} 
          active={activeSection === "knowledge"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("knowledge")}
        />
        <SidebarItem 
          icon={<Bell size={18} />} 
          label={language === 'en' ? "Notifications" : "Notificaciones"} 
          active={activeSection === "notifications"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("notifications")}
        />
        
        <div className="my-2 px-4 text-xs font-semibold text-muted-foreground">
          {!collapsed && (language === 'en' ? "ACCOUNT" : "CUENTA")}
        </div>
        <SidebarItem 
          icon={<User size={18} />} 
          label={language === 'en' ? "Profile" : "Perfil"} 
          active={activeSection === "profile"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("profile")}
        />
        <SidebarItem 
          icon={<Settings size={18} />} 
          label={language === 'en' ? "Settings" : "Configuración"} 
          active={activeSection === "settings"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("settings")}
        />
        <SidebarItem 
          icon={<HelpCircle size={18} />} 
          label={language === 'en' ? "Help" : "Ayuda"} 
          active={activeSection === "help"} 
          collapsed={collapsed}
          onClick={() => setActiveSection("help")}
        />
      </div>
      
      {/* Logout button at the bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <SidebarItem 
          icon={<LogOut size={18} />} 
          label={language === 'en' ? "Logout" : "Cerrar Sesión"} 
          active={false} 
          collapsed={collapsed}
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
