
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  Shield,
  Calendar,
  Eye,
  Edit,
  Trash2,
  FileText,
  AlertCircle,
  Bell,
} from "lucide-react";

// Mock client data
const mockClients = [
  {
    id: "CL-1001",
    name: "Maria García",
    email: "maria.garcia@example.com",
    phone: "+34 612 345 678",
    address: "Calle del Sol 23, Barcelona, 08001",
    status: "Active",
    dateJoined: "2023-01-15",
    plan: "Premium",
    devices: 3,
    lastActive: "2023-09-15T14:23:00",
    emergencyContact: "Juan García, +34 612 345 679",
    medicalConditions: ["Hypertension", "Diabetes Type 2"],
    notes: "Prefers communication in English despite being a Spanish resident",
  },
  {
    id: "CL-1002",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+34 623 456 789",
    address: "Avenida Diagonal 42, Barcelona, 08029",
    status: "Active",
    dateJoined: "2023-02-20",
    plan: "Standard",
    devices: 1,
    lastActive: "2023-09-14T10:15:00",
    emergencyContact: "Jane Smith, +34 623 456 780",
    medicalConditions: ["Arthritis"],
    notes: "British expat, limited Spanish language skills",
  },
  {
    id: "CL-1003",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@example.com",
    phone: "+34 634 567 890",
    address: "Plaza Mayor 5, Madrid, 28012",
    status: "Inactive",
    dateJoined: "2023-03-10",
    plan: "Basic",
    devices: 2,
    lastActive: "2023-08-30T09:45:00",
    emergencyContact: "Miguel Rodriguez, +34 634 567 891",
    medicalConditions: ["None"],
    notes: "",
  },
  {
    id: "CL-1004",
    name: "Thomas Brown",
    email: "thomas.brown@example.com",
    phone: "+34 645 678 901",
    address: "Calle de San Jerónimo 8, Sevilla, 41003",
    status: "Active",
    dateJoined: "2023-04-05",
    plan: "Premium",
    devices: 3,
    lastActive: "2023-09-15T11:30:00",
    emergencyContact: "Sarah Brown, +44 7700 900123",
    medicalConditions: ["Heart Condition", "Mobility Issues"],
    notes: "Requires regular check-ins",
  },
  {
    id: "CL-1005",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+34 656 789 012",
    address: "Avenida de la Constitución 10, Valencia, 46003",
    status: "Active",
    dateJoined: "2023-05-12",
    plan: "Standard",
    devices: 2,
    lastActive: "2023-09-15T08:20:00",
    emergencyContact: "David Wilson, +44 7700 900456",
    medicalConditions: ["Asthma"],
    notes: "",
  },
  {
    id: "CL-1006",
    name: "Carlos Fernandez",
    email: "carlos.fernandez@example.com",
    phone: "+34 667 890 123",
    address: "Calle Gran Vía 35, Madrid, 28013",
    status: "Active",
    dateJoined: "2023-06-08",
    plan: "Standard",
    devices: 1,
    lastActive: "2023-09-14T16:40:00",
    emergencyContact: "Ana Fernandez, +34 667 890 124",
    medicalConditions: ["None"],
    notes: "",
  },
  {
    id: "CL-1007",
    name: "Laura Gonzalez",
    email: "laura.gonzalez@example.com",
    phone: "+34 678 901 234",
    address: "Paseo de Gracia 43, Barcelona, 08007",
    status: "Pending",
    dateJoined: "2023-09-01",
    plan: "Basic",
    devices: 0,
    lastActive: null,
    emergencyContact: "Pedro Gonzalez, +34 678 901 235",
    medicalConditions: ["Allergies"],
    notes: "Awaiting device setup appointment",
  },
  {
    id: "CL-1008",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+34 689 012 345",
    address: "Calle del Doctor Fleming 3, Malaga, 29016",
    status: "Active",
    dateJoined: "2023-07-20",
    plan: "Premium",
    devices: 4,
    lastActive: "2023-09-15T09:10:00",
    emergencyContact: "Elizabeth Johnson, +34 689 012 346",
    medicalConditions: ["Parkinson's Disease", "Hypertension"],
    notes: "Requires additional support for device setup",
  },
];

const mockMedicalReports = [
  {
    id: "MR-2001",
    clientId: "CL-1001",
    date: "2023-07-15",
    title: "Quarterly Health Assessment",
    doctor: "Dr. Ramón López",
    summary: "Patient is managing hypertension well with medication. Blood sugar levels slightly elevated, recommended dietary changes.",
    attachments: ["Blood_Test_Results.pdf", "Doctor_Notes.pdf"]
  },
  {
    id: "MR-2002",
    clientId: "CL-1001",
    date: "2023-04-10",
    title: "Monthly Check-up",
    doctor: "Dr. Ramón López",
    summary: "Routine check-up shows stable condition. Medication dosage maintained.",
    attachments: ["Check_up_Report.pdf"]
  },
  {
    id: "MR-2003",
    clientId: "CL-1004",
    date: "2023-08-02",
    title: "Cardiac Evaluation",
    doctor: "Dr. Isabel Moreno",
    summary: "EKG results normal. Patient reports improved energy levels. Continuing with current treatment plan.",
    attachments: ["EKG_Results.pdf", "Treatment_Plan.pdf"]
  },
];

const mockDeviceEvents = [
  {
    id: "EV-3001",
    clientId: "CL-1001",
    deviceId: "DEV-5001",
    deviceType: "SOS Pendant",
    eventType: "Button Press",
    timestamp: "2023-09-10T14:23:00",
    notes: "False alarm, accidental press confirmed by client",
    resolved: true
  },
  {
    id: "EV-3002",
    clientId: "CL-1001",
    deviceId: "DEV-5001",
    deviceType: "SOS Pendant",
    eventType: "Low Battery",
    timestamp: "2023-09-12T08:30:00",
    notes: "Client notified to charge device",
    resolved: true
  },
  {
    id: "EV-3003",
    clientId: "CL-1004",
    deviceId: "DEV-5008",
    deviceType: "Health Monitor",
    eventType: "Abnormal Heart Rate",
    timestamp: "2023-09-08T22:15:00",
    notes: "Emergency services dispatched, client taken to hospital for evaluation",
    resolved: true
  },
];

const ClientManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all-clients");
  const [clientDetailsOpen, setClientDetailsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedDetailsTab, setSelectedDetailsTab] = useState("overview");

  // Filter clients based on search term and status
  const filteredClients = mockClients.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    if (selectedTab === "all-clients") {
      return matchesSearch;
    } else if (selectedTab === "active-clients") {
      return matchesSearch && client.status === "Active";
    } else if (selectedTab === "inactive-clients") {
      return matchesSearch && client.status === "Inactive";
    } else if (selectedTab === "pending-clients") {
      return matchesSearch && client.status === "Pending";
    }
    return false;
  });

  const viewClientDetails = (client: any) => {
    setSelectedClient(client);
    setClientDetailsOpen(true);
  };

  const getClientMedicalReports = (clientId: string) => {
    return mockMedicalReports.filter(report => report.clientId === clientId);
  };

  const getClientDeviceEvents = (clientId: string) => {
    return mockDeviceEvents.filter(event => event.clientId === clientId);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlanClass = (plan: string) => {
    switch (plan) {
      case "Premium":
        return "bg-purple-100 text-purple-800";
      case "Standard":
        return "bg-blue-100 text-blue-800";
      case "Basic":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Client Management</h2>
          <p className="text-muted-foreground">
            View and manage all client accounts, profiles, and related information
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <User className="h-4 w-4 text-ice-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.length}</div>
            <p className="text-xs text-muted-foreground">
              In the ICE Alarm system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <User className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockClients.filter(c => c.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Using our services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockClients.reduce((sum, client) => sum + client.devices, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Active monitoring devices
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="all-clients" onValueChange={setSelectedTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full sm:w-auto">
                <TabsTrigger value="all-clients">All Clients</TabsTrigger>
                <TabsTrigger value="active-clients">Active</TabsTrigger>
                <TabsTrigger value="inactive-clients">Inactive</TabsTrigger>
                <TabsTrigger value="pending-clients">Pending</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search clients..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all-clients" className="space-y-4">
              <ClientsTable 
                clients={filteredClients} 
                onViewDetails={viewClientDetails}
                getStatusClass={getStatusClass}
                getPlanClass={getPlanClass}
              />
            </TabsContent>

            <TabsContent value="active-clients" className="space-y-4">
              <ClientsTable 
                clients={filteredClients} 
                onViewDetails={viewClientDetails}
                getStatusClass={getStatusClass}
                getPlanClass={getPlanClass}
              />
            </TabsContent>

            <TabsContent value="inactive-clients" className="space-y-4">
              <ClientsTable 
                clients={filteredClients} 
                onViewDetails={viewClientDetails}
                getStatusClass={getStatusClass}
                getPlanClass={getPlanClass}
              />
            </TabsContent>

            <TabsContent value="pending-clients" className="space-y-4">
              <ClientsTable 
                clients={filteredClients} 
                onViewDetails={viewClientDetails}
                getStatusClass={getStatusClass}
                getPlanClass={getPlanClass}
              />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      {/* Client Details Dialog */}
      <Dialog open={clientDetailsOpen} onOpenChange={setClientDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Client Details: {selectedClient?.name}</DialogTitle>
            <DialogDescription>
              ID: {selectedClient?.id} | Joined: {selectedClient?.dateJoined}
            </DialogDescription>
          </DialogHeader>
          
          {selectedClient && (
            <div className="space-y-4">
              <Tabs defaultValue="overview" onValueChange={setSelectedDetailsTab}>
                <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="medical">Medical Info</TabsTrigger>
                  <TabsTrigger value="devices">Devices</TabsTrigger>
                  <TabsTrigger value="history">Event History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{selectedClient.name}</p>
                            <p className="text-sm text-muted-foreground">Name</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{selectedClient.email}</p>
                            <p className="text-sm text-muted-foreground">Email</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{selectedClient.phone}</p>
                            <p className="text-sm text-muted-foreground">Phone</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{selectedClient.address}</p>
                            <p className="text-sm text-muted-foreground">Address</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Account Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status:</span>
                          <Badge className={getStatusClass(selectedClient.status)}>
                            {selectedClient.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Subscription Plan:</span>
                          <Badge className={getPlanClass(selectedClient.plan)}>
                            {selectedClient.plan}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Connected Devices:</span>
                          <span className="font-medium">{selectedClient.devices}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Last Activity:</span>
                          <span className="font-medium">
                            {selectedClient.lastActive 
                              ? new Date(selectedClient.lastActive).toLocaleDateString() 
                              : "Never"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Emergency Contact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{selectedClient.emergencyContact}</p>
                      </CardContent>
                    </Card>
                    
                    {selectedClient.notes && (
                      <Card className="md:col-span-2">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{selectedClient.notes}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="medical" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical Conditions</CardTitle>
                      <CardDescription>Known medical conditions for this client</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedClient.medicalConditions && selectedClient.medicalConditions.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedClient.medicalConditions.map((condition: string, index: number) => (
                            <li key={index} className="text-base">
                              {condition}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No known medical conditions</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical Reports</CardTitle>
                      <CardDescription>Latest medical reports shared with ICE Alarm</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Summary</TableHead>
                            <TableHead>Files</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getClientMedicalReports(selectedClient.id).length > 0 ? (
                            getClientMedicalReports(selectedClient.id).map((report) => (
                              <TableRow key={report.id}>
                                <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                                <TableCell className="font-medium">{report.title}</TableCell>
                                <TableCell>{report.doctor}</TableCell>
                                <TableCell>{report.summary}</TableCell>
                                <TableCell>
                                  {report.attachments.map((file, index) => (
                                    <Button 
                                      key={index}
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-blue-600 hover:text-blue-800 p-0 mr-2"
                                    >
                                      <FileText className="h-4 w-4 mr-1" />
                                      {file}
                                    </Button>
                                  ))}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4">
                                No medical reports available
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="devices" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Connected Devices</CardTitle>
                          <CardDescription>Devices associated with this client</CardDescription>
                        </div>
                        <Button size="sm">
                          Add Device
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedClient.devices > 0 ? (
                        <div className="space-y-4">
                          <DeviceCard 
                            id="DEV-5001"
                            type="SOS Pendant"
                            status="Active"
                            battery="85%"
                            lastSync="2023-09-15T14:23:00"
                          />
                          
                          {selectedClient.devices >= 2 && (
                            <DeviceCard 
                              id="DEV-5002"
                              type="Health Monitor"
                              status="Active"
                              battery="92%"
                              lastSync="2023-09-15T14:20:00"
                            />
                          )}
                          
                          {selectedClient.devices >= 3 && (
                            <DeviceCard 
                              id="DEV-5003"
                              type="Medical Dispenser"
                              status="Active"
                              battery="78%"
                              lastSync="2023-09-15T13:45:00"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground mb-4">No devices connected</p>
                          <Button>
                            Set Up First Device
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event History</CardTitle>
                      <CardDescription>Recent events and alerts from client devices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Event Type</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getClientDeviceEvents(selectedClient.id).length > 0 ? (
                            getClientDeviceEvents(selectedClient.id).map((event) => (
                              <TableRow key={event.id}>
                                <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{event.deviceType} ({event.deviceId})</TableCell>
                                <TableCell className="font-medium">{event.eventType}</TableCell>
                                <TableCell>{event.notes}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={event.resolved ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                                    {event.resolved ? "Resolved" : "Open"}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4">
                                No events recorded yet
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1">
                <Edit className="h-4 w-4" />
                Edit Client
              </Button>
              <Button variant="outline" className="gap-1 text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
            <Button variant="default" onClick={() => setClientDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ClientsTableProps {
  clients: any[];
  onViewDetails: (client: any) => void;
  getStatusClass: (status: string) => string;
  getPlanClass: (plan: string) => string;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ 
  clients, 
  onViewDetails,
  getStatusClass,
  getPlanClass
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Devices</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{client.email}</span>
                    <span className="text-xs text-muted-foreground">{client.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusClass(client.status)}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPlanClass(client.plan)}>
                    {client.plan}
                  </Badge>
                </TableCell>
                <TableCell>{client.devices}</TableCell>
                <TableCell>
                  {client.lastActive 
                    ? new Date(client.lastActive).toLocaleDateString() 
                    : "Never"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewDetails(client)}
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
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Client
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Change Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bell className="h-4 w-4 mr-2" />
                          Send Notification
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No clients found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

interface DeviceCardProps {
  id: string;
  type: string;
  status: string;
  battery: string;
  lastSync: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ id, type, status, battery, lastSync }) => {
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "SOS Pendant":
        return <AlertCircle className="h-10 w-10 text-red-500" />;
      case "Health Monitor":
        return <Heart className="h-10 w-10 text-pink-500" />;
      case "Medical Dispenser":
        return <Shield className="h-10 w-10 text-blue-500" />;
      default:
        return <AlertCircle className="h-10 w-10 text-red-500" />;
    }
  };

  return (
    <div className="border rounded-lg p-4 flex items-start justify-between hover:bg-gray-50 transition-colors">
      <div className="flex gap-3">
        <div className="bg-white p-2 rounded-lg border">
          {getDeviceIcon(type)}
        </div>
        <div>
          <h4 className="font-medium">{type}</h4>
          <p className="text-sm text-muted-foreground">ID: {id}</p>
          <div className="flex items-center mt-2">
            <Badge className={status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100"}>
              {status}
            </Badge>
            <span className="text-sm ml-2">Battery: {battery}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Last Active: {new Date(lastSync).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ClientManagement;
