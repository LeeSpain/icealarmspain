
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
    return <DashboardMetrics data={onAction ? { onAction } : {}} />;
  }

  switch (activeSection) {
    case 'users':
      return <UserManagement onAction={onAction} />;
    case 'clients':
      return <ClientManagement onAction={onAction} />;
    case 'admin-users':
      return <AdminUsersManagement onAction={onAction} />;
    case 'roles':
      return <RolesManagement onAction={onAction} />;
    case 'permissions':
      return <PermissionsManagement onAction={onAction} />;
    case 'client-onboarding':
      return <ClientOnboarding onAction={onAction} />;
    case 'inventory':
      return <InventoryManagement />;
    case 'devices':
      return <DeviceManagement onAction={onAction} />;
    case 'alerts':
      return <AlertsManagement onAction={onAction} />;
    case 'call-center':
    case 'call-logs':
    case 'agent-performance':
      return <CallCenterSection onAction={onAction} />;
    case 'products':
    case 'product-catalog':
    case 'product-pricing':
      return <ProductsSection onAction={onAction} />;
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
