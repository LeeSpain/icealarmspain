
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarNavItemProps {
  name: string;
  icon: React.ReactNode;
  path: string;
  section: string;
  collapsed: boolean;
  setActiveSection: (section: string) => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  name, 
  icon, 
  path, 
  section, 
  collapsed,
  setActiveSection 
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 transition-colors duration-200
        ${isActive ? 'bg-ice-700 text-white' : 'text-ice-300 hover:text-white hover:bg-ice-700'}
        ${collapsed ? 'justify-center' : ''}`
      }
      onClick={() => setActiveSection(section)}
    >
      {icon}
      {!collapsed && <span>{name}</span>}
    </NavLink>
  );
};

export default SidebarNavItem;
