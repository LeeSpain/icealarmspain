
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

// Define types for components that need the onAction prop
interface ActionProps {
  onAction: (action: string) => void;
}

// Type declaration for UserManagement component
interface UserManagementProps extends ActionProps {}

// Type declaration for ClientManagement component
interface ClientManagementProps extends ActionProps {}

// Type declaration for DeviceManagement component
interface DeviceManagementProps extends ActionProps {}

// Type declaration for AlertsManagement component
interface AlertsManagementProps extends ActionProps {}

// Type declaration for AdminUsersManagement component
interface AdminUsersManagementProps extends ActionProps {}

// Type declaration for RolesManagement component
interface RolesManagementProps extends ActionProps {}

// Type declaration for PermissionsManagement component
interface PermissionsManagementProps extends ActionProps {}

// Type declaration for PlaceholderSection component
interface PlaceholderSectionProps extends ActionProps {
  title: string;
  description: string;
}

// Type for components that need section and onAction props
interface InventoryManagementProps extends ActionProps {
  section: "orders-list" | "inventory";
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
