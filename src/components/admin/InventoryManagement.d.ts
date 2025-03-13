
import React from 'react';

export interface InventoryManagementProps {
  onAction?: (action: string) => void;
}

declare const InventoryManagement: React.FC<InventoryManagementProps>;
export default InventoryManagement;
