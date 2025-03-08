
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings, Calendar as CalendarIcon, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { format } from "date-fns";

const MOCK_MAINTENANCE_SCHEDULES = [
  {
    id: 1,
    deviceId: "DEV-001",
    deviceModel: "IceAlarm Pro",
    client: "Avenida Hotels Group",
    scheduledDate: new Date(2023, 5, 15),
    technician: "Javier Rodriguez",
    status: "scheduled",
    priority: "medium",
    notes: "Regular maintenance check"
  },
  {
    id: 2,
    deviceId: "DEV-003",
    deviceModel: "IceAlarm Pro",
    client: "Valencia Care Centers",
    scheduledDate: new Date(2023, 5, 10),
    technician: "Maria Gonzalez",
    status: "completed",
    priority: "high",
    notes: "Firmware update required"
  },
  {
    id: 3,
    deviceId: "DEV-006",
    deviceModel: "IceAlarm Pro",
    client: "Costa del Sol Senior Living",
    scheduledDate: new Date(2023, 5, 20),
    technician: "Carlos Fernandez",
    status: "scheduled",
    priority: "high",
    notes: "Connectivity issues reported"
  },
  {
    id: 4,
    deviceId: "DEV-004",
    deviceModel: "IceAlarm Basic",
    client: "Andalusia Elderly Services",
    scheduledDate: new Date(2023, 5, 5),
    technician: "Ana Martinez",
    status: "overdue",
    priority: "low",
    notes: "Battery replacement"
  },
  {
    id: 5,
    deviceId: "DEV-002",
    deviceModel: "IceAlarm Standard",
    client: "Barcelona Senior Homes",
    scheduledDate: new Date(2023, 5, 12),
    technician: "Pablo Sanchez",
    status: "scheduled",
    priority: "medium",
    notes: "Sensor calibration"
  }
];

const DeviceMaintenanceSchedule: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [maintenanceSchedules, setMaintenanceSchedules] = useState(MOCK_MAINTENANCE_SCHEDULES);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Device Maintenance Schedule</h1>
          <p className="text-muted-foreground">Plan and manage maintenance activities for all devices</p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {maintenanceSchedules.filter(m => m.status === "scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Upcoming maintenance tasks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {maintenanceSchedules.filter(m => m.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {maintenanceSchedules.filter(m => m.status === "overdue").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Schedule</CardTitle>
          <CardDescription>
            All scheduled and completed maintenance tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device ID</TableHead>
                <TableHead>Device Model</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.deviceId}</TableCell>
                  <TableCell>{schedule.deviceModel}</TableCell>
                  <TableCell>{schedule.client}</TableCell>
                  <TableCell>{format(schedule.scheduledDate, "PPP")}</TableCell>
                  <TableCell>{schedule.technician}</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell>{getPriorityBadge(schedule.priority)}</TableCell>
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

export default DeviceMaintenanceSchedule;
