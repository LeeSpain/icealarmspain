
import React from 'react';

export interface DeviceManagementProps {
  onAction: (action: string) => void;
}

declare const DeviceManagement: React.FC<DeviceManagementProps>;
export default DeviceManagement;
