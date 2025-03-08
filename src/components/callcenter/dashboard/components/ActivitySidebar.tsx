
import React from "react";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <Card className="h-full shadow-md">
      <CardHeader className="pb-2 bg-blue-50">
        <CardTitle className="text-md flex items-center gap-2 text-blue-700">
          <Calendar className="h-5 w-5" />
          Activity & Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 max-h-[320px] overflow-y-auto">
        <div className="space-y-4">
          {/* Recent Calls Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <Phone className="h-4 w-4 mr-1 text-blue-500" />
                Recent Calls
              </h3>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                All Calls <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {recentCalls.map(call => (
                <div key={call.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md text-sm">
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
          </div>
          
          {/* Upcoming Tasks Section */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                Upcoming Tasks
              </h3>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                Schedule <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {upcomingTasks.map(task => (
                <div key={task.id} className="p-2 bg-gray-50 rounded-md text-sm">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySidebar;
