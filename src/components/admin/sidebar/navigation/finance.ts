
import {
  DollarSign,
  FileText,
  Calendar,
} from 'lucide-react';
import { NavItem } from './types';

export const financeItems: NavItem = {
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
};
