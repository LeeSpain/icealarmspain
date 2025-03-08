
import {
  Smartphone,
  Settings,
  AlertTriangle,
  BarChart,
  ClipboardCheck,
  HardDrive,
  UserPlus
} from 'lucide-react';
import { NavItem } from './types';

export const deviceManagementItems: NavItem = {
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
      icon: BarChart,
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
    {
      name: 'Alerts Management',
      icon: AlertTriangle,
      path: '/admin/alerts-management',
      section: 'alerts-management',
      roles: ['admin'],
    },
    {
      name: 'Client Onboarding',
      icon: UserPlus,
      path: '/admin/client-onboarding',
      section: 'client-onboarding',
      roles: ['admin'],
    },
    {
      name: 'Inventory',
      icon: HardDrive,
      path: '/admin/device-inventory',
      section: 'device-inventory',
      roles: ['admin'],
    }
  ]
};
