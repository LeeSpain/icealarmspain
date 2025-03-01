
import React, { useState } from "react";
import {
  Bell,
  Settings,
  Activity,
  Heart,
  CheckCircle2,
  AlertTriangle,
  CalendarClock,
  Cog,
  LogOut,
  Phone,
  HeadsetIcon,
  Clock,
  MessageSquare,
  ArrowUpRight,
  Users,
  Calendar,
  PhoneCall,
  BadgeAlert,
  Database,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const AgentDashboard: React.FC = () => {
  const { toast } = useToast();
  const [callStatus, setCallStatus] = useState<"available" | "busy" | "offline">("available");
  
  // Mock data for the Call Center Agent dashboard
  const devices = [
    { id: 1, name: "SOS Pendant - Room 103", status: "Active", lastChecked: "Yesterday", battery: "92%" },
    { id: 2, name: "Fall Detector - Common Area", status: "Active", lastChecked: "Today", battery: "78%" },
    { id: 3, name: "Motion Sensor - Entrance", status: "Offline", lastChecked: "3 days ago", battery: "45%" },
    { id: 4, name: "Health Monitor - Room 215", status: "Active", lastChecked: "Today", battery: "85%" },
  ];

  const recentCalls = [
    { id: 1, client: "Maria Gonzalez", time: "10:15 AM", duration: "4m 30s", type: "Incoming", status: "Completed" },
    { id: 2, client: "Juan Perez", time: "09:45 AM", duration: "2m 15s", type: "Outgoing", status: "Completed" },
    { id: 3, client: "Ana Martinez", time: "Yesterday", duration: "8m 02s", type: "Incoming", status: "Transferred" },
  ];

  const upcomingTasks = [
    { id: 1, title: "Follow-up call: Maria Gonzalez", time: "2:30 PM", priority: "High" },
    { id: 2, title: "Device check: La Residencia facility", time: "4:00 PM", priority: "Medium" },
    { id: 3, title: "Team meeting", time: "Tomorrow, 9:00 AM", priority: "Medium" },
  ];

  const pendingAlerts = [
    { id: 1, client: "Carlos Rodriguez", device: "Health Monitor", time: "15 min ago", type: "High Blood Pressure" },
    { id: 2, client: "Elena Sanchez", device: "SOS Pendant", time: "1 hour ago", type: "Fall Detected" },
  ];

  const handleStatusChange = (status: "available" | "busy" | "offline") => {
    setCallStatus(status);
    toast({
      title: "Status Updated",
      description: `You are now ${status}`,
    });
  };

  const handleTestAlarm = () => {
    toast({
      title: "Test Alarm Triggered",
      description: "The test alarm has been successfully triggered",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-orange-50 border-orange-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-2">Welcome, Call Center Agent!</h2>
              <p className="text-amber-800">
                Manage your ICE Alarm devices and provide assistance to clients.
              </p>
              
              <div className="flex gap-4 mt-6">
                <Button 
                  onClick={handleTestAlarm}
                  variant="outline" 
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Test Alarm
                </Button>
                <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="rounded-full p-3 bg-white shadow-sm border border-gray-100">
                <Badge className={
                  callStatus === "available" ? "bg-green-500" :
                  callStatus === "busy" ? "bg-orange-500" : "bg-gray-500"
                }>
                  {callStatus === "available" ? "Available" :
                   callStatus === "busy" ? "Busy" : "Offline"}
                </Badge>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  size="sm" 
                  className={`${callStatus === "available" ? "bg-green-600 hover:bg-green-700" : "bg-green-200"}`}
                  onClick={() => handleStatusChange("available")}
                >
                  Available
                </Button>
                <Button 
                  size="sm" 
                  className={`${callStatus === "busy" ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-200"}`}
                  onClick={() => handleStatusChange("busy")}
                >
                  Busy
                </Button>
                <Button 
                  size="sm" 
                  className={`${callStatus === "offline" ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-200"}`}
                  onClick={() => handleStatusChange("offline")}
                >
                  Offline
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Active Devices</p>
                <h3 className="text-3xl font-bold">24</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Alert Status</p>
                <h3 className="text-3xl font-bold">2 Pending</h3>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <BadgeAlert className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Today's Calls</p>
                <h3 className="text-3xl font-bold">12</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <PhoneCall className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Active Clients</p>
                <h3 className="text-3xl font-bold">87</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Alerts */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500 h-5 w-5" />
              <CardTitle className="text-xl">Pending Alerts</CardTitle>
            </div>
            <Badge variant="destructive">{pendingAlerts.length} Alerts</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {pendingAlerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No pending alerts</div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-4 bg-muted/50 p-4 text-sm font-medium">
                <div>Client</div>
                <div>Device</div>
                <div>Time</div>
                <div>Action</div>
              </div>
              <Separator />
              {pendingAlerts.map((alert) => (
                <div key={alert.id} className="grid grid-cols-4 p-4 text-sm items-center border-t first:border-t-0">
                  <div className="font-medium">{alert.client}</div>
                  <div>{alert.device}</div>
                  <div>{alert.time}</div>
                  <div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Respond Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Calls */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Phone className="text-blue-500 h-5 w-5" />
              <CardTitle className="text-xl">Recent Calls</CardTitle>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              View All Calls
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
              <div>Client</div>
              <div>Time</div>
              <div>Duration</div>
              <div>Type</div>
              <div>Status</div>
            </div>
            <Separator />
            {recentCalls.map((call) => (
              <div key={call.id} className="grid grid-cols-5 p-4 text-sm items-center border-t first:border-t-0">
                <div className="font-medium">{call.client}</div>
                <div>{call.time}</div>
                <div>{call.duration}</div>
                <div className="flex items-center">
                  {call.type === "Incoming" ? (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Incoming
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Outgoing
                    </Badge>
                  )}
                </div>
                <div>{call.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks and Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <Calendar className="text-purple-500 h-5 w-5" />
              <CardTitle className="text-xl">Upcoming Tasks</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-4 p-3 rounded-lg border">
                  <div className={`rounded-full p-2 ${
                    task.priority === "High" ? "bg-red-100" : 
                    task.priority === "Medium" ? "bg-amber-100" : "bg-blue-100"
                  }`}>
                    <Clock className={`h-4 w-4 ${
                      task.priority === "High" ? "text-red-500" : 
                      task.priority === "Medium" ? "text-amber-500" : "text-blue-500"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{task.title}</h4>
                      <Badge variant="outline" className={
                        task.priority === "High" ? "bg-red-50 border-red-200 text-red-700" : 
                        task.priority === "Medium" ? "bg-amber-50 border-amber-200 text-amber-700" : 
                        "bg-blue-50 border-blue-200 text-blue-700"
                      }>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" /> View Full Schedule
            </Button>
          </CardFooter>
        </Card>

        {/* Devices List */}
        <Card>
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="text-orange-500 h-5 w-5" />
                <CardTitle className="text-xl">My Devices</CardTitle>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Cog className="h-4 w-4" />
                Manage Devices
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-4 bg-muted/50 p-4 text-sm font-medium">
                <div>Device</div>
                <div>Status</div>
                <div>Last Checked</div>
                <div>Battery</div>
              </div>
              <Separator />
              {devices.map((device) => (
                <div key={device.id} className="grid grid-cols-4 p-4 text-sm items-center border-t first:border-t-0">
                  <div>{device.name}</div>
                  <div className="flex items-center">
                    {device.status === "Active" ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        {device.status}
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                        {device.status}
                      </>
                    )}
                  </div>
                  <div>{device.lastChecked}</div>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          parseInt(device.battery) > 70 ? "bg-green-500" : 
                          parseInt(device.battery) > 30 ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: device.battery }}
                      ></div>
                    </div>
                    {device.battery}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;
