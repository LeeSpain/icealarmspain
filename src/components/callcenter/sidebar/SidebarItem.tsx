
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  onClick, 
  active = false,
  collapsed = false
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start mb-1",
        active ? "bg-ice-100 text-ice-700" : "hover:bg-ice-50 text-gray-600",
        collapsed ? "px-2" : "px-3"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
      {!collapsed && <span>{label}</span>}
    </Button>
  );
};

export default SidebarItem;
