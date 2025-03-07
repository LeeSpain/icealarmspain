
import {
  MessageSquare,
  FileText,
} from 'lucide-react';
import { NavItem } from './types';

export const supportKnowledgeItems: NavItem = {
  name: 'Support & Knowledge',
  icon: MessageSquare,
  path: '#',
  section: 'support-knowledge',
  roles: ['admin'],
  isExpanded: false,
  subItems: [
    {
      name: 'Support',
      icon: MessageSquare,
      path: '/admin/support',
      section: 'support',
      roles: ['admin'],
    },
    {
      name: 'Knowledge Base',
      icon: FileText,
      path: '/admin/knowledge-base',
      section: 'knowledge-base',
      roles: ['admin'],
    },
    {
      name: 'FAQs',
      icon: MessageSquare,
      path: '/admin/faqs',
      section: 'faqs',
      roles: ['admin'],
    },
  ]
};
