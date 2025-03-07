
import {
  Smartphone,
  Settings,
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
};
