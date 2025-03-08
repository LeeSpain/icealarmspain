
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
  dashboardData: any;
  onAction?: (action: string) => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  dashboardData,
  onAction
}) => {
  switch (section) {
    case "dashboard":
      return <DashboardMetrics data={dashboardData} />;
    
    // User Management
    case "user-management": 
      return <UserManagement />;
    
    case "admin-users":
      return <AdminUsersManagement onAction={onAction} />;
      
    case "client-management":
      return <ClientManagement onAction={onAction} />;
      
    case "roles":
      return <RolesManagement onAction={onAction} />;
      
    case "permissions":
      return <PermissionsManagement onAction={onAction} />;
      
    // Device Management  
    case "devices":
      return <DeviceManagement />;
      
    case "device-monitoring":
      return <DeviceMonitoringDashboard />;
      
    case "device-maintenance":
      return <DeviceMaintenanceSchedule />;
      
    case "alerts-management":
      return <AlertsManagement onAction={onAction} />;
      
    case "client-onboarding":
      return <ClientOnboarding onAction={onAction} />;
      
    case "device-inventory":
      return <DeviceInventoryManager />;
      
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
