
import React from 'react';

interface SidebarNavItemProps {
  name: string;
  icon: React.ReactNode;
  path: string;
  section: string;
  collapsed: boolean;
  isActive: boolean;
  setActiveSection: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  name, 
  icon, 
  path, 
  section, 
  collapsed,
  isActive,
  setActiveSection 
}) => {
  return (
    <button
      onClick={setActiveSection}
      className={`flex items-center w-full space-x-2 px-4 py-2 transition-colors duration-200
        ${isActive ? 'bg-ice-700 text-white' : 'text-ice-300 hover:text-white hover:bg-ice-700'}
        ${collapsed ? 'justify-center' : ''}`}
    >
      {icon}
      {!collapsed && <span>{name}</span>}
    </button>
  );
};

export default SidebarNavItem;
