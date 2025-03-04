
import React from 'react';
import { useAuth } from '@/context/auth';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarNavigation from './sidebar/SidebarNavigation';
import UserProfile from './sidebar/UserProfile';
import { User } from '@/context/auth';
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

      {user && (
        <div className="mt-auto p-4 border-t border-gray-200">
          <UserProfile 
            user={user}
            collapsed={collapsed}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
