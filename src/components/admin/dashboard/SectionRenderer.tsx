
import React from 'react';
import { SectionRendererProps } from './SectionRenderer.d';
import UserManagement from '../user-management/UserManagement';
import InventoryManagement from '../InventoryManagement';
import PlaceholderSection from '../PlaceholderSection';

const SectionRenderer: React.FC<SectionRendererProps> = ({ 
  activeSection,
  onAction 
}) => {
  const getSectionTitle = (section: string): string => {
    switch (section) {
      case 'roles': return 'Role Management';
      case 'permissions': return 'Permission Management';
      case 'alerts': return 'Alerts Configuration';
      default: return 'Section';
    }
  };

  const getSectionDescription = (section: string): string => {
    switch (section) {
      case 'roles': return 'Manage user roles and their capabilities within the system.';
      case 'permissions': return 'Configure granular permissions for different roles and users.';
      case 'alerts': return 'Set up and customize system alerts and notifications.';
      default: return 'This section provides management capabilities.';
    }
  };

  switch (activeSection) {
    case 'users':
      return <UserManagement onAction={onAction} />;
    case 'inventory':
      // Note: If InventoryManagement doesn't accept onAction, we need to update its interface
      return <InventoryManagement />;
    case 'roles':  
      return (
        <PlaceholderSection 
          title={getSectionTitle('roles')} 
          description={getSectionDescription('roles')}
          onAction={onAction} 
        />
      );
    case 'permissions':
      return (
        <PlaceholderSection 
          title={getSectionTitle('permissions')} 
          description={getSectionDescription('permissions')}
          onAction={onAction} 
        />
      );
    case 'alerts':
      return (
        <PlaceholderSection 
          title={getSectionTitle('alerts')} 
          description={getSectionDescription('alerts')}
          onAction={onAction} 
        />
      );
    default:
      return null;
  }
};

export default SectionRenderer;
