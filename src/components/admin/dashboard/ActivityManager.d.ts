
import React from 'react';

export interface DashboardActivity {
  id: number;
  type: string;
  description: string;
  time: string;
}

interface ActivityManagerProps {
  activities: DashboardActivity[];
  onActivityAdded: (activities: DashboardActivity[]) => void;
}

declare const ActivityManager: React.FC<ActivityManagerProps>;

export default ActivityManager;
