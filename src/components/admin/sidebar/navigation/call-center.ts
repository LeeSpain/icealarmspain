
import {
  MessageSquare,
  FileText,
  BarChart3,
} from 'lucide-react';
import { NavItem } from './types';

export const callCenterItems: NavItem = {
  name: 'Call Center',
  icon: MessageSquare,
  path: '#',
  section: 'call-center-group',
  roles: ['admin'],
  isExpanded: false,
  subItems: [
    {
      name: 'Call Center',
      icon: MessageSquare,
      path: '/admin/call-center',
      section: 'call-center',
      roles: ['admin'],
    },
    {
      name: 'Call Logs',
      icon: FileText,
      path: '/admin/call-logs',
      section: 'call-logs',
      roles: ['admin'],
    },
    {
      name: 'Agent Performance',
      icon: BarChart3,
      path: '/admin/agent-performance',
      section: 'agent-performance',
      roles: ['admin'],
    },
  ]
};
