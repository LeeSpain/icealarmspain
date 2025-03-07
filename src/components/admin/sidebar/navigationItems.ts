
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
  Smartphone,
  ShoppingCart,
  DollarSign,
  MessageSquare,
  UserPlus,
  MapPin,
  Bell,
  ChevronDown,
  ChevronRight,
  User
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  icon: LucideIcon;
  path: string;
  section: string;
  roles: string[];
  subItems?: NavItem[];
  isExpanded?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
    section: 'dashboard',
    roles: ['admin'],
  },
  
  // User Management Group
  {
    name: 'User Management',
    icon: Users,
    path: '#',
    section: 'user-management',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Users',
        icon: User,
        path: '/admin/users',
        section: 'users',
        roles: ['admin'],
      },
      {
        name: 'Clients',
        icon: Users,
        path: '/admin/clients',
        section: 'clients',
        roles: ['admin'],
      },
      {
        name: 'Admin Users',
        icon: Users,
        path: '/admin/admin-users',
        section: 'admin-users',
        roles: ['admin'],
      },
      {
        name: 'Roles',
        icon: Shield,
        path: '/admin/roles',
        section: 'roles',
        roles: ['admin'],
      },
      {
        name: 'Permissions',
        icon: LockKeyhole,
        path: '/admin/permissions',
        section: 'permissions',
        roles: ['admin'],
      },
      {
        name: 'Client Onboarding',
        icon: UserPlus,
        path: '/admin/client-onboarding',
        section: 'client-onboarding',
        roles: ['admin'],
      },
    ]
  },
  
  // Device Management Group
  {
    name: 'Device Management',
    icon: Smartphone,
    path: '#',
    section: 'device-management',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Devices',
        icon: Smartphone,
        path: '/admin/devices',
        section: 'devices',
        roles: ['admin'],
      },
      {
        name: 'Device Monitoring',
        icon: Smartphone,
        path: '/admin/device-monitoring',
        section: 'device-monitoring',
        roles: ['admin'],
      },
      {
        name: 'Device Maintenance',
        icon: Settings,
        path: '/admin/device-maintenance',
        section: 'device-maintenance',
        roles: ['admin'],
      },
    ]
  },
  
  // Alerts & Incidents Group
  {
    name: 'Alerts & Incidents',
    icon: AlertTriangle,
    path: '#',
    section: 'alerts-incidents',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Alerts',
        icon: AlertTriangle,
        path: '/admin/alerts',
        section: 'alerts',
        roles: ['admin'],
      },
      {
        name: 'Incidents',
        icon: AlertTriangle,
        path: '/admin/incidents',
        section: 'incidents',
        roles: ['admin'],
      },
      {
        name: 'Emergency',
        icon: AlertTriangle,
        path: '/admin/emergency',
        section: 'emergency',
        roles: ['admin'],
      },
    ]
  },
  
  // Call Center Group
  {
    name: 'Call Center',
    icon: MessageSquare,
    path: '#',
    section: 'call-center-group',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Call Center',
        icon: MessageSquare,
        path: '/admin/call-center',
        section: 'call-center',
        roles: ['admin'],
      },
      {
        name: 'Call Logs',
        icon: FileText,
        path: '/admin/call-logs',
        section: 'call-logs',
        roles: ['admin'],
      },
      {
        name: 'Agent Performance',
        icon: BarChart3,
        path: '/admin/agent-performance',
        section: 'agent-performance',
        roles: ['admin'],
      },
    ]
  },
  
  // Products & Inventory Group
  {
    name: 'Products & Inventory',
    icon: Package,
    path: '#',
    section: 'products-inventory',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Inventory',
        icon: Package,
        path: '/admin/inventory',
        section: 'inventory',
        roles: ['admin'],
      },
      {
        name: 'Products',
        icon: Package,
        path: '/admin/products',
        section: 'products',
        roles: ['admin'],
      },
      {
        name: 'Product Catalog',
        icon: FileText,
        path: '/admin/product-catalog',
        section: 'product-catalog',
        roles: ['admin'],
      },
      {
        name: 'Product Pricing',
        icon: DollarSign,
        path: '/admin/product-pricing',
        section: 'product-pricing',
        roles: ['admin'],
      },
    ]
  },
  
  // Sales & Orders Group
  {
    name: 'Sales & Orders',
    icon: ShoppingCart,
    path: '#',
    section: 'sales-orders',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Orders',
        icon: ShoppingCart,
        path: '/admin/orders-list',
        section: 'orders-list',
        roles: ['admin'],
      },
      {
        name: 'Sales',
        icon: BarChart3,
        path: '/admin/sales',
        section: 'sales',
        roles: ['admin'],
      },
    ]
  },
  
  // Finance Group
  {
    name: 'Finance',
    icon: DollarSign,
    path: '#',
    section: 'finance-group',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Finance',
        icon: DollarSign,
        path: '/admin/finance',
        section: 'finance',
        roles: ['admin'],
      },
      {
        name: 'Invoices',
        icon: FileText,
        path: '/admin/invoices',
        section: 'invoices',
        roles: ['admin'],
      },
      {
        name: 'Subscriptions',
        icon: Calendar,
        path: '/admin/subscriptions',
        section: 'subscriptions',
        roles: ['admin'],
      },
    ]
  },
  
  // Reports & Analytics Group
  {
    name: 'Reports & Analytics',
    icon: BarChart3,
    path: '#',
    section: 'reports-analytics',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Reports',
        icon: FileText,
        path: '/admin/reports',
        section: 'reports',
        roles: ['admin'],
      },
      {
        name: 'Analytics',
        icon: BarChart3,
        path: '/admin/analytics',
        section: 'analytics',
        roles: ['admin'],
      },
      {
        name: 'Metrics',
        icon: BarChart3,
        path: '/admin/metrics',
        section: 'metrics',
        roles: ['admin'],
      },
    ]
  },
  
  // Support & Knowledge Group
  {
    name: 'Support & Knowledge',
    icon: MessageSquare,
    path: '#',
    section: 'support-knowledge',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Support',
        icon: MessageSquare,
        path: '/admin/support',
        section: 'support',
        roles: ['admin'],
      },
      {
        name: 'Knowledge Base',
        icon: FileText,
        path: '/admin/knowledge-base',
        section: 'knowledge-base',
        roles: ['admin'],
      },
      {
        name: 'FAQs',
        icon: MessageSquare,
        path: '/admin/faqs',
        section: 'faqs',
        roles: ['admin'],
      },
    ]
  },
  
  // Configuration Group
  {
    name: 'Configuration',
    icon: Settings,
    path: '#',
    section: 'configuration',
    roles: ['admin'],
    isExpanded: false,
    subItems: [
      {
        name: 'Settings',
        icon: Settings,
        path: '/admin/settings',
        section: 'settings',
        roles: ['admin'],
      },
      {
        name: 'Regions',
        icon: MapPin,
        path: '/admin/regions',
        section: 'regions',
        roles: ['admin'],
      },
      {
        name: 'General',
        icon: Settings,
        path: '/admin/general',
        section: 'general',
        roles: ['admin'],
      },
      {
        name: 'Security',
        icon: LockKeyhole,
        path: '/admin/security',
        section: 'security',
        roles: ['admin'],
      },
      {
        name: 'Notifications',
        icon: Bell,
        path: '/admin/notifications',
        section: 'notifications',
        roles: ['admin'],
      },
    ]
  },
];
