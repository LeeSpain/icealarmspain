
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const handleNavigation = (section: string, path: string) => {
    setActiveSection(section);
    navigate(path);
  };
  
  return (
    <nav className="py-4 overflow-y-auto max-h-[calc(100vh-120px)]">
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
            setActiveSection={() => handleNavigation(item.section, item.path)}
            isActive={activeSection === item.section}
          />
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;
