
import React from 'react';

export interface AdminUserWithPermissions {
  id: string;
  uid: string;
  name: string;
  email: string;
  displayName: string;
  role: string;
  status: "active" | "pending" | "inactive";
  permissions: string[];
  lastLogin: string;
  createdAt: string;
  profileCompleted: boolean;
}

export interface AdminUsersManagementProps {
  onAction?: (action: string) => void;
}

declare const AdminUsersManagement: React.FC<AdminUsersManagementProps>;
export default AdminUsersManagement;
