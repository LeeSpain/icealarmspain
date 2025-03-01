
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
      <Collapsible className="w-full mb-1" open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-accent ${
            isActive ? "bg-primary/10 text-primary" : ""
          }`}>
            <div className="flex items-center">
              <Icon className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-8 pr-2 mt-1">
          {children}
        </CollapsibleContent>
      </Collapsible>
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
