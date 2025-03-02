
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarSectionProps {
  title: string;
  collapsed: boolean;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ 
  title, 
  collapsed, 
  children 
}) => {
  return (
    <>
      <div className={cn("mt-6 mb-2", !collapsed && "px-3")}>
        <h3 className={cn(
          "text-xs uppercase font-semibold text-gray-500",
          collapsed && "sr-only"
        )}>
          {title}
        </h3>
      </div>
      {children}
    </>
  );
};

export default SidebarSection;
