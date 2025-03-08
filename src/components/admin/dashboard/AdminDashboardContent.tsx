
import React from "react";
import SectionRenderer from "./SectionRenderer";

// Individual components no longer need to be imported directly here since they are handled by SectionRenderer
// We're cleaning up imports to avoid confusion
import DashboardMetrics from "../DashboardMetrics";

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

  // Use SectionRenderer for everything to maintain consistent logic
  return (
    <div>
      <SectionRenderer
        section={activeSection}
        dashboardData={dashboardData}
        onAction={handleAction}
      />
    </div>
  );
};

export default AdminDashboardContent;
