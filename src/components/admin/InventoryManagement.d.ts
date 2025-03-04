
import { ReactNode } from 'react';

export interface InventoryManagementProps {
  section: "orders-list" | "inventory";
  onAction?: (action: string) => void;
}

declare const InventoryManagement: React.FC<InventoryManagementProps>;
export default InventoryManagement;
