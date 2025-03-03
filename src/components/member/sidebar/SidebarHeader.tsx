
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Logo from '@/components/Logo';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  collapsed, 
  onToggleCollapse 
}) => {
  return (
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
        onClick={onToggleCollapse}
        className="text-gray-500 hover:bg-ice-100"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SidebarHeader;
