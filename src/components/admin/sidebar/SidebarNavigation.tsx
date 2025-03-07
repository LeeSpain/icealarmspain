
import React from 'react';
import { navigationItems } from './navigationItems';
import SidebarNavItem from './SidebarNavItem';

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed 
}) => {
  return (
    <nav className="py-4">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <SidebarNavItem
            key={item.name}
            name={item.name}
            icon={<Icon size={20} />}
            path={item.path}
            section={item.section}
            collapsed={collapsed}
            setActiveSection={setActiveSection}
          />
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;
