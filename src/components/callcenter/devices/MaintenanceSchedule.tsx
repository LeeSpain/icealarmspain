
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Device } from "../client-details/types";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";

interface MaintenanceScheduleProps {
  devices: Device[];
}

const MaintenanceSchedule: React.FC<MaintenanceScheduleProps> = ({ devices }) => {
  const [date, setDate] = useState<Date>();
  
  // Mock maintenance data
  const maintenanceTasks = [
    { 
      id: 1, 
      deviceId: devices[0]?.id || 1, 
      deviceModel: devices[0]?.model || "SOS Pendant", 
      clientId: devices[0]?.clientId || 1,
      scheduledDate: "2023-06-15", 
      status: "scheduled", 
      priority: "medium",
      technician: "John Smith"
    },
    { 
      id: 2, 
      deviceId: devices[1]?.id || 2, 
      deviceModel: devices[1]?.model || "Medical Dispenser", 
      clientId: devices[1]?.clientId || 2,
      scheduledDate: "2023-06-10", 
      status: "scheduled", 
      priority: "high",
      technician: "Lisa Johnson"
    },
    { 
      id: 3, 
      deviceId: devices[2]?.id || 3, 
      deviceModel: devices[2]?.model || "Health Wristband", 
      clientId: devices[2]?.clientId || 3,
      scheduledDate: "2023-06-05", 
      status: "completed", 
      priority: "low",
      technician: "Mark Davis"
    },
  ];
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Maintenance Schedule</h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
                size="sm"
              >
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
          
          <Button size="sm">
            Schedule Maintenance
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
              Maintenance Due Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">devices requiring maintenance in the next 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Completed This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">maintenance tasks completed this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              Overdue Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">devices with overdue maintenance</p>
          </CardContent>
        </Card>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>Client ID</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceTasks.map(task => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.deviceModel}</TableCell>
              <TableCell>{task.clientId}</TableCell>
              <TableCell>{task.scheduledDate}</TableCell>
              <TableCell>{task.technician}</TableCell>
              <TableCell>{getPriorityBadge(task.priority)}</TableCell>
              <TableCell>{getStatusBadge(task.status)}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info(`Viewing details for maintenance task ${task.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceSchedule;
