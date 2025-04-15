
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
  badge?: number | string;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  active,
  collapsed,
  onClick,
  badge
}) => {
  return (
    <div
      className={cn(
        'flex items-center py-2 px-3 rounded-md cursor-pointer transition-colors',
        active
          ? 'bg-ice-100 text-ice-800'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      )}
      onClick={onClick}
    >
      <div className={cn(
        'flex items-center justify-center',
        active ? 'text-ice-600' : 'text-gray-500'
      )}>
        {icon}
      </div>
      
      {!collapsed && (
        <span className="ml-3 text-sm font-medium">{label}</span>
      )}
      
      {!collapsed && badge !== undefined && (
        <div className="ml-auto bg-ice-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </div>
      )}
      
      {collapsed && badge !== undefined && (
        <div className="absolute -top-1 -right-1 bg-ice-500 text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </div>
      )}
    </div>
  );
};

export default SidebarNavItem;
