
import React from "react";
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import UserManagement from "@/components/admin/UserManagement";
import PlaceholderSection from "@/components/admin/PlaceholderSection";
import AlertsManagement from "@/components/admin/AlertsManagement";
import InventoryManagement from "@/components/admin/InventoryManagement";
import ClientManagement from "@/components/admin/ClientManagement";
import DeviceManagement from "@/components/admin/DeviceManagement";
import AdminUsersManagement from "@/components/admin/AdminUsersManagement";
import RolesManagement from "@/components/admin/RolesManagement";
import PermissionsManagement from "@/components/admin/PermissionsManagement";

interface SectionRendererProps {
  activeSection: string;
  dashboardData: any;
  onActivityAdded: (type: string, description: string) => void;
}

// Import the proper types from their definition files
import { UserManagementProps } from "@/components/admin/UserManagement.d";
import { ClientManagementProps } from "@/components/admin/ClientManagement.d";
import { DeviceManagementProps } from "@/components/admin/DeviceManagement.d";
import { AlertsManagementProps } from "@/components/admin/AlertsManagement.d";
import { AdminUsersManagementProps } from "@/components/admin/AdminUsersManagement.d";
import { RolesManagementProps } from "@/components/admin/RolesManagement.d";
import { PermissionsManagementProps } from "@/components/admin/PermissionsManagement.d";
import { InventoryManagementProps } from "@/components/admin/InventoryManagement.d";

// Type declaration for PlaceholderSection component
interface PlaceholderSectionProps {
  title: string;
  description: string;
  onAction: (action: string) => void;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  activeSection,
  dashboardData,
  onActivityAdded
}) => {
  const addActivity = (type: string, action: string) => {
    onActivityAdded(type, action);
  };

  // Create a type guard to ensure components with different props are handled correctly
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMetrics dashboardMetrics={dashboardData} />;
      case "users":
        return <UserManagement onAction={(action) => addActivity("User", action)} />;
      case "clients":
        return <ClientManagement onAction={(action) => addActivity("Client", action)} />;
      case "devices":
        return <DeviceManagement onAction={(action) => addActivity("Device", action)} />;
      case "alerts":
        return <AlertsManagement onAction={(action) => addActivity("Alert", action)} />;
      case "admin-users":
        return <AdminUsersManagement onAction={(action) => addActivity("Admin", action)} />;
      case "roles":
        return <RolesManagement onAction={(action) => addActivity("Role", action)} />;  
      case "permissions":
        return <PermissionsManagement onAction={(action) => addActivity("Permission", action)} />;
      case "orders-list":
      case "inventory":
        return <InventoryManagement 
          section={activeSection as "orders-list" | "inventory"}
          onAction={(action) => addActivity("Inventory", action)} 
        />;
      default:
        return <PlaceholderSection 
          title={activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} 
          description={`Manage ${activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} section`} 
          onAction={(action) => addActivity(activeSection.charAt(0).toUpperCase() + activeSection.slice(1), action)}
        />;
    }
  };

  return renderSection();
};

export default SectionRenderer;
