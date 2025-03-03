
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Bell, Check, Filter, Info, Search, X } from "lucide-react";
import { toast } from "react-toastify";

// Mock data for alerts
const mockAlerts = [
  { 
    id: "ALT-1023", 
    deviceId: "DEV-5421", 
    type: "SOS", 
    priority: "high", 
    status: "active", 
    timestamp: "2023-08-12T14:22:36", 
    location: "Madrid, Spain",
    client: "Maria García",
    description: "SOS button pressed twice. No response from client."
  },
  { 
    id: "ALT-1022", 
    deviceId: "DEV-2187", 
    type: "Fall", 
    priority: "high", 
    status: "active", 
    timestamp: "2023-08-12T13:45:19", 
    location: "Barcelona, Spain",
    client: "Juan Martínez",
    description: "Fall detected. Client confirmed emergency via call."
  },
  { 
    id: "ALT-1021", 
    deviceId: "DEV-3340", 
    type: "Inactivity", 
    priority: "medium", 
    status: "active", 
    timestamp: "2023-08-12T11:20:05", 
    location: "Valencia, Spain",
    client: "Ana Rodríguez",
    description: "No movement detected for 12 hours."
  },
  { 
    id: "ALT-1020", 
    deviceId: "DEV-1195", 
    type: "Battery", 
    priority: "low", 
    status: "resolved", 
    timestamp: "2023-08-12T10:17:42", 
    location: "Sevilla, Spain",
    client: "Carlos López",
    description: "Device battery below 10%."
  },
  { 
    id: "ALT-1019", 
    deviceId: "DEV-4233", 
    type: "Connection", 
    priority: "medium", 
    status: "resolved", 
    timestamp: "2023-08-12T09:05:31", 
    location: "Málaga, Spain",
    client: "Elena Fernández",
    description: "Device lost connection for more than 1 hour."
  },
  { 
    id: "ALT-1018", 
    deviceId: "DEV-5102", 
    type: "SOS", 
    priority: "high", 
    status: "resolved", 
    timestamp: "2023-08-11T22:42:18", 
    location: "Zaragoza, Spain",
    client: "David Sánchez",
    description: "SOS button pressed. Client confirmed false alarm."
  },
  { 
    id: "ALT-1017", 
    deviceId: "DEV-3871", 
    type: "Geofence", 
    priority: "medium", 
    status: "resolved", 
    timestamp: "2023-08-11T18:30:54", 
    location: "Bilbao, Spain",
    client: "Sofía Gómez",
    description: "Client left defined safe area."
  },
];

// Mock data for incidents
const mockIncidents = [
  {
    id: "INC-423",
    alertId: "ALT-992",
    client: "Luis Torres",
    status: "resolved",
    priority: "high",
    responders: ["Agent 24", "Medical Team 7"],
    openedAt: "2023-08-10T15:26:39",
    closedAt: "2023-08-10T16:42:12",
    resolution: "Medical assistance provided. Client hospitalized."
  },
  {
    id: "INC-422",
    alertId: "ALT-987",
    client: "Carmen Ruiz",
    status: "resolved",
    priority: "medium",
    responders: ["Agent 17"],
    openedAt: "2023-08-09T22:14:28",
    closedAt: "2023-08-09T22:35:47",
    resolution: "False alarm confirmed by family member."
  },
  {
    id: "INC-421",
    alertId: "ALT-981",
    client: "Antonio Morales",
    status: "resolved",
    priority: "high",
    responders: ["Agent 31", "Police Unit 8", "Medical Team 3"],
    openedAt: "2023-08-09T14:02:17",
    closedAt: "2023-08-09T15:18:33",
    resolution: "Emergency services provided assistance. Client stable."
  },
  {
    id: "INC-420",
    alertId: "ALT-979",
    client: "Pablo Serrano",
    status: "resolved",
    priority: "low",
    responders: ["Agent 12"],
    openedAt: "2023-08-09T10:45:09",
    closedAt: "2023-08-09T11:02:51",
    resolution: "Device battery replaced by family member."
  },
  {
    id: "INC-419",
    alertId: "ALT-974",
    client: "Isabel Castro",
    status: "resolved",
    priority: "medium",
    responders: ["Agent 28", "Technical Team 2"],
    openedAt: "2023-08-08T19:23:05",
    closedAt: "2023-08-08T20:15:40",
    resolution: "Connection issue resolved remotely."
  },
];

const AlertsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredAlerts = mockAlerts.filter(alert => {
    return (
      (searchTerm === "" || 
       alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       alert.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
       alert.deviceId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || alert.status === statusFilter) &&
      (priorityFilter === "all" || alert.priority === priorityFilter) &&
      (typeFilter === "all" || alert.type === typeFilter)
    );
  });

  const handleResolveAlert = (alertId: string) => {
    toast.success(`Alert ${alertId} marked as resolved`);
  };

  const handleEscalateAlert = (alertId: string) => {
    toast.info(`Alert ${alertId} escalated to emergency services`);
  };

  const handleAssignAlert = (alertId: string) => {
    toast.info(`Alert ${alertId} assigned to available agent`);
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Alerts Management</h1>
          <p className="text-muted-foreground">Monitor and respond to system alerts and incidents</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            <span>Active Alerts: {mockAlerts.filter(a => a.status === "active").length}</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="incidents">Incident History</TabsTrigger>
          <TabsTrigger value="protocols">Emergency Protocols</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>
                Real-time alerts requiring attention. {mockAlerts.filter(a => a.status === "active").length} active alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="SOS">SOS</SelectItem>
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Inactivity">Inactivity</SelectItem>
                      <SelectItem value="Battery">Battery</SelectItem>
                      <SelectItem value="Connection">Connection</SelectItem>
                      <SelectItem value="Geofence">Geofence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredAlerts.filter(a => a.status === "active").length === 0 ? (
                <div className="text-center py-8">
                  <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No active alerts match your filters</h3>
                  <p className="text-muted-foreground mt-1">Try changing your search or filter criteria</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAlerts
                    .filter(alert => alert.status === "active")
                    .map(alert => (
                      <Alert key={alert.id} className="border-l-4 border-red-500">
                        <div className="flex justify-between">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                            <div>
                              <AlertTitle className="flex items-center gap-2">
                                {alert.id} - {alert.type} Alert
                                <Badge className={`${getPriorityBadgeColor(alert.priority)} text-white`}>
                                  {alert.priority}
                                </Badge>
                              </AlertTitle>
                              <AlertDescription className="mt-1">
                                <div className="text-sm text-muted-foreground mb-1">
                                  {new Date(alert.timestamp).toLocaleString()} | {alert.location} | Client: {alert.client}
                                </div>
                                <p className="font-medium">{alert.description}</p>
                              </AlertDescription>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAssignAlert(alert.id)}
                            >
                              Assign
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEscalateAlert(alert.id)}
                            >
                              Escalate
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </Alert>
                    ))
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Alerts</CardTitle>
              <CardDescription>Complete history of system alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No alerts match your search criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAlerts.map(alert => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.id}</TableCell>
                          <TableCell>{alert.type}</TableCell>
                          <TableCell>{alert.client}</TableCell>
                          <TableCell>
                            <Badge
                              variant={alert.status === "active" ? "destructive" : "outline"}
                            >
                              {alert.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getPriorityBadgeColor(alert.priority)} text-white`}>
                              {alert.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(alert.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                                View
                              </Button>
                              {alert.status === "active" && (
                                <Button 
                                  size="sm" 
                                  variant="secondary" 
                                  className="h-8 px-2 text-xs"
                                  onClick={() => handleResolveAlert(alert.id)}
                                >
                                  Resolve
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredAlerts.length} of {mockAlerts.length} alerts
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Incident History</CardTitle>
              <CardDescription>Record of all resolved incidents and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Related Alert</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Responders</TableHead>
                      <TableHead>Opened</TableHead>
                      <TableHead>Resolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockIncidents.map(incident => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">{incident.id}</TableCell>
                        <TableCell>{incident.alertId}</TableCell>
                        <TableCell>{incident.client}</TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityBadgeColor(incident.priority)} text-white`}>
                            {incident.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            {incident.responders.join(", ")}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(incident.openedAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={incident.resolution}>
                          {incident.resolution}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {mockIncidents.length} of {mockIncidents.length} incidents
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="protocols">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Protocols</CardTitle>
              <CardDescription>
                Standard procedures for different types of alerts and emergencies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <div className="bg-red-500 text-white p-1.5 rounded-full">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  SOS Button Protocol
                </h3>
                <ol className="space-y-2 ml-8 list-decimal">
                  <li>Immediately attempt contact with the client via the device</li>
                  <li>If no response within 30 seconds, call emergency contacts</li>
                  <li>If still no response, dispatch emergency services to the client's location</li>
                  <li>Maintain open communication line until situation is resolved</li>
                  <li>Document all actions taken and the final resolution</li>
                </ol>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <div className="bg-red-500 text-white p-1.5 rounded-full">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  Fall Detection Protocol
                </h3>
                <ol className="space-y-2 ml-8 list-decimal">
                  <li>Attempt immediate contact with the client via the device</li>
                  <li>If client confirms the fall, assess severity and need for medical assistance</li>
                  <li>If no response or client requests help, notify emergency contacts</li>
                  <li>For severe falls or if client is in distress, dispatch emergency services</li>
                  <li>Follow up within 24 hours to check on client's condition</li>
                </ol>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <div className="bg-amber-500 text-white p-1.5 rounded-full">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  Inactivity Alert Protocol
                </h3>
                <ol className="space-y-2 ml-8 list-decimal">
                  <li>Check system logs for any recent activity or technical issues</li>
                  <li>Call the client's primary phone number</li>
                  <li>Contact emergency contacts if no response from client</li>
                  <li>For extended inactivity (>24 hours), consider wellness check</li>
                  <li>Document the cause of inactivity and resolution</li>
                </ol>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <div className="bg-blue-500 text-white p-1.5 rounded-full">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  Device Technical Issue Protocol
                </h3>
                <ol className="space-y-2 ml-8 list-decimal">
                  <li>Conduct remote diagnostics of the device</li>
                  <li>Attempt to resolve connection issues remotely if applicable</li>
                  <li>For battery issues, contact client or caregiver to charge or replace batteries</li>
                  <li>Schedule technical service if remote resolution is not possible</li>
                  <li>Provide temporary replacement device if necessary</li>
                </ol>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Download All Protocols</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsManagement;
