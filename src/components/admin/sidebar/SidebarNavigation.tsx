
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationItems, NavItem } from './navigation';
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
  const [navItems, setNavItems] = useState<NavItem[]>(navigationItems);
  
  // Toggle expand state of an item
  const handleToggleExpand = (item: NavItem) => {
    setNavItems(prevItems => 
      prevItems.map(navItem => 
        navItem.section === item.section 
          ? { ...navItem, isExpanded: !navItem.isExpanded } 
          : navItem
      )
    );
  };
  
  // Handle navigation
  const handleNavigation = (section: string, path: string) => {
    // Check if we're already on this section to avoid unnecessary navigation
    if (activeSection !== section) {
      setActiveSection(section);
      if (path !== '#') {
        navigate(path);
      }
    }
  };
  
  return (
    <nav className="py-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="space-y-1 px-3">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.section}
            item={item}
            activeSection={activeSection}
            collapsed={collapsed}
            onToggleExpand={handleToggleExpand}
            onSelectSection={handleNavigation}
          />
        ))}
      </div>
    </nav>
  );
};

export default SidebarNavigation;
