
import React from "react";
import { Phone, Calendar } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Call {
  id: number;
  client: string;
  time: string;
  duration: string;
  status: string;
}

interface Task {
  id: number;
  task: string;
  time: string;
  priority: string;
}

interface ActivitySidebarProps {
  recentCalls: Call[];
  upcomingTasks: Task[];
}

const ActivitySidebar: React.FC<ActivitySidebarProps> = ({ recentCalls, upcomingTasks }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Recent Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCalls.map(call => (
              <div key={call.id} className="flex justify-between items-center pb-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{call.client}</p>
                  <span className="text-xs text-muted-foreground">
                    {call.time} • {call.duration}
                  </span>
                </div>
                <Badge variant={call.status === 'completed' ? 'outline' : 'secondary'}>
                  {call.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTasks.map(task => (
              <div key={task.id} className="pb-2 border-b last:border-0">
                <div className="flex justify-between">
                  <p className="font-medium">{task.task}</p>
                  <Badge variant={task.priority === 'high' ? 'destructive' : 'outline'}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Scheduled: {task.time}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitySidebar;
