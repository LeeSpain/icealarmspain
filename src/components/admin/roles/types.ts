
import { ReactNode } from 'react';

export interface Role {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  permissionCount: number;
  userCount: number;
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
  isMutable?: boolean;
}

export interface RolesManagementProps {
  onAction: (action: string) => void;
}

export interface RoleFormData {
  name: string;
  description: string;
  status: 'active' | 'inactive';
}
