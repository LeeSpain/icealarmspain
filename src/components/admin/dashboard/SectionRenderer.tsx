
import React from 'react';
import { SectionRendererProps } from './SectionRenderer.d';
import UserManagement from '../user-management/UserManagement';
import InventoryManagement from '../InventoryManagement';
import PlaceholderSection from '../PlaceholderSection';

const SectionRenderer: React.FC<SectionRendererProps> = ({ 
  activeSection,
  onAction 
}) => {
  switch (activeSection) {
    case 'users':
      return <UserManagement onAction={onAction} />;
    case 'inventory':
      return <InventoryManagement onAction={onAction} />;
    case 'roles':  
      return <PlaceholderSection onAction={onAction} />;
    case 'permissions':
      return <PlaceholderSection onAction={onAction} />;
    case 'alerts':
      return <PlaceholderSection onAction={onAction} />;
    default:
      return null;
  }
};

export default SectionRenderer;
