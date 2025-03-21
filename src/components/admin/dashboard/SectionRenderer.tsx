
import React from 'react';
import { SectionRendererProps } from './SectionRenderer.d';
import UserManagement from '../user-management/UserManagement';
import InventoryManagement from '../InventoryManagement';
import PlaceholderSection from '../PlaceholderSection';
import DashboardMetrics from '../DashboardMetrics';
import ClientManagement from '../ClientManagement';
import AdminUsersManagement from '../AdminUsersManagement';
import RolesManagement from '../RolesManagement';
import PermissionsManagement from '../PermissionsManagement';
import ClientOnboarding from '../ClientOnboarding';
import DeviceManagement from '../DeviceManagement';
import AlertsManagement from '../AlertsManagement';
import CallCenterSection from '../CallCenterSection';
import ProductsSection from '../ProductsSection';

const SectionRenderer: React.FC<SectionRendererProps> = ({ 
  activeSection,
  onAction 
}) => {
  // Create a dummy no-op function if onAction is not provided
  const handleAction = onAction || ((action: string) => {
    console.log('Action performed but no handler provided:', action);
  });
  
  const getSectionTitle = (section: string): string => {
    switch (section) {
      case 'roles': return 'Role Management';
      case 'permissions': return 'Permission Management';
      case 'alerts': return 'Alerts Configuration';
      case 'devices': return 'Device Management';
      case 'clients': return 'Client Management';
      case 'admin-users': return 'Admin Users';
      case 'client-onboarding': return 'Client Onboarding';
      case 'call-center': return 'Call Center';
      case 'call-logs': return 'Call Logs';
      case 'agent-performance': return 'Agent Performance';
      case 'products': return 'Products';
      case 'product-catalog': return 'Product Catalog';
      case 'product-pricing': return 'Product Pricing';
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
      case 'client-onboarding': return 'Onboard new clients to the IceAlarm platform.';
      case 'call-center': return 'Manage call center operations and agent assignments.';
      case 'call-logs': return 'View and analyze call center interaction logs.';
      case 'agent-performance': return 'Monitor and evaluate call center agent performance metrics.';
      case 'products': return 'Manage product inventory and details.';
      case 'product-catalog': return 'Maintain the product catalog and categories.';
      case 'product-pricing': return 'Configure product pricing and discount structures.';
      default: return 'This section provides management capabilities.';
    }
  };

  // Display dashboard content for the main dashboard
  if (activeSection === 'dashboard' || !activeSection) {
    return <DashboardMetrics data={{ onAction: handleAction }} />;
  }

  switch (activeSection) {
    case 'users':
      return <UserManagement onAction={handleAction} />;
    case 'clients':
      // We need to check if ClientManagement accepts onAction prop
      // Based on the error, it seems it doesn't
      return <ClientManagement />;
    case 'admin-users':
      // We need to check if AdminUsersManagement accepts onAction prop
      // Based on the error, it seems it doesn't
      return <AdminUsersManagement />;
    case 'roles':
      return <RolesManagement onAction={handleAction} />;
    case 'permissions':
      return <PermissionsManagement onAction={handleAction} />;
    case 'client-onboarding':
      return <ClientOnboarding onAction={handleAction} />;
    case 'inventory':
      // Don't pass onAction if it's not in the component's props
      return <InventoryManagement />;
    case 'devices':
      // We need to check if DeviceManagement accepts onAction prop
      // Based on the error, it seems it doesn't
      return <DeviceManagement />;
    case 'alerts':
      // Don't pass onAction if it's not in the component's props
      return <AlertsManagement />;
    case 'call-center':
    case 'call-logs':
    case 'agent-performance':
      // Don't pass onAction if it's not in the component's props
      return <CallCenterSection />;
    case 'products':
    case 'product-catalog':
    case 'product-pricing':
      // Don't pass onAction if it's not in the component's props
      return <ProductsSection />;
    default:
      return (
        <PlaceholderSection 
          title={getSectionTitle(activeSection)} 
          description={getSectionDescription(activeSection)}
          onAction={handleAction} 
        />
      );
  }
};

export default SectionRenderer;
