
import React from "react";
import {
  BarChart3,
  ShoppingCart,
  MessageSquare,
  Smartphone,
  DollarSign,
  Settings
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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            <Progress className="mt-3" value={75} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+5.4% from last month</p>
            <Progress className="mt-3" value={65} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.activeDevices}</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
            <Progress className="mt-3" value={85} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">-2.3% from last week</p>
            <Progress className="mt-3" value={40} />
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
              <div className="space-y-4">
                {dashboardMetrics.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start pb-4 border-b last:border-0">
                    <div className="mr-4 mt-1">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {activity.type === "New Order" && <ShoppingCart className="h-4 w-4 text-primary" />}
                        {activity.type === "Support" && <MessageSquare className="h-4 w-4 text-primary" />}
                        {activity.type === "Device" && <Smartphone className="h-4 w-4 text-primary" />}
                        {activity.type === "Payment" && <DollarSign className="h-4 w-4 text-primary" />}
                        {activity.type === "Maintenance" && <Settings className="h-4 w-4 text-primary" />}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMetrics;
