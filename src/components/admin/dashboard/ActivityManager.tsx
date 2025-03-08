
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

// ActivityManager component displays recent activity and manages adding new activities
const ActivityManager: React.FC<ActivityManagerProps> = ({ activities, onActivityAdded }) => {
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
  
  // Render the recent activities list
  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No recent activities</p>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-2 border-b border-gray-100">
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              activity.type === 'System' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {activity.type}
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityManager;
