
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Signal, WifiOff, AlertTriangle, Activity, Battery, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// This data would ideally come from your backend
const data = [
  { name: "Mon", active: 180, offline: 20, warning: 35 },
  { name: "Tue", active: 200, offline: 15, warning: 25 },
  { name: "Wed", active: 210, offline: 25, warning: 30 },
  { name: "Thu", active: 190, offline: 30, warning: 40 },
  { name: "Fri", active: 240, offline: 10, warning: 20 },
  { name: "Sat", active: 230, offline: 20, warning: 15 },
  { name: "Sun", active: 255, offline: 5, warning: 10 },
];

const deviceTypeData = [
  { name: "IceAlarm Pro", value: 55 },
  { name: "IceAlarm Standard", value: 30 },
  { name: "IceAlarm Basic", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const batteryData = [
  { range: "90-100%", count: 80 },
  { range: "70-89%", count: 45 },
  { range: "50-69%", count: 30 },
  { range: "30-49%", count: 15 },
  { range: "0-29%", count: 10 },
];

const recentAlerts = [
  { id: 1, deviceId: "DEV-006", status: "warning", message: "Low battery (28%)", time: "10 minutes ago" },
  { id: 2, deviceId: "DEV-003", status: "offline", message: "Device disconnected", time: "1 hour ago" },
  { id: 3, deviceId: "DEV-012", status: "warning", message: "Weak signal strength", time: "3 hours ago" },
  { id: 4, deviceId: "DEV-008", status: "error", message: "SOS button triggered", time: "5 hours ago" },
  { id: 5, deviceId: "DEV-015", status: "warning", message: "Temperature sensor issue", time: "1 day ago" },
];

const DeviceMonitoringDashboard: React.FC = () => {
  const [deviceStatuses] = useState({
    active: 243,
    offline: 17,
    warning: 25,
    error: 5,
    total: 290
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "offline":
        return <WifiOff className="h-4 w-4 text-gray-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Signal className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "offline":
        return <Badge className="bg-gray-100 text-gray-800">Offline</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Device Monitoring</h1>
          <p className="text-muted-foreground">Real-time monitoring of all connected devices</p>
        </div>
        <Button className="bg-ice-600 hover:bg-ice-700">
          <Activity className="mr-2 h-4 w-4" />
          Live View
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Active Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceStatuses.active}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((deviceStatuses.active / deviceStatuses.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <WifiOff className="mr-2 h-4 w-4 text-gray-500" />
              Offline Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceStatuses.offline}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((deviceStatuses.offline / deviceStatuses.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
              Warning State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceStatuses.warning}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((deviceStatuses.warning / deviceStatuses.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
              Error State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceStatuses.error}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((deviceStatuses.error / deviceStatuses.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-2 bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Device Status Over Time</CardTitle>
            <CardDescription>
              Weekly overview of device status changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="active" stroke="#10b981" name="Active" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="offline" stroke="#6b7280" name="Offline" />
                  <Line type="monotone" dataKey="warning" stroke="#f59e0b" name="Warning" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Device Type Distribution</CardTitle>
            <CardDescription>
              Breakdown by device model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Battery className="mr-2 h-5 w-5" />
              Battery Level Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={batteryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
            Recent Alerts
          </CardTitle>
          <CardDescription>
            Latest alerts and warnings from monitored devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.deviceId}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getStatusIcon(alert.status)}
                      <span className="ml-2">{getStatusBadge(alert.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceMonitoringDashboard;
