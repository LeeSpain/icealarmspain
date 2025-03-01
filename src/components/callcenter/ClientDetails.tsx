
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Package, 
  ShieldCheck,
  Edit,
  Save,
  X,
  Clock,
  TicketIcon
} from "lucide-react";
import { toast } from "react-toastify";

// Mock data for clients
const mockClients = [
  {
    id: 101,
    name: "María García",
    email: "maria.garcia@example.com",
    phone: "+34 612 345 678",
    address: "Calle Gran Vía 123, Madrid, 28013",
    joinDate: "2023-01-15",
    activeDevices: 2,
    subscription: "Premium",
    subscriptionEndDate: "2024-01-15",
    lastContact: "2023-05-23T14:30:00",
    notes: "Prefers communication via email. Has two devices, one at home and one at her summer house."
  },
  {
    id: 102,
    name: "Juan Rodríguez",
    email: "juan.rodriguez@example.com",
    phone: "+34 623 456 789",
    address: "Avenida Diagonal 456, Barcelona, 08036",
    joinDate: "2023-02-20",
    activeDevices: 1,
    subscription: "Standard",
    subscriptionEndDate: "2024-02-20",
    lastContact: "2023-05-22T09:15:00",
    notes: "Prefers phone calls over emails. Has one device installed at his elderly mother's home."
  },
  {
    id: 103,
    name: "Laura Martínez",
    email: "laura.martinez@example.com",
    phone: "+34 634 567 890",
    address: "Calle Sierpes 78, Sevilla, 41004",
    joinDate: "2023-03-10",
    activeDevices: 3,
    subscription: "Premium",
    subscriptionEndDate: "2024-03-10",
    lastContact: "2023-05-20T13:45:00",
    notes: "Multiple devices for family members. Has recommended our service to several friends."
  },
  {
    id: 104,
    name: "Carlos Sánchez",
    email: "carlos.sanchez@example.com",
    phone: "+34 645 678 901",
    address: "Plaza Mayor 34, Valencia, 46002",
    joinDate: "2023-04-05",
    activeDevices: 1,
    subscription: "Basic",
    subscriptionEndDate: "2024-04-05",
    lastContact: "2023-05-23T08:20:00",
    notes: "New customer, still learning how to use the system. May need additional support."
  },
  {
    id: 105,
    name: "Ana López",
    email: "ana.lopez@example.com",
    phone: "+34 656 789 012",
    address: "Calle Portales 21, Logroño, 26001",
    joinDate: "2023-05-01",
    activeDevices: 2,
    subscription: "Standard",
    subscriptionEndDate: "2024-05-01",
    lastContact: "2023-05-21T16:10:00",
    notes: "Has experienced technical issues with one of her devices. Replacement might be needed."
  }
];

// Mock data for client devices
const mockDevices = [
  {
    id: 201,
    clientId: 101,
    model: "IceAlarm Pro",
    serialNumber: "IAP12345678",
    activationDate: "2023-01-16",
    lastMaintenance: "2023-04-16",
    status: "active",
    location: "Main Residence",
    batteryStatus: "85%"
  },
  {
    id: 202,
    clientId: 101,
    model: "IceAlarm Pro",
    serialNumber: "IAP23456789",
    activationDate: "2023-02-05",
    lastMaintenance: "2023-04-16",
    status: "active",
    location: "Summer House",
    batteryStatus: "92%"
  },
  {
    id: 203,
    clientId: 102,
    model: "IceAlarm Standard",
    serialNumber: "IAS34567890",
    activationDate: "2023-02-21",
    lastMaintenance: "2023-04-10",
    status: "active",
    location: "Mother's Home",
    batteryStatus: "78%"
  },
  {
    id: 204,
    clientId: 103,
    model: "IceAlarm Pro",
    serialNumber: "IAP45678901",
    activationDate: "2023-03-11",
    lastMaintenance: "2023-05-01",
    status: "active",
    location: "Primary Residence",
    batteryStatus: "95%"
  },
  {
    id: 205,
    clientId: 103,
    model: "IceAlarm Standard",
    serialNumber: "IAS56789012",
    activationDate: "2023-03-12",
    lastMaintenance: "2023-05-01",
    status: "active",
    location: "Parents' Home",
    batteryStatus: "90%"
  },
  {
    id: 206,
    clientId: 103,
    model: "IceAlarm Basic",
    serialNumber: "IAB67890123",
    activationDate: "2023-03-13",
    lastMaintenance: "2023-05-01",
    status: "inactive",
    location: "Vacation Home",
    batteryStatus: "N/A"
  },
  {
    id: 207,
    clientId: 104,
    model: "IceAlarm Basic",
    serialNumber: "IAB78901234",
    activationDate: "2023-04-06",
    lastMaintenance: "N/A",
    status: "active",
    location: "Apartment",
    batteryStatus: "89%"
  },
  {
    id: 208,
    clientId: 105,
    model: "IceAlarm Standard",
    serialNumber: "IAS89012345",
    activationDate: "2023-05-02",
    lastMaintenance: "N/A",
    status: "active",
    location: "Home",
    batteryStatus: "87%"
  },
  {
    id: 209,
    clientId: 105,
    model: "IceAlarm Standard",
    serialNumber: "IAS90123456",
    activationDate: "2023-05-02",
    lastMaintenance: "N/A",
    status: "error",
    location: "Office",
    batteryStatus: "65%"
  }
];

// Mock interaction history
const mockInteractions = [
  {
    id: 301,
    clientId: 101,
    date: "2023-05-23T14:30:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client reported device connectivity issues. Created ticket #1."
  },
  {
    id: 302,
    clientId: 101,
    date: "2023-05-10T11:45:00",
    type: "call",
    agent: "Sales Agent",
    description: "Follow-up call about satisfaction with second device. Client is very happy with the product."
  },
  {
    id: 303,
    clientId: 101,
    date: "2023-04-16T09:30:00",
    type: "maintenance",
    agent: "Maintenance Team",
    description: "Routine maintenance performed on both devices. All systems functioning properly."
  },
  {
    id: 304,
    clientId: 102,
    date: "2023-05-22T09:15:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client had questions about billing. Created ticket #2."
  },
  {
    id: 305,
    clientId: 102,
    date: "2023-04-10T13:20:00",
    type: "maintenance",
    agent: "Maintenance Team",
    description: "Routine maintenance performed. Device firmware updated to latest version."
  },
  {
    id: 306,
    clientId: 103,
    date: "2023-05-20T13:45:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client requested assistance with new device setup. Created ticket #3."
  },
  {
    id: 307,
    clientId: 104,
    date: "2023-05-23T08:20:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client inquired about app subscription renewal. Created ticket #4."
  },
  {
    id: 308,
    clientId: 105,
    date: "2023-05-21T16:10:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client reported battery issues with one device. Created ticket #5."
  }
];

interface ClientDetailsProps {
  selectedClientId: number | null;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ selectedClientId }) => {
  const [clients, setClients] = useState(mockClients);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  // Get selected client details
  const selectedClient = selectedClientId 
    ? clients.find(client => client.id === selectedClientId) 
    : clients[0];
    
  // Get devices for selected client
  const clientDevices = selectedClient 
    ? mockDevices.filter(device => device.clientId === selectedClient.id)
    : [];
    
  // Get interaction history for selected client
  const clientInteractions = selectedClient 
    ? mockInteractions.filter(interaction => interaction.clientId === selectedClient.id)
    : [];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Handle saving client details
  const handleSaveClientDetails = () => {
    setEditMode(false);
    toast.success("Client details updated successfully");
  };
  
  // Get device status badge style
  const getDeviceStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
      case 'inactive':
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
      case 'error':
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
      default:
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
    }
  };
  
  // Get interaction type badge style
  const getInteractionTypeBadge = (type: string) => {
    switch(type) {
      case 'ticket':
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
      case 'call':
        return "bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs";
      case 'maintenance':
        return "bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs";
      case 'email':
        return "bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
    }
  };
  
  if (!selectedClient) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-12 bg-muted rounded-lg">
          <User className="h-16 w-16 mb-4 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">No Client Selected</h3>
          <p className="text-muted-foreground">
            Select a client to view their details or select a ticket to view the associated client
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Client Overview Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedClient.name}
              </CardTitle>
              <CardDescription>
                Client since {formatDate(selectedClient.joinDate)}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {editMode ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditMode(false)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSaveClientDetails}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </>
              ) : (
                <Button 
                  size="sm"
                  onClick={() => setEditMode(true)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button
              variant={activeTab === "details" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("details")}
            >
              <User className="h-4 w-4 mr-1" />
              Details
            </Button>
            <Button
              variant={activeTab === "devices" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("devices")}
            >
              <Package className="h-4 w-4 mr-1" />
              Devices ({clientDevices.length})
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("history")}
            >
              <Clock className="h-4 w-4 mr-1" />
              Interaction History
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                      {editMode ? (
                        <Input 
                          defaultValue={selectedClient.email}
                          className="h-8 max-w-xs"
                        />
                      ) : (
                        <p>{selectedClient.email}</p>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                      {editMode ? (
                        <Input 
                          defaultValue={selectedClient.phone}
                          className="h-8 max-w-xs"
                        />
                      ) : (
                        <p>{selectedClient.phone}</p>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      {editMode ? (
                        <Input 
                          defaultValue={selectedClient.address}
                          className="h-8 max-w-xs"
                        />
                      ) : (
                        <p>{selectedClient.address}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                      <p>Client since: {formatDate(selectedClient.joinDate)}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 mt-1 text-muted-foreground" />
                      <p>Subscription: {selectedClient.subscription}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                      <p>Renewal Date: {formatDate(selectedClient.subscriptionEndDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                  {editMode ? (
                    <textarea 
                      defaultValue={selectedClient.notes}
                      className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="bg-muted p-3 rounded-md">{selectedClient.notes}</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.success("Call initiated")}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call Client
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.success("Email draft opened")}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email Client
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.success("New ticket created")}
                    >
                      <TicketIcon className="h-4 w-4 mr-1" />
                      Create Ticket
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "devices" && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">
                  Active Devices: {clientDevices.filter(d => d.status === 'active').length}/{clientDevices.length}
                </h3>
                <Button size="sm" variant="outline">
                  <Package className="h-4 w-4 mr-1" />
                  Add Device
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.model}</TableCell>
                      <TableCell>{device.serialNumber}</TableCell>
                      <TableCell>{device.location}</TableCell>
                      <TableCell>
                        <span className={getDeviceStatusBadge(device.status)}>
                          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{device.batteryStatus}</TableCell>
                      <TableCell>{device.lastMaintenance === 'N/A' ? 'N/A' : formatDate(device.lastMaintenance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {activeTab === "history" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Recent Interactions</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientInteractions.map((interaction) => (
                    <TableRow key={interaction.id}>
                      <TableCell>{formatDateTime(interaction.date)}</TableCell>
                      <TableCell>
                        <span className={getInteractionTypeBadge(interaction.type)}>
                          {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{interaction.agent}</TableCell>
                      <TableCell>{interaction.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetails;
