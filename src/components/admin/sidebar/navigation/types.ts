
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  icon: LucideIcon;
  path: string;
  section: string;
  roles: string[];
  subItems?: NavItem[];
  isExpanded?: boolean;
}
