
import React from "react";
import {
  BarChart3,
  ShoppingCart,
  MessageSquare,
  Smartphone,
  DollarSign,
  Settings,
  User,
  AlertTriangle,
  FileText
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

// Dashboard metrics interface
interface MetricsData {
  totalRevenue: string;
  totalCustomers: string;
  activeDevices: string;
  pendingOrders: string;
  monthlyGrowth: string;
  customerSatisfaction: string;
  revenueByProduct: {
    name: string;
    value: number;
  }[];
  recentActivities: {
    id: number;
    type: string;
    description: string;
    time: string;
  }[];
}

interface DashboardMetricsProps {
  dashboardMetrics: MetricsData;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ dashboardMetrics }) => {
  const { user } = useAuth();
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);
  
  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "New Order":
      case "Order":
        return <ShoppingCart className="h-4 w-4 text-primary" />;
      case "Support":
        return <MessageSquare className="h-4 w-4 text-primary" />;
      case "Device":
        return <Smartphone className="h-4 w-4 text-primary" />;
      case "Payment":
      case "Finance":
        return <DollarSign className="h-4 w-4 text-primary" />;
      case "Maintenance":
      case "System":
        return <Settings className="h-4 w-4 text-primary" />;
      case "User":
      case "Admin":
        return <User className="h-4 w-4 text-primary" />;
      case "Alert":
        return <AlertTriangle className="h-4 w-4 text-primary" />;
      case "Report":
        return <FileText className="h-4 w-4 text-primary" />;
      default:
        return <BarChart3 className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-ice-800">Welcome, {user?.displayName || user?.email?.split('@')[0] || 'Admin'}</h2>
              <p className="text-muted-foreground">{formattedDate}</p>
              <p className="mt-2">Your admin dashboard is ready. This is where you'll manage all aspects of IceAlarm España.</p>
            </div>
            <div className="flex items-center justify-end">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">View Reports</Button>
                <Button size="sm">Add New Client</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">{dashboardMetrics.monthlyGrowth} from last month</p>
            <Progress className="mt-3" value={0} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Add your first customer</p>
            <Progress className="mt-3" value={0} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.activeDevices}</div>
            <p className="text-xs text-muted-foreground">Register your first device</p>
            <Progress className="mt-3" value={0} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">No pending orders</p>
            <Progress className="mt-3" value={0} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Product revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              {dashboardMetrics.revenueByProduct.length > 0 ? (
                <div className="w-full max-w-md">
                  {dashboardMetrics.revenueByProduct.map((product, i) => (
                    <div key={product.name} className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{product.name}</span>
                        <span className="text-sm font-medium">{product.value}%</span>
                      </div>
                      <Progress value={product.value} className="h-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No revenue data available yet</p>
                  <p className="text-sm mt-2">Revenue statistics will appear as sales are recorded</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              {dashboardMetrics.recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {dashboardMetrics.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start pb-4 border-b last:border-0">
                      <div className="mr-4 mt-1">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mb-4 text-gray-300" />
                  <p>No activity recorded yet</p>
                  <p className="text-sm mt-2">Activities will appear here as you use the system</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      {/* Getting Started Card */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Quick actions to set up your IceAlarm España system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <User className="mr-2 h-4 w-4" />
                Add Your First Client
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Register a new client to start monitoring their devices</p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {}}>Add Client</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Smartphone className="mr-2 h-4 w-4" />
                Register a Device
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Add a new IceAlarm device to your inventory</p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {}}>Add Device</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Configure System Settings
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Set up your preferences and system configurations</p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {}}>Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
