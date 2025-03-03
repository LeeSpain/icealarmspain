
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  FileText
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User as UserType } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface SidebarNavigationProps {
  activePage: string;
  collapsed: boolean;
  onLogout: () => void;
  user?: UserType | null;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  activePage, 
  collapsed, 
  onLogout,
  user
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'U';
    return user.name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col h-full">
      {/* User profile at the top */}
      {!collapsed && user && (
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-ice-100">
              <AvatarFallback className="bg-ice-500 text-white">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{user.name || 'Member'}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 px-2 pt-4">
        <div className="space-y-1 px-2">
          <SidebarItem 
            icon={Home} 
            label={language === 'en' ? "Dashboard" : "Panel"} 
            active={activePage === "dashboard"} 
            onClick={() => handleNavigation('/dashboard')}
            collapsed={collapsed}
          />
          
          <SidebarSection title={language === 'en' ? "Devices" : "Dispositivos"} collapsed={collapsed}>
            <SidebarItem 
              icon={BellRing} 
              label={language === 'en' ? "SOS Pendant" : "Colgante SOS"} 
              active={activePage === "sos-pendant"} 
              onClick={() => handleNavigation('/devices/sos-pendant')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={Activity} 
              label={language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa"} 
              active={activePage === "glucose-monitor"} 
              onClick={() => handleNavigation('/devices/glucose-monitor')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={PlusSquare} 
              label={language === 'en' ? "Medical Dispenser" : "Dispensador Médico"} 
              active={activePage === "medical-dispenser"} 
              onClick={() => handleNavigation('/devices/medical-dispenser')}
              collapsed={collapsed}
            />
          </SidebarSection>
          
          <SidebarSection title={language === 'en' ? "Health" : "Salud"} collapsed={collapsed}>
            <SidebarItem 
              icon={Activity} 
              label={language === 'en' ? "Health Metrics" : "Métricas de Salud"} 
              active={activePage === "health-metrics"} 
              onClick={() => handleNavigation('/health/metrics')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={PlusSquare} 
              label={language === 'en' ? "Medications" : "Medicamentos"} 
              active={activePage === "medications"} 
              onClick={() => handleNavigation('/health/medications')}
              collapsed={collapsed}
            />
          </SidebarSection>
          
          <SidebarSection title={language === 'en' ? "Account" : "Cuenta"} collapsed={collapsed}>
            <SidebarItem 
              icon={User} 
              label={language === 'en' ? "Profile" : "Perfil"} 
              active={activePage === "profile"} 
              onClick={() => handleNavigation('/profile')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={FileText} 
              label={language === 'en' ? "Personal Details" : "Datos Personales"} 
              active={activePage === "onboarding"} 
              onClick={() => handleNavigation('/onboarding')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={Settings} 
              label={language === 'en' ? "Settings" : "Configuración"} 
              active={activePage === "settings"} 
              onClick={() => handleNavigation('/settings')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={HelpCircle} 
              label={language === 'en' ? "Help & Support" : "Ayuda y Soporte"} 
              active={activePage === "help"} 
              onClick={() => handleNavigation('/help')}
              collapsed={collapsed}
            />
          </SidebarSection>
        </div>
      </ScrollArea>

      <div className="mt-auto p-4 border-t border-gray-200">
        <SidebarItem 
          icon={LogOut} 
          label={language === 'en' ? "Logout" : "Cerrar Sesión"} 
          onClick={onLogout}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
