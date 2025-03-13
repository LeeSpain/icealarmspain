
import React from 'react';
import { useAuth } from '@/context/auth';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarNavigation from './sidebar/SidebarNavigation';
import UserProfile from './sidebar/UserProfile';
import { User } from '@/context/auth';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  user?: User;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed,
  setCollapsed,
  user
}) => {
  const { logout } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      // Clear any session/local storage related to user preferences
      localStorage.removeItem('activeSection');
      
      // Call the auth logout function
      await logout();
      
      // Flag to prevent automatic login after logout
      sessionStorage.setItem('recentlyLoggedOut', 'true');
      
      console.log("Call center logout complete");
    } catch (error) {
      console.error('Error during call center logout:', error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was a problem logging you out. Please try again."
      });
    }
  };
  
  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm",
      collapsed ? "w-16" : "w-64"
    )}>
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={() => setCollapsed(!collapsed)} 
      />
      
      <SidebarNavigation 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={collapsed}
        onLogout={handleLogout}
      />

      {user && (
        <div className="mt-auto p-4 border-t border-gray-200">
          <UserProfile 
            user={user}
            collapsed={collapsed}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
