
import React from "react";
import PlaceholderSection from "../PlaceholderSection";
import DeviceManagement from "../DeviceManagement";
import RolesManagement from "../RolesManagement";
import PermissionsManagement from "../PermissionsManagement";
import AlertsManagement from "../AlertsManagement";
import ClientOnboarding from "../ClientOnboarding";
import AdminUsersManagement from "../AdminUsersManagement";
import ClientManagement from "../ClientManagement";
import UserManagement from "../UserManagement";
import DashboardMetrics from "../DashboardMetrics";
import DeviceMonitoringDashboard from "../DeviceMonitoringDashboard";
import DeviceMaintenanceSchedule from "../DeviceMaintenanceSchedule";
import DeviceInventoryManager from "../DeviceInventoryManager";

interface SectionRendererProps {
  activeSection: string;
  dashboardData?: any;
  onAction: (action: string) => void;
}

// Create type declarations for components that need onAction prop
interface WithOnActionProps {
  onAction?: (action: string) => void;
}

// Create interfaces for each component that needs specific props
interface RolesManagementProps extends WithOnActionProps {}
interface PermissionsManagementProps extends WithOnActionProps {}
interface UserManagementProps extends WithOnActionProps {}
interface AdminUsersManagementProps extends WithOnActionProps {}
interface ClientManagementProps extends WithOnActionProps {}
interface DeviceManagementProps extends WithOnActionProps {}
interface AlertsManagementProps extends WithOnActionProps {}
interface ClientOnboardingProps extends WithOnActionProps {}
interface DeviceInventoryManagerProps extends WithOnActionProps {}
interface PlaceholderSectionProps extends WithOnActionProps {
  title: string;
  description: string;
}

// Type assertions for components
const TypedRolesManagement = RolesManagement as React.ComponentType<RolesManagementProps>;
const TypedPermissionsManagement = PermissionsManagement as React.ComponentType<PermissionsManagementProps>;
const TypedUserManagement = UserManagement as React.ComponentType<UserManagementProps>;
const TypedAdminUsersManagement = AdminUsersManagement as React.ComponentType<AdminUsersManagementProps>;
const TypedClientManagement = ClientManagement as React.ComponentType<ClientManagementProps>;
const TypedDeviceManagement = DeviceManagement as React.ComponentType<DeviceManagementProps>;
const TypedAlertsManagement = AlertsManagement as React.ComponentType<AlertsManagementProps>;
const TypedClientOnboarding = ClientOnboarding as React.ComponentType<ClientOnboardingProps>;
const TypedDeviceInventoryManager = DeviceInventoryManager as React.ComponentType<DeviceInventoryManagerProps>;
const TypedPlaceholderSection = PlaceholderSection as React.ComponentType<PlaceholderSectionProps>;

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  activeSection,
  dashboardData,
  onAction
}) => {
  // Helper function to safely pass onAction prop
  const getOnActionProp = () => onAction ? { onAction } : {};

  switch (activeSection) {
    case "dashboard":
      return <DashboardMetrics data={dashboardData} />;
    
    // User Management
    case "user-management": 
      return <TypedUserManagement {...getOnActionProp()} />;
    
    case "admin-users":
      return <TypedAdminUsersManagement {...getOnActionProp()} />;
      
    case "client-management":
      return <TypedClientManagement {...getOnActionProp()} />;
      
    case "roles":
      return <TypedRolesManagement {...getOnActionProp()} />;
      
    case "permissions":
      return <TypedPermissionsManagement {...getOnActionProp()} />;
      
    // Device Management  
    case "devices":
      return <TypedDeviceManagement {...getOnActionProp()} />;
      
    case "device-monitoring":
      return <DeviceMonitoringDashboard />;
      
    case "device-maintenance":
      return <DeviceMaintenanceSchedule />;
      
    case "alerts-management":
      return <TypedAlertsManagement {...getOnActionProp()} />;
      
    case "client-onboarding":
      return <TypedClientOnboarding {...getOnActionProp()} />;
      
    case "device-inventory":
      return <TypedDeviceInventoryManager {...getOnActionProp()} />;
      
    default:
      return (
        <TypedPlaceholderSection
          title={`${activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/-/g, ' ')}`}
          description={`This section allows you to manage ${activeSection.replace(/-/g, ' ')}.`}
          {...getOnActionProp()}
        />
      );
  }
};

export default SectionRenderer;
