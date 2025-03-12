
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'react-toastify';
import SidebarNavigation from './sidebar/SidebarNavigation';
import SidebarHeader from './sidebar/SidebarHeader';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userData: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  collapsed,
  setCollapsed,
  userData
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          userData={userData}
        />

        <div className="flex-1 overflow-y-auto">
          <SidebarNavigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            collapsed={collapsed}
          />
        </div>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
