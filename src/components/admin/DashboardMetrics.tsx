
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, AlertTriangle, Bell, ShieldCheck, Package } from "lucide-react";
import { MetricCard } from "@/components/member/dashboard/MetricCard";

interface DashboardMetricsProps {
  data: any;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">System metrics and key performance indicators</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Users"
          value={data?.userStats?.total || "523"}
          icon={<Users size={18} />}
          status="normal"
          description="Active member accounts"
          trend="Up 5% from last month"
          trendDirection="up"
        />
        
        <MetricCard
          title="Urgent Alerts"
          value={data?.alertStats?.urgent || "3"}
          icon={<AlertTriangle size={18} />}
          status="alert"
          description="Require immediate attention"
        />
        
        <MetricCard
          title="System Health"
          value={data?.systemHealth?.status || "98%"}
          icon={<Activity size={18} />}
          status="normal"
          description="All systems operational"
        />
        
        <MetricCard
          title="New Notifications"
          value={data?.notifications?.unread || "12"}
          icon={<Bell size={18} />}
          status="warning"
          description="Unread notifications"
        />
        
        <MetricCard
          title="Active Devices"
          value={data?.deviceStats?.active || "342"}
          icon={<ShieldCheck size={18} />}
          status="normal"
          description="Connected devices"
          trend="Up 8% from last month"
          trendDirection="up"
        />
        
        <MetricCard
          title="Inventory Status"
          value={data?.inventory?.status || "Good"}
          icon={<Package size={18} />}
          status="normal"
          description="Stock levels adequate"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {(data?.recentActivities || [
                { user: "System", action: "Daily backup completed", time: "2 hours ago" },
                { user: "Admin", action: "Updated user roles", time: "3 hours ago" },
                { user: "System", action: "New device registered", time: "5 hours ago" },
                { user: "Support", action: "Ticket #1234 resolved", time: "Yesterday" },
                { user: "Admin", action: "Inventory updated", time: "2 days ago" }
              ]).map((activity: any, index: number) => (
                <div key={index} className="flex items-start border-b border-gray-100 pb-3 last:border-0">
                  <div className="bg-ice-50 text-ice-600 p-2 rounded-full mr-3">
                    {activity.user === "System" ? 
                      <ShieldCheck size={16} /> : 
                      <Users size={16} />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex text-xs text-muted-foreground mt-1">
                      <span className="font-medium mr-2">{activity.user}</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Members</span>
                <span className="font-medium">{data?.quickStats?.newMembers || "24"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Support Tickets</span>
                <span className="font-medium">{data?.quickStats?.tickets || "18"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Device Activations</span>
                <span className="font-medium">{data?.quickStats?.activations || "42"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending Orders</span>
                <span className="font-medium">{data?.quickStats?.orders || "7"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Sessions</span>
                <span className="font-medium">{data?.quickStats?.sessions || "156"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMetrics;
