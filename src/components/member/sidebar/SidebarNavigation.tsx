
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
  LogOut
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarNavigationProps {
  activePage: string;
  collapsed: boolean;
  onLogout: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  activePage, 
  collapsed, 
  onLogout 
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
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
          
          <SidebarSection title={language === 'en' ? "Devices" : "Dispositivos"} collapsed={collapsed}>
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
          </SidebarSection>
          
          <SidebarSection title={language === 'en' ? "Health" : "Salud"} collapsed={collapsed}>
            <SidebarItem 
              icon={Activity} 
              label={language === 'en' ? "Health Metrics" : "Métricas de Salud"} 
              active={activePage === "health-metrics"} 
              onClick={() => navigate('/health/metrics')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={PlusSquare} 
              label={language === 'en' ? "Medications" : "Medicamentos"} 
              active={activePage === "medications"} 
              onClick={() => navigate('/health/medications')}
              collapsed={collapsed}
            />
          </SidebarSection>
          
          <SidebarSection title={language === 'en' ? "Account" : "Cuenta"} collapsed={collapsed}>
            <SidebarItem 
              icon={User} 
              label={language === 'en' ? "Profile" : "Perfil"} 
              active={activePage === "profile"} 
              onClick={() => navigate('/profile')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={Settings} 
              label={language === 'en' ? "Settings" : "Configuración"} 
              active={activePage === "settings"} 
              onClick={() => navigate('/settings')}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={HelpCircle} 
              label={language === 'en' ? "Help & Support" : "Ayuda y Soporte"} 
              active={activePage === "help"} 
              onClick={() => navigate('/help')}
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
