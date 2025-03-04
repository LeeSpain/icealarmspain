
import React from 'react';
import { useAuth } from '@/context/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarNavigation from './sidebar/SidebarNavigation';
import { useLanguage } from '@/context/LanguageContext';

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
  const { logout, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log("MemberSidebar rendering, location:", location.pathname, "user:", user);
  
  // Determine active page based on current location
  const getActivePage = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') return 'dashboard';
    if (path === '/profile') return 'profile';
    if (path === '/settings') return 'settings';
    if (path === '/help') return 'help';
    if (path.startsWith('/health/metrics')) return 'health-metrics';
    if (path.startsWith('/health/medications')) return 'medications';
    if (path.startsWith('/devices/sos-pendant')) return 'sos-pendant';
    if (path.startsWith('/devices/glucose-monitor')) return 'glucose-monitor';
    if (path.startsWith('/devices/medical-dispenser')) return 'medical-dispenser';
    
    return activePage;
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    navigate('/');
  };

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm",
      collapsed ? "w-16" : "w-64"
    )}>
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={() => setCollapsed(!collapsed)} 
      />
      
      <SidebarNavigation 
        activePage={getActivePage()}
        collapsed={collapsed} 
        onLogout={handleLogout}
        user={user}
      />
    </div>
  );
};

export default MemberSidebar;
