
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarHeaderProps {
  userData?: any;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  userData, 
  collapsed, 
  setCollapsed 
}) => {
  return (
    <>
      {!collapsed && userData && (
        <div className="p-4 border-b border-ice-700">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-ice-600 flex items-center justify-center text-white font-bold mr-3">
              {userData.displayName?.[0]?.toUpperCase() || userData.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="font-medium truncate">{userData.displayName || userData.email}</div>
              <div className="text-xs text-ice-300 truncate">Admin</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 border-b border-ice-700 flex justify-between items-center">
        {!collapsed && <span className="font-bold text-lg">IceAlarm</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-ice-300 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </>
  );
};

export default SidebarHeader;
