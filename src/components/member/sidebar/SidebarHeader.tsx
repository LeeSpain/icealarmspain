
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      {!collapsed && (
        <div className="font-bold text-ice-700 text-lg">
          ICE Alarm
        </div>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onToggleCollapse}
        className="text-gray-500"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SidebarHeader;
