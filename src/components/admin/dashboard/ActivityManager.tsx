
import React from "react";

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

const ActivityManager: React.FC<ActivityManagerProps> = ({ activities, onActivityAdded }) => {
  const addActivity = (type: string, description: string) => {
    const newActivity = {
      id: Date.now(),
      type,
      description,
      time: "Just now"
    };
    
    const updatedActivities = [newActivity, ...activities.slice(0, 4)];
    onActivityAdded(updatedActivities);
    
    return description;
  };
  
  return { addActivity };
};

export default ActivityManager;
