
import React from 'react';

export interface AlertsManagementProps {
  onAction?: (action: string) => void;
}

declare const AlertsManagement: React.FC<AlertsManagementProps>;
export default AlertsManagement;
