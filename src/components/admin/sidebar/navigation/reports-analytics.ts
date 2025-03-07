
import {
  BarChart3,
  FileText,
} from 'lucide-react';
import { NavItem } from './types';

export const reportsAnalyticsItems: NavItem = {
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
};
