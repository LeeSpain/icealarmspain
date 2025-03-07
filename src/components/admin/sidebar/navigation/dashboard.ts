
import { LayoutDashboard } from 'lucide-react';
import { NavItem } from './types';

export const dashboardItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
    section: 'dashboard',
    roles: ['admin'],
  },
];
