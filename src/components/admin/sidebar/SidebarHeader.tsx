
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
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-ice-100 flex items-center justify-center text-ice-700 font-bold mr-3">
              {userData.displayName?.[0]?.toUpperCase() || userData.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="font-medium truncate">{userData.displayName || userData.email}</div>
              <div className="text-xs text-ice-600 truncate">Admin</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!collapsed && <span className="font-semibold text-lg text-ice-800">IceAlarm Admin</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-ice-600 hover:text-ice-800 bg-ice-50 p-1 rounded-md"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </>
  );
};

export default SidebarHeader;
