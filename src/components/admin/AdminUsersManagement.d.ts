
import { ReactNode } from 'react';

export interface AdminUsersManagementProps {
  onAction: (action: string) => void;
}

declare const AdminUsersManagement: React.FC<AdminUsersManagementProps>;
export default AdminUsersManagement;
