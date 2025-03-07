
import { AlertTriangle } from 'lucide-react';
import { NavItem } from './types';

export const alertsIncidentsItems: NavItem = {
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
};
