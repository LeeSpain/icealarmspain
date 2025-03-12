
import React from 'react';
import { SectionRendererProps } from './SectionRenderer.d';
import DeviceMonitoringDashboard from '../DeviceMonitoringDashboard';
import UserManagement from '../UserManagement';
import DeviceManagement from '../DeviceManagement';
import RolesManagement from '../RolesManagement';
import PermissionsManagement from '../PermissionsManagement';
import InventoryManagement from '../InventoryManagement';
import ClientManagement from '../ClientManagement';
import ClientOnboarding from '../ClientOnboarding';
import AlertsManagement from '../AlertsManagement';
import PlaceholderSection from '../PlaceholderSection';

const SectionRenderer: React.FC<SectionRendererProps> = ({ activeSection, onAction }) => {
  console.log("SectionRenderer rendering section:", activeSection);
  
  // Function to handle actions if onAction is provided
  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action);
    }
  };
  
  // Map of sections to their corresponding components
  const renderSection = () => {
    switch (activeSection) {
      case 'device-monitoring':
        return <DeviceMonitoringDashboard />;
      case 'users':
        return <UserManagement onAction={handleAction} />;
      case 'devices':
        return <DeviceManagement onAction={handleAction} />;
      case 'roles':
        return <RolesManagement onAction={handleAction} />;
      case 'permissions':
        return <PermissionsManagement onAction={handleAction} />;
      case 'inventory':
        return <InventoryManagement onAction={handleAction} />;
      case 'clients':
        return <ClientManagement onAction={handleAction} />;
      case 'onboarding':
        return <ClientOnboarding onAction={handleAction} />;
      case 'alerts':
        return <AlertsManagement onAction={handleAction} />;
      default:
        return (
          <PlaceholderSection 
            title={`${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section`}
            description={`This is a placeholder for the ${activeSection} section. It will be implemented in a future update.`}
            onAction={handleAction}
          />
        );
    }
  };
  
  return <div>{renderSection()}</div>;
};

export default SectionRenderer;
