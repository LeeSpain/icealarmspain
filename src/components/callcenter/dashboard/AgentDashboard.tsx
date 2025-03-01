
import React from "react";
import { 
  User, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users,
  Calendar,
  BarChart3,
  MessageSquare,
  TicketIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { mockCallData } from "../stats/mock-data";
import { mockTickets } from "../ticketing/mock-data";

const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(currentDate);
  
  // Filter tickets for pending and critical tickets
  const pendingTickets = mockTickets.filter(ticket => ticket.status === 'open' || ticket.status === 'in-progress');
  const criticalTickets = mockTickets.filter(ticket => ticket.priority === 'high');
  
  // Mock data for recent calls
  const recentCalls = [
    { id: 1, client: "Maria García", time: "10:32 AM", duration: "8m 45s", status: "completed" },
    { id: 2, client: "John Stevenson", time: "9:15 AM", duration: "12m 20s", status: "completed" },
    { id: 3, client: "Sarah Williams", time: "Yesterday", duration: "5m 10s", status: "missed" },
  ];
  
  // Mock data for upcoming tasks
  const upcomingTasks = [
    { id: 1, task: "Follow up with Maria García", time: "2:00 PM", priority: "high" },
    { id: 2, task: "Call John Stevenson about device setup", time: "3:30 PM", priority: "medium" },
    { id: 3, task: "Team meeting", time: "4:00 PM", priority: "medium" },
  ];
  
  // Calculate some metrics from mockCallData
  const totalCalls = mockCallData.dailyCalls.data.reduce((sum, num) => sum + num, 0);
  const avgResponseTime = mockCallData.responseTime.reduce((sum, item) => sum + item.value, 0) / mockCallData.responseTime.length;
  
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-l-4 border-blue-500">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.name || 'Agent'}</h2>
              <p className="text-muted-foreground">{formattedDate}</p>
              <div className="flex items-center mt-2">
                <Badge className="bg-green-100 text-green-800 mr-2">Online</Badge>
                <span className="text-sm text-muted-foreground">Agent ID: {user?.id || 'AG-324'}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="mr-2 h-4 w-4" />
                Set Status
              </Button>
              <Button size="sm" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Calls This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{totalCalls}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">{avgResponseTime.toFixed(1)}m</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              -2.5m from target
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TicketIcon className="h-5 w-5 text-purple-500 mr-2" />
              <div className="text-2xl font-bold">{pendingTickets.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {criticalTickets.length} high priority
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">92%</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Pending Alerts
            </CardTitle>
            <CardDescription>
              Tickets requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTickets.slice(0, 3).map(ticket => (
                <div key={ticket.id} className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{ticket.title}</h3>
                    <Badge variant={ticket.priority === 'high' ? 'destructive' : 'outline'}>
                      {ticket.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Client: {ticket.client}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-muted-foreground">
                      Created: {ticket.createdAt}
                    </span>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              
              {pendingTickets.length === 0 && (
                <div className="text-center py-6">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-200" />
                  <h3 className="mt-2 font-medium">All clear!</h3>
                  <p className="text-sm text-muted-foreground">
                    No pending alerts at this time
                  </p>
                </div>
              )}
              
              {pendingTickets.length > 3 && (
                <Button variant="outline" className="w-full">
                  View All {pendingTickets.length} Tickets
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity & Upcoming */}
        <div className="space-y-6">
          {/* Recent Calls */}
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
          
          {/* Upcoming Tasks */}
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
      </div>
      
      {/* Device Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Device Monitoring
          </CardTitle>
          <CardDescription>
            Recent device alerts from monitored clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Signal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Battery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Maria García</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">SOS Pendant</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">10 min ago</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">92%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button size="sm" variant="outline">Details</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">John Stevenson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Medical Dispenser</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">1 hour ago</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">45%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button size="sm">Contact</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Sarah Williams</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Health Wristband</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge className="bg-red-100 text-red-800">Alert</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">15 min ago</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">78%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <Phone className="mr-2 h-3 w-3" />
                      Call Now
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Call to Action */}
      <div className="flex justify-between items-center p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div>
          <h3 className="font-medium">Need assistance?</h3>
          <p className="text-sm text-muted-foreground">Contact your supervisor for help or access additional resources</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
          <Button size="sm">
            <Users className="mr-2 h-4 w-4" />
            Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
