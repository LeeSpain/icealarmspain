
import {
  Users,
  User,
  Shield,
  LockKeyhole,
  UserPlus,
} from 'lucide-react';
import { NavItem } from './types';

export const userManagementItems: NavItem = {
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
};
