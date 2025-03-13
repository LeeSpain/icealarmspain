
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

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
    <div className="flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed ? (
          <Logo className="scale-75 origin-left" />
        ) : (
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-ice-500 rounded-lg rotate-45 transform origin-center"></div>
            <div className="absolute inset-1 bg-white rounded-md rotate-45 transform origin-center"></div>
            <div className="absolute inset-[5px] bg-ice-500 rounded-sm rotate-45 transform origin-center"></div>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:bg-ice-100"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

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
    </div>
  );
};

export default SidebarHeader;
