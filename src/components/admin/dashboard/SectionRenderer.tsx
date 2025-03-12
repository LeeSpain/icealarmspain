
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
        return <DeviceManagement />;
      case 'roles':
        return <RolesManagement />;
      case 'permissions':
        return <PermissionsManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'clients':
        return <ClientManagement />;
      case 'onboarding':
        return <ClientOnboarding />;
      case 'alerts':
        return <AlertsManagement />;
      default:
        return (
          <PlaceholderSection 
            title={`${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section`}
            description={`This is a placeholder for the ${activeSection} section. It will be implemented in a future update.`}
          />
        );
    }
  };
  
  return <div>{renderSection()}</div>;
};

export default SectionRenderer;
