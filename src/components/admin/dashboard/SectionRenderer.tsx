
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
  section: string;
  dashboardData?: any;
  onAction?: (action: string) => void;
}

// Create type declarations for components that need onAction prop
interface WithOnActionProps {
  onAction?: (action: string) => void;
}

// Create interfaces for each component that needs specific props
interface UserManagementProps extends WithOnActionProps {}
interface AdminUsersManagementProps extends WithOnActionProps {}
interface ClientManagementProps extends WithOnActionProps {}
interface DeviceManagementProps extends WithOnActionProps {}
interface DeviceInventoryManagerProps extends WithOnActionProps {}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  dashboardData,
  onAction
}) => {
  // Helper function to safely pass onAction prop
  const getOnActionProp = () => onAction ? { onAction } : {};

  switch (section) {
    case "dashboard":
      return <DashboardMetrics data={dashboardData} />;
    
    // User Management
    case "user-management": 
      return <UserManagement {...getOnActionProp()} />;
    
    case "admin-users":
      return <AdminUsersManagement {...getOnActionProp()} />;
      
    case "client-management":
      return <ClientManagement {...getOnActionProp()} />;
      
    case "roles":
      return <RolesManagement onAction={onAction} />;
      
    case "permissions":
      return <PermissionsManagement onAction={onAction} />;
      
    // Device Management  
    case "devices":
      return <DeviceManagement {...getOnActionProp()} />;
      
    case "device-monitoring":
      return <DeviceMonitoringDashboard />;
      
    case "device-maintenance":
      return <DeviceMaintenanceSchedule />;
      
    case "alerts-management":
      return <AlertsManagement onAction={onAction} />;
      
    case "client-onboarding":
      return <ClientOnboarding onAction={onAction} />;
      
    case "device-inventory":
      return <DeviceInventoryManager {...getOnActionProp()} />;
      
    default:
      return (
        <PlaceholderSection
          title={`${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')}`}
          description={`This section allows you to manage ${section.replace(/-/g, ' ')}.`}
          onAction={onAction}
        />
      );
  }
};

export default SectionRenderer;
