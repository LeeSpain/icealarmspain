
import React from 'react';

export interface InventoryManagementProps {
  section: string;
  onAction: (action: string) => void;
}

declare const InventoryManagement: React.FC<InventoryManagementProps>;
export default InventoryManagement;
