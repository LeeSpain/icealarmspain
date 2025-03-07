
import React from "react";
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import UserManagement from "@/components/admin/UserManagement";
import PlaceholderSection from "@/components/admin/PlaceholderSection";
import AlertsManagement from "@/components/admin/AlertsManagement";
import InventoryManagement from "@/components/admin/InventoryManagement";
import ClientManagement from "@/components/admin/ClientManagement";
import ClientOnboarding from "@/components/admin/ClientOnboarding";
import DeviceManagement from "@/components/admin/DeviceManagement";
import AdminUsersManagement from "@/components/admin/AdminUsersManagement";
import RolesManagement from "@/components/admin/RolesManagement";
import PermissionsManagement from "@/components/admin/PermissionsManagement";

// Import types
import type { UserManagementProps } from "@/components/admin/UserManagement";
import type { ClientManagementProps } from "@/components/admin/ClientManagement";
import type { AlertsManagementProps } from "@/components/admin/AlertsManagement";
import type { DeviceManagementProps } from "@/components/admin/DeviceManagement";
import type { AdminUsersManagementProps } from "@/components/admin/AdminUsersManagement";
import type { RolesManagementProps } from "@/components/admin/RolesManagement";
import type { PermissionsManagementProps } from "@/components/admin/PermissionsManagement";
import type { InventoryManagementProps } from "@/components/admin/InventoryManagement";

interface SectionRendererProps {
  activeSection: string;
  dashboardData: any;
  onActivityAdded: (type: string, description: string) => void;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  activeSection,
  dashboardData,
  onActivityAdded
}) => {
  const addActivity = (type: string, action: string) => {
    onActivityAdded(type, action);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMetrics dashboardMetrics={dashboardData} />;
      case "users":
        return <UserManagement onAction={(action: string) => { addActivity("User", action); }} />;
      case "clients":
        return <ClientManagement onAction={(action: string) => { addActivity("Client", action); }} />;
      case "client-onboarding":
        return <ClientOnboarding onAction={(action: string) => { addActivity("Client", action); }} />;
      case "devices":
        return <DeviceManagement onAction={(action: string) => { addActivity("Device", action); }} />;
      case "alerts":
        return <AlertsManagement onAction={(action: string) => { addActivity("Alert", action); }} />;
      case "admin-users":
        return <AdminUsersManagement onAction={(action: string) => { addActivity("Admin", action); }} />;
      case "roles":
        return <RolesManagement onAction={(action: string) => { addActivity("Role", action); }} />;
      case "permissions":
        return <PermissionsManagement onAction={(action: string) => { addActivity("Permission", action); }} />;
      case "orders-list":
        return <InventoryManagement 
          section="orders-list"
          onAction={(action: string) => { addActivity("Inventory", action); }}
        />;
      case "inventory":
        return <InventoryManagement 
          section="inventory"
          onAction={(action: string) => { addActivity("Inventory", action); }}
        />;
      default:
        return <PlaceholderSection 
          title={activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} 
          description={`Manage ${activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} section`} 
          onAction={(action) => { addActivity(activeSection.charAt(0).toUpperCase() + activeSection.slice(1), action); }}
        />;
    }
  };

  return renderSection();
};

export default SectionRenderer;
