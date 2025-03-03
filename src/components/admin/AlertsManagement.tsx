
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Eye,
  MoreHorizontal,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Simulate fake data for alerts
const mockAlerts = [
  {
    id: "AL-1234",
    clientName: "Maria García",
    clientId: "CL-7891",
    deviceType: "SOS Pendant",
    deviceId: "DEV-45678",
    alertType: "Emergency",
    status: "Open",
    priority: "High",
    timestamp: "2023-09-15T14:23:00",
    location: "Barcelona, Spain",
    description: "SOS button activated",
    responders: ["Agent ID-123", "Local Emergency"],
    resolution: "",
    notes: "Client reported chest pain"
  },
  {
    id: "AL-1235",
    clientName: "John Smith",
    clientId: "CL-7892",
    deviceType: "Health Monitor",
    deviceId: "DEV-45679",
    alertType: "Health",
    status: "In Progress",
    priority: "Medium",
    timestamp: "2023-09-15T15:30:00",
    location: "Madrid, Spain",
    description: "Abnormal heart rate detected",
    responders: ["Agent ID-124"],
    resolution: "",
    notes: "Contacting family members"
  },
  {
    id: "AL-1236",
    clientName: "Anna Williams",
    clientId: "CL-7893",
    deviceType: "Medical Dispenser",
    deviceId: "DEV-45680",
    alertType: "Medication",
    status: "Resolved",
    priority: "Low",
    timestamp: "2023-09-15T08:15:00",
    location: "Valencia, Spain",
    description: "Missed medication dose",
    responders: ["Agent ID-125"],
    resolution: "Client contacted and took medication",
    notes: "Follow up scheduled"
  },
  {
    id: "AL-1237",
    clientName: "Thomas Brown",
    clientId: "CL-7894",
    deviceType: "SOS Pendant",
    deviceId: "DEV-45681",
    alertType: "Fall",
    status: "Open",
    priority: "High",
    timestamp: "2023-09-15T16:45:00",
    location: "Seville, Spain",
    description: "Fall detected",
    responders: ["Agent ID-126", "Local Emergency"],
    resolution: "",
    notes: "Ambulance dispatched"
  },
  {
    id: "AL-1238",
    clientName: "Sofia Rodriguez",
    clientId: "CL-7895",
    deviceType: "Health Monitor",
    deviceId: "DEV-45682",
    alertType: "Health",
    status: "Resolved",
    priority: "Medium",
    timestamp: "2023-09-14T11:20:00",
    location: "Malaga, Spain",
    description: "Low blood oxygen level",
    responders: ["Agent ID-127"],
    resolution: "False alarm, device calibration issue",
    notes: "Device replaced"
  },
  {
    id: "AL-1239",
    clientName: "James Wilson",
    clientId: "CL-7896",
    deviceType: "Medical Dispenser",
    deviceId: "DEV-45683",
    alertType: "Device",
    status: "In Progress",
    priority: "Low",
    timestamp: "2023-09-15T09:10:00",
    location: "Bilbao, Spain",
    description: "Low battery warning",
    responders: ["Agent ID-128"],
    resolution: "",
    notes: "Technician scheduled"
  },
  {
    id: "AL-1240",
    clientName: "Emma García",
    clientId: "CL-7897",
    deviceType: "SOS Pendant",
    deviceId: "DEV-45684",
    alertType: "Emergency",
    status: "Resolved",
    priority: "High",
    timestamp: "2023-09-14T22:05:00",
    location: "Granada, Spain",
    description: "SOS button activated",
    responders: ["Agent ID-129", "Local Emergency"],
    resolution: "Client needed assistance getting up, no injuries",
    notes: "Follow-up wellness check scheduled"
  }
];

// Simulate incident data
const mockIncidents = [
  {
    id: "INC-2345",
    title: "Multiple device failures in Barcelona region",
    status: "Open",
    priority: "High",
    affectedUsers: 23,
    affectedDevices: 23,
    createdAt: "2023-09-14T10:15:00",
    updatedAt: "2023-09-15T14:30:00",
    assignedTo: "Tech Team Alpha",
    description: "Multiple SOS Pendants reporting connectivity issues in the Barcelona region",
    actions: "Investigating network provider issues in the area"
  },
  {
    id: "INC-2346",
    title: "Medication dispenser software glitch",
    status: "In Progress",
    priority: "Medium",
    affectedUsers: 15,
    affectedDevices: 15,
    createdAt: "2023-09-15T09:30:00",
    updatedAt: "2023-09-15T13:45:00",
    assignedTo: "Software Team",
    description: "Medication dispensers with firmware version 2.3 are not syncing properly with the central system",
    actions: "Developing hotfix for the affected devices"
  },
  {
    id: "INC-2347",
    title: "False alarms from health monitors",
    status: "Resolved",
    priority: "Medium",
    affectedUsers: 8,
    affectedDevices: 8,
    createdAt: "2023-09-13T16:20:00",
    updatedAt: "2023-09-14T11:10:00",
    assignedTo: "Quality Assurance Team",
    description: "Series of false alarms from health monitors reporting abnormal heart rates",
    actions: "Calibration issue identified and fixed remotely"
  },
  {
    id: "INC-2348",
    title: "Call center phone system outage",
    status: "Resolved",
    priority: "Critical",
    affectedUsers: 150,
    affectedDevices: 0,
    createdAt: "2023-09-14T08:05:00",
    updatedAt: "2023-09-14T10:30:00",
    assignedTo: "IT Infrastructure Team",
    description: "Complete outage of the call center phone system affecting all incoming emergency calls",
    actions: "Failover system activated, root cause identified as power surge, systems restored"
  },
  {
    id: "INC-2349",
    title: "Mobile app login issues",
    status: "In Progress",
    priority: "Low",
    affectedUsers: 34,
    affectedDevices: 0,
    createdAt: "2023-09-15T11:45:00",
    updatedAt: "2023-09-15T14:20:00",
    assignedTo: "Mobile Development Team",
    description: "Users reporting inability to log in to the mobile app after the latest update",
    actions: "Investigating authentication service issues"
  }
];

// Emergency response time data for the chart
const responseTimeData = [
  { name: "Jan", responseTime: 2.8 },
  { name: "Feb", responseTime: 2.5 },
  { name: "Mar", responseTime: 2.2 },
  { name: "Apr", responseTime: 2.6 },
  { name: "May", responseTime: 2.4 },
  { name: "Jun", responseTime: 2.1 },
  { name: "Jul", responseTime: 1.9 },
  { name: "Aug", responseTime: 2.0 },
  { name: "Sep", responseTime: 2.3 },
];

const AlertsManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("active-alerts");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isAlertDetailsOpen, setIsAlertDetailsOpen] = useState(false);
  const [isIncidentDetailsOpen, setIsIncidentDetailsOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  
  // Filter alerts based on search term and status
  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = 
      alert.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.alertType.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "active-alerts") {
      return matchesSearch && (alert.status === "Open" || alert.status === "In Progress");
    } else if (selectedTab === "resolved-alerts") {
      return matchesSearch && alert.status === "Resolved";
    } else if (selectedTab === "all-alerts") {
      return matchesSearch;
    }
    return false;
  });

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "active-incidents") {
      return matchesSearch && (incident.status === "Open" || incident.status === "In Progress");
    } else if (selectedTab === "resolved-incidents") {
      return matchesSearch && incident.status === "Resolved";
    } else if (selectedTab === "all-incidents") {
      return matchesSearch;
    }
    return false;
  });

  const viewAlertDetails = (alert: any) => {
    setSelectedAlert(alert);
    setIsAlertDetailsOpen(true);
  };

  const viewIncidentDetails = (incident: any) => {
    setSelectedIncident(incident);
    setIsIncidentDetailsOpen(true);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-amber-100 text-amber-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      case "Critical":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Alerts & Incidents Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage alerts and system incidents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Configure Alerts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAlerts.filter(a => a.status !== "Resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockAlerts.filter(a => a.status === "Open").length} open, {mockAlerts.filter(a => a.status === "In Progress").length} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAlerts.filter(a => a.priority === "High" && a.status !== "Resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-ice-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↓ 0.2 min</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockIncidents.filter(i => i.status !== "Resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              System issues requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="active-alerts" onValueChange={setSelectedTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto">
                <TabsTrigger value="active-alerts">Active Alerts</TabsTrigger>
                <TabsTrigger value="resolved-alerts">Resolved Alerts</TabsTrigger>
                <TabsTrigger value="active-incidents">Active Incidents</TabsTrigger>
                <TabsTrigger value="resolved-incidents">Resolved Incidents</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="active-alerts" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.length > 0 ? (
                      filteredAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.id}</TableCell>
                          <TableCell>{alert.clientName}</TableCell>
                          <TableCell>{alert.alertType}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusClass(alert.status)}>
                              {alert.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getPriorityClass(alert.priority)}>
                              {alert.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(alert.timestamp).toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => viewAlertDetails(alert)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Assign</DropdownMenuItem>
                                  <DropdownMenuItem>Change Priority</DropdownMenuItem>
                                  <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View Client Details</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No active alerts found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="resolved-alerts" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.length > 0 ? (
                      filteredAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.id}</TableCell>
                          <TableCell>{alert.clientName}</TableCell>
                          <TableCell>{alert.alertType}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusClass(alert.status)}>
                              {alert.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getPriorityClass(alert.priority)}>
                              {alert.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(alert.timestamp).toLocaleString()}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => viewAlertDetails(alert)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No resolved alerts found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="active-incidents" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Affected Users</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.length > 0 ? (
                      filteredIncidents.map((incident) => (
                        <TableRow key={incident.id}>
                          <TableCell className="font-medium">{incident.id}</TableCell>
                          <TableCell>{incident.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusClass(incident.status)}>
                              {incident.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getPriorityClass(incident.priority)}>
                              {incident.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{incident.affectedUsers}</TableCell>
                          <TableCell>{new Date(incident.updatedAt).toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => viewIncidentDetails(incident)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Assign Team</DropdownMenuItem>
                                  <DropdownMenuItem>Change Priority</DropdownMenuItem>
                                  <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                                  <DropdownMenuItem>Create Update</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No active incidents found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="resolved-incidents" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Affected Users</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.length > 0 ? (
                      filteredIncidents.map((incident) => (
                        <TableRow key={incident.id}>
                          <TableCell className="font-medium">{incident.id}</TableCell>
                          <TableCell>{incident.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusClass(incident.status)}>
                              {incident.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getPriorityClass(incident.priority)}>
                              {incident.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{incident.affectedUsers}</TableCell>
                          <TableCell>{new Date(incident.updatedAt).toLocaleString()}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => viewIncidentDetails(incident)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No resolved incidents found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      {/* Alert Details Dialog */}
      <Dialog open={isAlertDetailsOpen} onOpenChange={setIsAlertDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Alert Details: {selectedAlert?.id}</DialogTitle>
            <DialogDescription>
              Complete information about this alert
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Client Information</h3>
                  <p className="text-base">{selectedAlert.clientName} (ID: {selectedAlert.clientId})</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Device Information</h3>
                  <p className="text-base">{selectedAlert.deviceType} (ID: {selectedAlert.deviceId})</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Alert Type</h3>
                  <p className="text-base">{selectedAlert.alertType}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status & Priority</h3>
                  <div className="flex space-x-2 mt-1">
                    <Badge className={getStatusClass(selectedAlert.status)}>{selectedAlert.status}</Badge>
                    <Badge className={getPriorityClass(selectedAlert.priority)}>{selectedAlert.priority}</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
                  <p className="text-base">{new Date(selectedAlert.timestamp).toLocaleString()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-base">{selectedAlert.location}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-base">{selectedAlert.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Responders</h3>
                  <ul className="list-disc pl-5 mt-1">
                    {selectedAlert.responders.map((responder: string, index: number) => (
                      <li key={index}>{responder}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Resolution</h3>
                  <p className="text-base">{selectedAlert.resolution || "Pending resolution"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="text-base">{selectedAlert.notes}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1">
                <CheckCircle className="h-4 w-4" />
                Mark as Resolved
              </Button>
              <Button variant="outline">View Client Profile</Button>
            </div>
            <Button variant="default" onClick={() => setIsAlertDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Incident Details Dialog */}
      <Dialog open={isIncidentDetailsOpen} onOpenChange={setIsIncidentDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Incident Details: {selectedIncident?.id}</DialogTitle>
            <DialogDescription>
              Complete information about this system incident
            </DialogDescription>
          </DialogHeader>
          
          {selectedIncident && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Title</h3>
                  <p className="text-base font-medium">{selectedIncident.title}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status & Priority</h3>
                  <div className="flex space-x-2 mt-1">
                    <Badge className={getStatusClass(selectedIncident.status)}>{selectedIncident.status}</Badge>
                    <Badge className={getPriorityClass(selectedIncident.priority)}>{selectedIncident.priority}</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created</h3>
                  <p className="text-base">{new Date(selectedIncident.createdAt).toLocaleString()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p className="text-base">{new Date(selectedIncident.updatedAt).toLocaleString()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
                  <p className="text-base">{selectedIncident.assignedTo}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-base">{selectedIncident.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Actions</h3>
                  <p className="text-base">{selectedIncident.actions}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Impact</h3>
                  <p className="text-base">Affecting {selectedIncident.affectedUsers} users and {selectedIncident.affectedDevices} devices</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1">
                <CheckCircle className="h-4 w-4" />
                Mark as Resolved
              </Button>
              <Button variant="outline">Create Update</Button>
            </div>
            <Button variant="default" onClick={() => setIsIncidentDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlertsManagement;
