
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  isActive = false, 
  onClick,
  children,
  collapsed = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!children;
  
  if (collapsed) {
    return (
      <div 
        className={`flex justify-center p-2 rounded-md cursor-pointer mb-1 ${
          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
        }`}
        onClick={() => hasChildren ? setIsOpen(!isOpen) : onClick && onClick()}
      >
        <Icon className="h-5 w-5" />
      </div>
    );
  }
  
  if (hasChildren) {
    return (
      <div className="mb-1">
        <div 
          className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
            isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <Icon className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </div>
          <div>
            {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </div>
        </div>
        {isOpen && (
          <div className="ml-6 mt-1 space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div 
      className={`flex items-center px-3 py-2 rounded-md cursor-pointer mb-1 ${
        isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
      }`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default SidebarItem;
