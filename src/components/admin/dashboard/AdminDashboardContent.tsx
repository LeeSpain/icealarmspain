
import React from 'react';
import SectionRenderer from './SectionRenderer';
import { AdminDashboardContentProps } from './AdminDashboardContent.d';
import ActivityManager from './ActivityManager';

const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({ 
  activeSection,
  dashboardData,
  addActivity
}) => {
  // Handle action notifications from components
  const handleComponentAction = (action: string) => {
    if (addActivity) {
      addActivity('System', action);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3">
        <SectionRenderer 
          activeSection={activeSection} 
          onAction={handleComponentAction}
        />
      </div>
      
      <div className="hidden xl:block">
        <ActivityManager 
          activities={dashboardData?.activities || []} 
        />
      </div>
    </div>
  );
};

export default AdminDashboardContent;
