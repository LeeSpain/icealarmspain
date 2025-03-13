
import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
  highlight?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  active, 
  collapsed, 
  onClick,
  highlight = false
}) => {
  return (
    <div
      className={`
        flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors
        ${active ? 'bg-ice-100 text-ice-900' : 'hover:bg-ice-100/50 text-ice-800 hover:text-ice-900'}
        ${highlight ? 'border border-ice-300 bg-ice-50' : ''}
      `}
      onClick={onClick}
    >
      <div className={`${active ? 'text-ice-700' : 'text-ice-600'}`}>
        {icon}
      </div>
      {!collapsed && (
        <span className="ml-3 text-sm font-medium">{label}</span>
      )}
      {!collapsed && highlight && (
        <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-ice-100 text-ice-800">New</span>
      )}
    </div>
  );
};

export default SidebarItem;
