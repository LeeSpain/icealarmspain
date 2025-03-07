
import {
  Package,
  FileText,
  DollarSign,
} from 'lucide-react';
import { NavItem } from './types';

export const productsInventoryItems: NavItem = {
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
};
