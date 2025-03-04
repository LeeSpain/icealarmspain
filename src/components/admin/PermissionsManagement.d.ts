
import { ReactNode } from 'react';

export interface PermissionsManagementProps {
  onAction?: (action: string) => void;
}

declare const PermissionsManagement: React.FC<PermissionsManagementProps>;
export default PermissionsManagement;
