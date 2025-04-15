
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userData: {
    name: string;
    displayName: string;
    email: string;
    role: string;
  };
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  collapsed, 
  setCollapsed,
  userData
}) => {
  return (
    <div className="border-b border-gray-200">
      <div className="p-4 flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="bg-ice-600 text-white rounded-lg p-1.5">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-gray-800">ICE Alarm</span>
            <span className="text-xs bg-ice-100 text-ice-800 px-1.5 py-0.5 rounded">Admin</span>
          </div>
        ) : (
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-ice-600 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
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
      
      {!collapsed && (
        <div className="p-4 pt-2 pb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-ice-100">
              <AvatarImage src="" alt={userData.name} />
              <AvatarFallback className="bg-ice-100 text-ice-800">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm text-gray-800">{userData.displayName}</span>
              <span className="text-xs text-gray-500">{userData.email}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
