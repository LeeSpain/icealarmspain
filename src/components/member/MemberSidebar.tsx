
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Home, 
  Activity, 
  BellRing, 
  PlusSquare, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  onClick, 
  active = false,
  collapsed = false
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start mb-1",
        active ? "bg-ice-100 text-ice-700" : "hover:bg-ice-50 text-gray-600",
        collapsed ? "px-2" : "px-3"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
      {!collapsed && <span>{label}</span>}
    </Button>
  );
};

interface MemberSidebarProps {
  activePage?: string;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

const MemberSidebar: React.FC<MemberSidebarProps> = ({ 
  activePage = "dashboard",
  collapsed = false,
  setCollapsed = () => {}
}) => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="font-bold text-ice-700 text-lg">
            ICE Alarm
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="px-2 pt-4">
        <ScrollArea className="h-[calc(100vh-9rem)]">
          <div className="space-y-1 px-2">
            <SidebarItem 
              icon={Home} 
              label={language === 'en' ? "Dashboard" : "Panel"} 
              active={activePage === "dashboard"} 
              onClick={() => navigate('/dashboard')}
              collapsed={collapsed}
            />
            
            <div className={cn("mt-6 mb-2", !collapsed && "px-3")}>
              <h3 className={cn(
                "text-xs uppercase font-semibold text-gray-500",
                collapsed && "sr-only"
              )}>
                {language === 'en' ? "Devices" : "Dispositivos"}
              </h3>
            </div>
            <SidebarItem 
              icon={BellRing} 
              label={language === 'en' ? "SOS Pendant" : "Colgante SOS"} 
              active={activePage === "sos-pendant"} 
              onClick={() => navigate('/devices/sos-pendant')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={Activity} 
              label={language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa"} 
              active={activePage === "glucose-monitor"} 
              onClick={() => navigate('/devices/glucose-monitor')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={PlusSquare} 
              label={language === 'en' ? "Medical Dispenser" : "Dispensador Médico"} 
              active={activePage === "medical-dispenser"} 
              onClick={() => navigate('/devices/medical-dispenser')}
              collapsed={collapsed}
            />
            
            <div className={cn("mt-6 mb-2", !collapsed && "px-3")}>
              <h3 className={cn(
                "text-xs uppercase font-semibold text-gray-500",
                collapsed && "sr-only"
              )}>
                {language === 'en' ? "Health" : "Salud"}
              </h3>
            </div>
            <SidebarItem 
              icon={Activity} 
              label={language === 'en' ? "Health Metrics" : "Métricas de Salud"} 
              active={activePage === "health-metrics"} 
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={PlusSquare} 
              label={language === 'en' ? "Medications" : "Medicamentos"} 
              active={activePage === "medications"} 
              collapsed={collapsed}
            />
            
            <div className={cn("mt-6 mb-2", !collapsed && "px-3")}>
              <h3 className={cn(
                "text-xs uppercase font-semibold text-gray-500",
                collapsed && "sr-only"
              )}>
                {language === 'en' ? "Account" : "Cuenta"}
              </h3>
            </div>
            <SidebarItem 
              icon={User} 
              label={language === 'en' ? "Profile" : "Perfil"} 
              active={activePage === "profile"} 
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={Settings} 
              label={language === 'en' ? "Settings" : "Configuración"} 
              active={activePage === "settings"} 
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={HelpCircle} 
              label={language === 'en' ? "Help & Support" : "Ayuda y Soporte"} 
              active={activePage === "help"} 
              collapsed={collapsed}
            />
          </div>
        </ScrollArea>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200">
        <SidebarItem 
          icon={LogOut} 
          label={language === 'en' ? "Logout" : "Cerrar Sesión"} 
          onClick={handleLogout}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

export default MemberSidebar;
