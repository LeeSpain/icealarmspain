import React, { useCallback } from "react";

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

// Convert to a custom hook instead of a component since it's returning a function
export const useActivityManager = ({ activities, onActivityAdded }: ActivityManagerProps) => {
  const addActivity = useCallback((type: string, description: string) => {
    const newActivity = {
      id: Date.now(),
      type,
      description,
      time: "Just now"
    };
    
    const updatedActivities = [newActivity, ...activities.slice(0, 4)];
    onActivityAdded(updatedActivities);
    
    return description;
  }, [activities, onActivityAdded]);
  
  return { addActivity };
};

// Keeping an empty component for backwards compatibility if needed
const ActivityManager: React.FC<ActivityManagerProps> = () => {
  return null; // This component doesn't render anything
};

export default ActivityManager;
