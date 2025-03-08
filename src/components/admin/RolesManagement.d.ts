
import React from 'react';

export interface RolesManagementProps {
  onAction: (action: string) => void;
}

declare const RolesManagement: React.FC<RolesManagementProps>;
export default RolesManagement;
