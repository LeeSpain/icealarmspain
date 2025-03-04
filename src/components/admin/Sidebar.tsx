import React from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  AlertTriangle,
  Package,
  BarChart3,
  Settings,
  FileText,
  LockKeyhole,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userData?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed, 
  setCollapsed,
  userData 
}) => {
  const navItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/admin',
      section: 'dashboard',
      roles: ['admin'],
    },
    {
      name: 'Users',
      icon: <Users size={20} />,
      path: '/admin/users',
      section: 'users',
      roles: ['admin'],
    },
    {
      name: 'Clients',
      icon: <Users size={20} />,
      path: '/admin/clients',
      section: 'clients',
      roles: ['admin'],
    },
    {
      name: 'Devices',
      icon: <Smartphone size={20} />,
      path: '/admin/devices',
      section: 'devices',
      roles: ['admin'],
    },
    {
      name: 'Alerts',
      icon: <AlertTriangle size={20} />,
      path: '/admin/alerts',
      section: 'alerts',
      roles: ['admin'],
    },
    {
      name: 'Admin Users',
      icon: <Users size={20} />,
      path: '/admin/admin-users',
      section: 'admin-users',
      roles: ['admin'],
    },
    {
      name: 'Roles',
      icon: <Shield size={20} />,
      path: '/admin/roles',
      section: 'roles',
      roles: ['admin'],
    },
    {
      name: 'Permissions',
      icon: <LockKeyhole size={20} />,
      path: '/admin/permissions',
      section: 'permissions',
      roles: ['admin'],
    },
    {
      name: 'Orders',
      icon: <ShoppingCart size={20} />,
      path: '/admin/orders-list',
      section: 'orders-list',
      roles: ['admin'],
    },
    {
      name: 'Inventory',
      icon: <Package size={20} />,
      path: '/admin/inventory',
      section: 'inventory',
      roles: ['admin'],
    },
    {
      name: 'Finance',
      icon: <DollarSign size={20} />,
      path: '/admin/finance',
      section: 'finance',
      roles: ['admin'],
    },
    {
      name: 'Sales',
      icon: <BarChart3 size={20} />,
      path: '/admin/sales',
      section: 'sales',
      roles: ['admin'],
    },
    {
      name: 'Invoices',
      icon: <FileText size={20} />,
      path: '/admin/invoices',
      section: 'invoices',
      roles: ['admin'],
    },
    {
      name: 'Reports',
      icon: <FileText size={20} />,
      path: '/admin/reports',
      section: 'reports',
      roles: ['admin'],
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      path: '/admin/settings',
      section: 'settings',
      roles: ['admin'],
    },
    {
      name: 'Device Monitoring',
      icon: <Smartphone size={20} />,
      path: '/admin/device-monitoring',
      section: 'device-monitoring',
      roles: ['admin'],
    },
    {
      name: 'Device Maintenance',
      icon: <Settings size={20} />,
      path: '/admin/device-maintenance',
      section: 'device-maintenance',
      roles: ['admin'],
    },
    {
      name: 'Call Center',
      icon: <MessageSquare size={20} />,
      path: '/admin/call-center',
      section: 'call-center',
      roles: ['admin'],
    },
    {
      name: 'Call Logs',
      icon: <FileText size={20} />,
      path: '/admin/call-logs',
      section: 'call-logs',
      roles: ['admin'],
    },
    {
      name: 'Agent Performance',
      icon: <BarChart3 size={20} />,
      path: '/admin/agent-performance',
      section: 'agent-performance',
      roles: ['admin'],
    },
    {
      name: 'Client Details',
      icon: <Users size={20} />,
      path: '/admin/client-details',
      section: 'client-details',
      roles: ['admin'],
    },
    {
      name: 'Client Onboarding',
      icon: <UserPlus size={20} />,
      path: '/admin/client-onboarding',
      section: 'client-onboarding',
      roles: ['admin'],
    },
    {
      name: 'Incidents',
      icon: <AlertTriangle size={20} />,
      path: '/admin/incidents',
      section: 'incidents',
      roles: ['admin'],
    },
    {
      name: 'Emergency',
      icon: <AlertTriangle size={20} />,
      path: '/admin/emergency',
      section: 'emergency',
      roles: ['admin'],
    },
    {
      name: 'Regions',
      icon: <MapPin size={20} />,
      path: '/admin/regions',
      section: 'regions',
      roles: ['admin'],
    },
    {
      name: 'Products',
      icon: <Package size={20} />,
      path: '/admin/products',
      section: 'products',
      roles: ['admin'],
    },
    {
      name: 'Product Catalog',
      icon: <FileText size={20} />,
      path: '/admin/product-catalog',
      section: 'product-catalog',
      roles: ['admin'],
    },
    {
      name: 'Product Pricing',
      icon: <DollarSign size={20} />,
      path: '/admin/product-pricing',
      section: 'product-pricing',
      roles: ['admin'],
    },
    {
      name: 'Subscriptions',
      icon: <Calendar size={20} />,
      path: '/admin/subscriptions',
      section: 'subscriptions',
      roles: ['admin'],
    },
    {
      name: 'Support',
      icon: <MessageSquare size={20} />,
      path: '/admin/support',
      section: 'support',
      roles: ['admin'],
    },
    {
      name: 'Knowledge Base',
      icon: <FileText size={20} />,
      path: '/admin/knowledge-base',
      section: 'knowledge-base',
      roles: ['admin'],
    },
    {
      name: 'FAQs',
      icon: <MessageSquare size={20} />,
      path: '/admin/faqs',
      section: 'faqs',
      roles: ['admin'],
    },
    {
      name: 'Analytics',
      icon: <BarChart3 size={20} />,
      path: '/admin/analytics',
      section: 'analytics',
      roles: ['admin'],
    },
    {
      name: 'Metrics',
      icon: <BarChart3 size={20} />,
      path: '/admin/metrics',
      section: 'metrics',
      roles: ['admin'],
    },
    {
      name: 'General',
      icon: <Settings size={20} />,
      path: '/admin/general',
      section: 'general',
      roles: ['admin'],
    },
    {
      name: 'Security',
      icon: <LockKeyhole size={20} />,
      path: '/admin/security',
      section: 'security',
      roles: ['admin'],
    },
    {
      name: 'Notifications',
      icon: <Bell size={20} />,
      path: '/admin/notifications',
      section: 'notifications',
      roles: ['admin'],
    },
  ];

  return (
    <div className={`bg-ice-800 text-white h-screen overflow-y-auto transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {!collapsed && userData && (
        <div className="p-4 border-b border-ice-700">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-ice-600 flex items-center justify-center text-white font-bold mr-3">
              {userData.displayName?.[0]?.toUpperCase() || userData.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="font-medium truncate">{userData.displayName || userData.email}</div>
              <div className="text-xs text-ice-300 truncate">Admin</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 border-b border-ice-700 flex justify-between items-center">
        {!collapsed && <span className="font-bold text-lg">IceAlarm</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-ice-300 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 transition-colors duration-200
              ${isActive ? 'bg-ice-700 text-white' : 'text-ice-300 hover:text-white hover:bg-ice-700'}
              ${collapsed ? 'justify-center' : ''}`
            }
            onClick={() => setActiveSection(item.section)}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
