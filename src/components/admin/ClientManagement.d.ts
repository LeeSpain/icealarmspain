
import React from 'react';

export interface ClientManagementProps {
  onAction: (action: string) => void;
}

declare const ClientManagement: React.FC<ClientManagementProps>;

export default ClientManagement;
