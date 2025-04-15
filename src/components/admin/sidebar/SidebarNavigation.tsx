
import React from 'react';
import { Home, Users, Settings, Package, Bell, Phone, BarChart, ShieldAlert, FileText, LayoutDashboard, Truck, Tags, HelpCircle, BookOpen, CreditCard, Database } from 'lucide-react';
import SidebarNavItem from './SidebarNavItem';

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeSection,
  setActiveSection,
  collapsed,
}) => {
  return (
    <div className="px-3 py-2">
      {/* Dashboard */}
      <div className="mb-2 px-4 py-1 text-xs font-medium text-gray-500">
        {!collapsed && 'OVERVIEW'}
      </div>
      <SidebarNavItem
        icon={<LayoutDashboard size={18} />}
        label="Dashboard"
        active={activeSection === 'dashboard'}
        collapsed={collapsed}
        onClick={() => setActiveSection('dashboard')}
      />
      
      {/* User Management */}
      <div className="mt-4 mb-2 px-4 py-1 text-xs font-medium text-gray-500">
        {!collapsed && 'USER MANAGEMENT'}
      </div>
      <SidebarNavItem
        icon={<Users size={18} />}
        label="Users"
        active={activeSection === 'users'}
        collapsed={collapsed}
        onClick={() => setActiveSection('users')}
      />
      <SidebarNavItem
        icon={<Home size={18} />}
        label="Clients"
        active={activeSection === 'clients'}
        collapsed={collapsed}
        onClick={() => setActiveSection('clients')}
      />
      <SidebarNavItem
        icon={<Settings size={18} />}
        label="Admin Users"
        active={activeSection === 'admin-users'}
        collapsed={collapsed}
        onClick={() => setActiveSection('admin-users')}
      />
      <SidebarNavItem
        icon={<Database size={18} />}
        label="Roles & Permissions"
        active={activeSection === 'roles' || activeSection === 'permissions'}
        collapsed={collapsed}
        onClick={() => setActiveSection('roles')}
      />
      <SidebarNavItem
        icon={<FileText size={18} />}
        label="Client Onboarding"
        active={activeSection === 'client-onboarding'}
        collapsed={collapsed}
        onClick={() => setActiveSection('client-onboarding')}
      />
      
      {/* Devices & Alerts */}
      <div className="mt-4 mb-2 px-4 py-1 text-xs font-medium text-gray-500">
        {!collapsed && 'DEVICES & ALERTS'}
      </div>
      <SidebarNavItem
        icon={<Package size={18} />}
        label="Device Management"
        active={activeSection === 'devices'}
        collapsed={collapsed}
        onClick={() => setActiveSection('devices')}
      />
      <SidebarNavItem
        icon={<ShieldAlert size={18} />}
        label="Alerts"
        active={activeSection === 'alerts'}
        collapsed={collapsed}
        onClick={() => setActiveSection('alerts')}
        badge={3}
      />
      <SidebarNavItem
        icon={<Truck size={18} />}
        label="Inventory"
        active={activeSection === 'inventory'}
        collapsed={collapsed}
        onClick={() => setActiveSection('inventory')}
      />
      
      {/* Call Center */}
      <div className="mt-4 mb-2 px-4 py-1 text-xs font-medium text-gray-500">
        {!collapsed && 'CALL CENTER'}
      </div>
      <SidebarNavItem
        icon={<Phone size={18} />}
        label="Call Center"
        active={activeSection === 'call-center'}
        collapsed={collapsed}
        onClick={() => setActiveSection('call-center')}
      />
      <SidebarNavItem
        icon={<BarChart size={18} />}
        label="Call Logs"
        active={activeSection === 'call-logs'}
        collapsed={collapsed}
        onClick={() => setActiveSection('call-logs')}
      />
      <SidebarNavItem
        icon={<Bell size={18} />}
        label="Agent Performance"
        active={activeSection === 'agent-performance'}
        collapsed={collapsed}
        onClick={() => setActiveSection('agent-performance')}
      />
      
      {/* Products & Sales */}
      <div className="mt-4 mb-2 px-4 py-1 text-xs font-medium text-gray-500">
        {!collapsed && 'PRODUCTS & SALES'}
      </div>
      <SidebarNavItem
        icon={<Tags size={18} />}
        label="Products"
        active={activeSection === 'products'}
        collapsed={collapsed}
        onClick={() => setActiveSection('products')}
      />
      <SidebarNavItem
        icon={<BookOpen size={18} />}
        label="Product Catalog"
        active={activeSection === 'product-catalog'}
        collapsed={collapsed}
        onClick={() => setActiveSection('product-catalog')}
      />
      <SidebarNavItem
        icon={<CreditCard size={18} />}
        label="Product Pricing"
        active={activeSection === 'product-pricing'}
        collapsed={collapsed}
        onClick={() => setActiveSection('product-pricing')}
      />
      
      {/* Help & Support */}
      <div className="mt-4 mb-2 px-4 py-1 text-xs font-medium text-gray-500">
        {!collapsed && 'HELP & SUPPORT'}
      </div>
      <SidebarNavItem
        icon={<HelpCircle size={18} />}
        label="Documentation"
        active={activeSection === 'documentation'}
        collapsed={collapsed}
        onClick={() => setActiveSection('documentation')}
      />
    </div>
  );
};

export default SidebarNavigation;
