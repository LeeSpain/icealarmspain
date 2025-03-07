
import {
  ShoppingCart,
  BarChart3,
} from 'lucide-react';
import { NavItem } from './types';

export const salesOrdersItems: NavItem = {
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
};
