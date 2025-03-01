
import React from "react";
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
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AgentDashboard: React.FC = () => {
  // Mock data for the Call Center Agent dashboard
  const devices = [
    { id: 1, name: "SOS Pendant - Room 103", status: "Active", lastChecked: "Yesterday", battery: "92%" },
    { id: 2, name: "Fall Detector - Common Area", status: "Active", lastChecked: "Today", battery: "78%" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-orange-50 border-orange-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-2">Welcome, Call Center Agent!</h2>
              <p className="text-amber-800">
                Manage your ICE Alarm devices and explore new products to enhance your safety system.
              </p>
              
              <div className="flex gap-4 mt-6">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Explore Products
                </Button>
                <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Test Alarm
                </Button>
                <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
            
            <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Active Devices</p>
                <h3 className="text-4xl font-bold">2</h3>
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
                <h3 className="text-4xl font-bold">All Clear</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Next Check-up</p>
                <h3 className="text-4xl font-bold">17/03/2025</h3>
                <p className="text-amber-500 text-sm mt-1">Needs attention</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <CalendarClock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <p className="text-muted-foreground mt-2">Manage your connected ICE Alarm devices</p>
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
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  {device.status}
                </div>
                <div>{device.lastChecked}</div>
                <div>{device.battery}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
