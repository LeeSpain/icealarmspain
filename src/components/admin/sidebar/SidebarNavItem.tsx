
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { NavItem } from './navigationItems';

interface SidebarNavItemProps {
  item: NavItem;
  activeSection: string;
  collapsed: boolean;
  onToggleExpand: (item: NavItem) => void;
  onSelectSection: (section: string, path: string) => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  item, 
  activeSection, 
  collapsed, 
  onToggleExpand,
  onSelectSection
}) => {
  const isActive = activeSection === item.section;
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = item.isExpanded;
  
  // Check if any child item is active
  const isChildActive = hasSubItems && item.subItems?.some(subItem => activeSection === subItem.section);
  
  const handleClick = () => {
    if (hasSubItems) {
      onToggleExpand(item);
    } else {
      onSelectSection(item.section, item.path);
    }
  };
  
  return (
    <div className="mb-1">
      <button
        onClick={handleClick}
        className={`flex items-center w-full space-x-2 px-3 py-2 rounded transition-colors duration-200
          ${isActive || isChildActive ? 'bg-ice-700 text-white' : 'text-ice-300 hover:text-white hover:bg-ice-700/70'}
          ${collapsed ? 'justify-center' : 'justify-between'}`}
      >
        <div className="flex items-center">
          <item.icon size={20} className="flex-shrink-0" />
          {!collapsed && <span className="ml-2">{item.name}</span>}
        </div>
        
        {!collapsed && hasSubItems && (
          <div className="flex-shrink-0">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </button>
      
      {/* Render sub-items if expanded */}
      {!collapsed && hasSubItems && isExpanded && (
        <div className="ml-2 mt-1 border-l border-ice-600 pl-1">
          {item.subItems?.map((subItem) => (
            <button
              key={subItem.section}
              onClick={() => onSelectSection(subItem.section, subItem.path)}
              className={`flex items-center w-full space-x-2 px-3 py-2 rounded transition-colors duration-200 text-sm
                ${activeSection === subItem.section ? 'bg-ice-800 text-white' : 'text-ice-300 hover:text-white hover:bg-ice-700/50'}`}
            >
              <subItem.icon size={16} />
              <span>{subItem.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNavItem;
