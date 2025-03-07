
import React from "react";
import SectionRenderer from "@/components/admin/dashboard/SectionRenderer";
import UserManagement from "@/components/admin/UserManagement";
import ClientManagement from "@/components/admin/ClientManagement";
import ClientOnboarding from "@/components/admin/ClientOnboarding";
import DeviceManagement from "@/components/admin/DeviceManagement";
import AlertsManagement from "@/components/admin/AlertsManagement";
import AdminUsersManagement from "@/components/admin/AdminUsersManagement";
import RolesManagement from "@/components/admin/RolesManagement";
import PermissionsManagement from "@/components/admin/PermissionsManagement";
import InventoryManagement from "@/components/admin/InventoryManagement";
import PlaceholderSection from "@/components/admin/PlaceholderSection";

interface AdminDashboardContentProps {
  activeSection: string;
  dashboardData: any;
  addActivity: (type: string, description: string) => void;
}

const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({
  activeSection,
  dashboardData,
  addActivity
}) => {
  switch (activeSection) {
    case 'dashboard':
      return (
        <SectionRenderer 
          activeSection="dashboard" 
          dashboardData={dashboardData}
          onActivityAdded={addActivity}
        />
      );
    case 'users':
      return <UserManagement onAction={(action: string) => { addActivity("User", action); }} />;
    case 'clients':
      return <ClientManagement onAction={(action: string) => { addActivity("Client", action); }} />;
    case 'devices':
      return <DeviceManagement onAction={(action: string) => { addActivity("Device", action); }} />;
    case 'alerts':
      return <AlertsManagement onAction={(action: string) => { addActivity("Alert", action); }} />;
    case 'admin-users':
      return <AdminUsersManagement onAction={(action: string) => { addActivity("Admin", action); }} />;
    case 'roles':
      return <RolesManagement onAction={(action: string) => { addActivity("Role", action); }} />;
    case 'permissions':
      return <PermissionsManagement onAction={(action: string) => { addActivity("Permission", action); }} />;
    case 'client-onboarding':
      return <ClientOnboarding onAction={(action: string) => { addActivity("Client", action); }} />;
    case 'inventory':
      return <InventoryManagement 
        section="inventory"
        onAction={(action: string) => { addActivity("Inventory", action); }} 
      />;
    default:
      return (
        <PlaceholderSection 
          title={activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} 
          description={`This is the ${activeSection} section of the admin dashboard.`}
          onAction={(action) => { addActivity(activeSection.charAt(0).toUpperCase() + activeSection.slice(1), action); }}
        />
      );
  }
};

export default AdminDashboardContent;
