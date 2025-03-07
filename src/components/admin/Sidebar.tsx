
import React from 'react';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarNavigation from './sidebar/SidebarNavigation';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userData?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed, 
  setCollapsed,
  userData 
}) => {
  return (
    <div className={`bg-ice-800 text-white h-screen overflow-y-auto transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <SidebarHeader
        userData={userData}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      
      <SidebarNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={collapsed}
      />
    </div>
  );
};

export default Sidebar;
