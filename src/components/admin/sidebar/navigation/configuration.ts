
import {
  Settings,
  MapPin,
  LockKeyhole,
  Bell,
} from 'lucide-react';
import { NavItem } from './types';

export const configurationItems: NavItem = {
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
};
