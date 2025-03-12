
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
  
  // Map of sections to their corresponding components
  const sectionComponents: Record<string, React.ReactNode> = {
    'device-monitoring': <DeviceMonitoringDashboard />,
    'users': <UserManagement onAction={onAction} />,
    'devices': <DeviceManagement onAction={onAction} />,
    'roles': <RolesManagement onAction={onAction} />,
    'permissions': <PermissionsManagement onAction={onAction} />,
    'inventory': <InventoryManagement onAction={onAction} />,
    'clients': <ClientManagement onAction={onAction} />,
    'onboarding': <ClientOnboarding onAction={onAction} />,
    'alerts': <AlertsManagement onAction={onAction} />,
  };
  
  // Return the component for the active section, or a placeholder if not found
  return (
    <div>
      {sectionComponents[activeSection] || (
        <PlaceholderSection 
          title={`${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section`}
          description={`This is a placeholder for the ${activeSection} section. It will be implemented in a future update.`}
          onAction={onAction}
        />
      )}
    </div>
  );
};

export default SectionRenderer;
