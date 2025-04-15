
import React from 'react';
import SectionRenderer from './SectionRenderer';
import { AdminDashboardContentProps } from './AdminDashboardContent.d';
import ActivityManager from './ActivityManager';
import DashboardMetrics from '../DashboardMetrics';
import { Card } from '@/components/ui/card';

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
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Card className="border shadow-sm overflow-hidden">
            {activeSection === 'dashboard' ? (
              <DashboardMetrics data={dashboardData} />
            ) : (
              <SectionRenderer 
                activeSection={activeSection} 
                onAction={handleComponentAction}
              />
            )}
          </Card>
        </div>
        
        <div className="hidden xl:block">
          <Card className="border shadow-sm overflow-hidden">
            <ActivityManager 
              activities={dashboardData?.recentActivities || []}
              onActivityAdded={addActivity}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
