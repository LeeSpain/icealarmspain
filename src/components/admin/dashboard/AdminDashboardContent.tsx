import React from "react";
import SectionRenderer from "./SectionRenderer";
import UserManagement from "../UserManagement";
import AdminUsersManagement from "../AdminUsersManagement";
import DashboardMetrics from "../DashboardMetrics";
import DeviceManagement from "../DeviceManagement";
import RolesManagement from "../RolesManagement";
import PermissionsManagement from "../PermissionsManagement";
import AlertsManagement from "../AlertsManagement";
import ClientOnboarding from "../ClientOnboarding";
import ClientManagement from "../ClientManagement";
import DeviceMonitoringDashboard from "../DeviceMonitoringDashboard";
import DeviceMaintenanceSchedule from "../DeviceMaintenanceSchedule";
import DeviceInventoryManager from "../DeviceInventoryManager";

interface AdminDashboardContentProps {
  activeSection: string;
  dashboardData: any;
  addActivity: (type: string, description: string) => string;
}

export const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({
  activeSection,
  dashboardData,
  addActivity
}) => {
  const handleAction = (action: string) => {
    addActivity("User", `Performed action: ${action}`);
  };

  // Dynamic rendering based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMetrics data={dashboardData} />;
        
      // User Management
      case "user-management":
        return <UserManagement />;
        
      case "admin-users":
        return <AdminUsersManagement onAction={handleAction} />;
        
      case "client-management":
        return <ClientManagement onAction={handleAction} />;
        
      case "roles":
        return <RolesManagement onAction={handleAction} />;
        
      case "permissions":
        return <PermissionsManagement onAction={handleAction} />;
        
      // Device Management
      case "devices":
        return <DeviceManagement />;
        
      case "device-monitoring":
        return <DeviceMonitoringDashboard />;
        
      case "device-maintenance":
        return <DeviceMaintenanceSchedule />;
        
      case "alerts-management":
        return <AlertsManagement onAction={handleAction} />;
        
      case "client-onboarding":
        return <ClientOnboarding onAction={handleAction} />;
        
      case "device-inventory":
        return <DeviceInventoryManager />;
        
      // Default case - delegate to SectionRenderer for other sections
      default:
        return (
          <SectionRenderer
            section={activeSection}
            dashboardData={dashboardData}
            onAction={handleAction}
          />
        );
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default AdminDashboardContent;
