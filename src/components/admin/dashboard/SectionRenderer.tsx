
import React from 'react';
import { SectionRendererProps } from './SectionRenderer.d';
import UserManagement from '../user-management/UserManagement';
import InventoryManagement from '../InventoryManagement';
import PlaceholderSection from '../PlaceholderSection';
import DashboardMetrics from '../DashboardMetrics';

const SectionRenderer: React.FC<SectionRendererProps> = ({ 
  activeSection,
  onAction 
}) => {
  const getSectionTitle = (section: string): string => {
    switch (section) {
      case 'roles': return 'Role Management';
      case 'permissions': return 'Permission Management';
      case 'alerts': return 'Alerts Configuration';
      case 'devices': return 'Device Management';
      case 'clients': return 'Client Management';
      case 'admin-users': return 'Admin Users';
      default: return section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ');
    }
  };

  const getSectionDescription = (section: string): string => {
    switch (section) {
      case 'roles': return 'Manage user roles and their capabilities within the system.';
      case 'permissions': return 'Configure granular permissions for different roles and users.';
      case 'alerts': return 'Set up and customize system alerts and notifications.';
      case 'devices': return 'Manage connected devices and their status.';
      case 'clients': return 'Manage client accounts and their information.';
      case 'admin-users': return 'Manage administrator accounts and permissions.';
      default: return 'This section provides management capabilities.';
    }
  };

  // Display dashboard content for the main dashboard
  if (activeSection === 'dashboard' || !activeSection) {
    return <DashboardMetrics data={onAction ? { onAction } : {}} />;
  }

  switch (activeSection) {
    case 'users':
      return <UserManagement onAction={onAction} />;
    case 'inventory':
      return <InventoryManagement />;
    default:
      return (
        <PlaceholderSection 
          title={getSectionTitle(activeSection)} 
          description={getSectionDescription(activeSection)}
          onAction={onAction} 
        />
      );
  }
};

export default SectionRenderer;
