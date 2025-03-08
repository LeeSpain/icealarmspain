
import React from 'react';

export interface UserManagementProps {
  onAction?: (action: string) => void;
}

declare const UserManagement: React.FC<UserManagementProps>;
export default UserManagement;
