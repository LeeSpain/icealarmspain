
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import UserProfile from './UserProfile';
import { User } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  user?: User;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed,
  setCollapsed,
  user
}) => {
  const { logout } = useAuth();
  
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
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={collapsed}
        onLogout={logout}
      />
    </div>
  );
};

export default Sidebar;
