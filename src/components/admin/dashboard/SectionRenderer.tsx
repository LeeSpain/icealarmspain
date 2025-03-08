
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

// Ensure these declarations match the actual component prop types
declare module "../RolesManagement" {
  export default function RolesManagement(props: RolesManagementProps): JSX.Element;
}

declare module "../PermissionsManagement" {
  export default function PermissionsManagement(props: PermissionsManagementProps): JSX.Element;
}

declare module "../UserManagement" {
  export default function UserManagement(props: UserManagementProps): JSX.Element;
}

declare module "../AdminUsersManagement" {
  export default function AdminUsersManagement(props: AdminUsersManagementProps): JSX.Element;
}

declare module "../ClientManagement" {
  export default function ClientManagement(props: ClientManagementProps): JSX.Element;
}

declare module "../DeviceManagement" {
  export default function DeviceManagement(props: DeviceManagementProps): JSX.Element;
}

declare module "../AlertsManagement" {
  export default function AlertsManagement(props: AlertsManagementProps): JSX.Element;
}

declare module "../ClientOnboarding" {
  export default function ClientOnboarding(props: ClientOnboardingProps): JSX.Element;
}

declare module "../DeviceInventoryManager" {
  export default function DeviceInventoryManager(props: DeviceInventoryManagerProps): JSX.Element;
}

declare module "../PlaceholderSection" {
  export default function PlaceholderSection(props: PlaceholderSectionProps): JSX.Element;
}

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
      return <RolesManagement {...getOnActionProp()} />;
      
    case "permissions":
      return <PermissionsManagement {...getOnActionProp()} />;
      
    // Device Management  
    case "devices":
      return <DeviceManagement {...getOnActionProp()} />;
      
    case "device-monitoring":
      return <DeviceMonitoringDashboard />;
      
    case "device-maintenance":
      return <DeviceMaintenanceSchedule />;
      
    case "alerts-management":
      return <AlertsManagement {...getOnActionProp()} />;
      
    case "client-onboarding":
      return <ClientOnboarding {...getOnActionProp()} />;
      
    case "device-inventory":
      return <DeviceInventoryManager {...getOnActionProp()} />;
      
    default:
      return (
        <PlaceholderSection
          title={`${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')}`}
          description={`This section allows you to manage ${section.replace(/-/g, ' ')}.`}
          {...getOnActionProp()}
        />
      );
  }
};

export default SectionRenderer;
