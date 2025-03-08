
import React from 'react';
import { useAuth } from '@/context/auth';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import UserProfile from './UserProfile';
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
      "h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm",
      collapsed ? "w-16" : "w-64"
    )}>
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={() => setCollapsed(!collapsed)} 
      />
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <SidebarNavigation 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={collapsed}
          onLogout={logout}
        />
      </div>

      {/* User profile at the bottom */}
      <div className="p-3 border-t border-slate-200">
        <UserProfile user={user} collapsed={collapsed} handleLogout={logout} />
      </div>
    </div>
  );
};

export default Sidebar;
