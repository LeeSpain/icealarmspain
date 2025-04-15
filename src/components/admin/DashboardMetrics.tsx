
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, AlertTriangle, Bell, ShieldCheck, Package, BarChart3, Globe, TrendingUp, BadgePercent, Coins, HelpCircle } from "lucide-react";
import { MetricCard } from "@/components/member/dashboard/MetricCard";

interface DashboardMetricsProps {
  data: any;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ data }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Executive Dashboard</h2>
        <p className="text-muted-foreground">Business KPIs and system performance metrics</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={data?.userStats?.total || "523"}
          icon={<Users size={18} className="text-blue-600" />}
          status="normal"
          description="Active member accounts"
          trend="Up 5% from last month"
          trendDirection="up"
        />
        
        <MetricCard
          title="Revenue"
          value={data?.financialStats?.revenue || "€24,850"}
          icon={<Coins size={18} className="text-emerald-600" />}
          status="normal"
          description="Monthly revenue"
          trend="Up 12% from last month"
          trendDirection="up"
        />
        
        <MetricCard
          title="Urgent Alerts"
          value={data?.alertStats?.urgent || "3"}
          icon={<AlertTriangle size={18} className="text-amber-500" />}
          status="alert"
          description="Require immediate attention"
        />
        
        <MetricCard
          title="System Health"
          value={data?.systemHealth?.status || "98%"}
          icon={<Activity size={18} className="text-emerald-600" />}
          status="normal"
          description="All systems operational"
        />
        
        <MetricCard
          title="New Notifications"
          value={data?.notifications?.unread || "12"}
          icon={<Bell size={18} className="text-blue-600" />}
          status="warning"
          description="Unread notifications"
        />
        
        <MetricCard
          title="Active Devices"
          value={data?.deviceStats?.active || "342"}
          icon={<ShieldCheck size={18} className="text-emerald-600" />}
          status="normal"
          description="Connected devices"
          trend="Up 8% from last month"
          trendDirection="up"
        />
        
        <MetricCard
          title="Market Share"
          value={data?.marketStats?.share || "28%"}
          icon={<Globe size={18} className="text-indigo-600" />}
          status="normal"
          description="Industry position"
          trend="Up 2% from last quarter"
          trendDirection="up"
        />
        
        <MetricCard
          title="Conversion Rate"
          value={data?.marketStats?.conversion || "3.8%"}
          icon={<BadgePercent size={18} className="text-purple-600" />}
          status="normal"
          description="Visitor to customer"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-gray-500" />
              Business Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[240px] flex items-center justify-center bg-gray-50 rounded-md border border-gray-100">
              <div className="text-center p-6">
                <TrendingUp className="h-10 w-10 mx-auto text-emerald-500 mb-2" />
                <p className="text-sm text-gray-500">Interactive chart visualization would appear here</p>
                <p className="text-xs text-gray-400 mt-1">Revenue, user growth, and market metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  New Members
                </span>
                <span className="font-medium">{data?.quickStats?.newMembers || "24"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-amber-500" />
                  Support Tickets
                </span>
                <span className="font-medium">{data?.quickStats?.tickets || "18"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2 text-emerald-500" />
                  Device Activations
                </span>
                <span className="font-medium">{data?.quickStats?.activations || "42"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Package className="h-4 w-4 mr-2 text-purple-500" />
                  Pending Orders
                </span>
                <span className="font-medium">{data?.quickStats?.orders || "7"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-blue-500" />
                  Active Sessions
                </span>
                <span className="font-medium">{data?.quickStats?.sessions || "156"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {(data?.recentActivities || [
                { user: "System", action: "Daily backup completed", time: "2 hours ago" },
                { user: "Admin", action: "Updated user roles", time: "3 hours ago" },
                { user: "System", action: "New device registered", time: "5 hours ago" },
                { user: "Support", action: "Ticket #1234 resolved", time: "Yesterday" },
                { user: "Admin", action: "Inventory updated", time: "2 days ago" }
              ]).map((activity: any, index: number) => (
                <div key={index} className="flex items-start border-b border-gray-100 pb-3 last:border-0">
                  <div className={`rounded-full p-2 mr-3 ${
                    activity.user === "System" ? "bg-blue-50 text-blue-600" : 
                    activity.user === "Admin" ? "bg-purple-50 text-purple-600" : 
                    "bg-emerald-50 text-emerald-600"
                  }`}>
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
        
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">System Status</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <Activity size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Server Uptime</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-emerald-600">99.98%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Bell size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alert System</p>
                    <p className="text-xs text-muted-foreground">Response time</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-blue-600">320ms</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Globe size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">API Services</p>
                    <p className="text-xs text-muted-foreground">Integration status</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-purple-600">Operational</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <ShieldCheck size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Security Status</p>
                    <p className="text-xs text-muted-foreground">Last scan</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-amber-600">No threats</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMetrics;
