
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  ChevronDown, 
  Edit, 
  Trash2, 
  Eye, 
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { toast } from "react-toastify";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for clients
const MOCK_CLIENTS = [
  {
    id: "CL-001",
    name: "Avenida Hotels Group",
    contactPerson: "Maria Rodriguez",
    email: "maria@avenidahotels.com",
    phone: "+34 912 456 789",
    location: "Madrid",
    devices: 54,
    status: "active",
    subscription: "Enterprise",
    since: "Jan 2022",
    lastContact: "2 days ago"
  },
  {
    id: "CL-002",
    name: "Barcelona Senior Homes",
    contactPerson: "Carlos Mendoza",
    email: "carlos@bcnseniorhomes.es",
    phone: "+34 932 123 456",
    location: "Barcelona",
    devices: 87,
    status: "active",
    subscription: "Premium",
    since: "Mar 2022",
    lastContact: "1 week ago"
  },
  {
    id: "CL-003",
    name: "Valencia Care Centers",
    contactPerson: "Sofia Garcia",
    email: "sofia@valenciacare.es",
    phone: "+34 962 765 431",
    location: "Valencia",
    devices: 32,
    status: "inactive",
    subscription: "Standard",
    since: "Jun 2022",
    lastContact: "1 month ago"
  },
  {
    id: "CL-004",
    name: "Andalusia Elderly Services",
    contactPerson: "Javier Moreno",
    email: "javier@andalusiaelderly.es",
    phone: "+34 954 387 219",
    location: "Sevilla",
    devices: 46,
    status: "active",
    subscription: "Premium",
    since: "Aug 2022",
    lastContact: "3 days ago"
  },
  {
    id: "CL-005",
    name: "Northern Homes Network",
    contactPerson: "Isabel Duro",
    email: "isabel@northernhomes.com",
    phone: "+34 984 612 378",
    location: "Oviedo",
    devices: 28,
    status: "pending",
    subscription: "Trial",
    since: "Feb 2023",
    lastContact: "1 day ago"
  },
  {
    id: "CL-006",
    name: "Costa del Sol Senior Living",
    contactPerson: "Rafael Blanco",
    email: "rafael@costasol.es",
    phone: "+34 952 847 193",
    location: "Málaga",
    devices: 65,
    status: "active",
    subscription: "Enterprise",
    since: "Sep 2022",
    lastContact: "5 days ago"
  },
  {
    id: "CL-007",
    name: "Galicia Care Association",
    contactPerson: "Elena Castro",
    email: "elena@galiciacare.org",
    phone: "+34 981 265 439",
    location: "Santiago",
    devices: 41,
    status: "active",
    subscription: "Standard",
    since: "Nov 2022",
    lastContact: "2 weeks ago"
  }
];

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [clientFormData, setClientFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    subscription: "Standard"
  });

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
  };

  const handleAddClient = () => {
    // Add new client to the list
    const newClient = {
      id: `CL-${String(clients.length + 1).padStart(3, '0')}`,
      ...clientFormData,
      devices: 0,
      status: "pending",
      since: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      lastContact: "Today"
    };
    
    setClients([...clients, newClient]);
    setShowAddDialog(false);
    setClientFormData({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      location: "",
      subscription: "Standard"
    });
    toast.success("New client added successfully!");
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(client => client.id !== clientId));
    toast.success("Client removed successfully!");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Management</h1>
          <p className="text-muted-foreground">Manage your client organizations and their subscriptions</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Clients ({clients.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients..."
                  className="w-[250px] pl-8"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuItem>Location</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Devices</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.contactPerson}</TableCell>
                    <TableCell>{client.location}</TableCell>
                    <TableCell>{client.devices}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeColor(client.status)}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.subscription}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button variant="ghost" size="icon" onClick={() => handleViewClient(client)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteClient(client.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
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
        </CardContent>
      </Card>

      {/* Client Details Dialog */}
      {selectedClient && (
        <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedClient.name}</DialogTitle>
              <DialogDescription>Client ID: {selectedClient.id}</DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="support">Support History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedClient.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedClient.location}, Spain</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Subscription Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan:</span>
                        <span className="font-medium">{selectedClient.subscription}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="outline" className={getStatusBadgeColor(selectedClient.status)}>
                          {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Client since:</span>
                        <span>{selectedClient.since}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last contacted:</span>
                        <span>{selectedClient.lastContact}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Account Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <p className="text-muted-foreground text-sm">Active Devices</p>
                          <p className="text-2xl font-bold">{selectedClient.devices}</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p className="text-muted-foreground text-sm">Open Tickets</p>
                          <p className="text-2xl font-bold">3</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p className="text-muted-foreground text-sm">MRR</p>
                          <p className="text-2xl font-bold">€4,500</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="devices">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Inventory</CardTitle>
                    <CardDescription>
                      All devices deployed to {selectedClient.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Device inventory data would be displayed here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      Past invoices and payment history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Billing history would be displayed here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="support">
                <Card>
                  <CardHeader>
                    <CardTitle>Support History</CardTitle>
                    <CardDescription>
                      Previous support tickets and resolutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Support history would be displayed here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedClient(null)}>Close</Button>
              <Button>Contact Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Client Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the details of the new client organization.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Organization Name</label>
              <Input
                id="name"
                value={clientFormData.name}
                onChange={(e) => setClientFormData({...clientFormData, name: e.target.value})}
                placeholder="Enter organization name"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="contactPerson" className="text-sm font-medium">Contact Person</label>
              <Input
                id="contactPerson"
                value={clientFormData.contactPerson}
                onChange={(e) => setClientFormData({...clientFormData, contactPerson: e.target.value})}
                placeholder="Enter contact person's name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={clientFormData.email}
                  onChange={(e) => setClientFormData({...clientFormData, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                <Input
                  id="phone"
                  value={clientFormData.phone}
                  onChange={(e) => setClientFormData({...clientFormData, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input
                  id="location"
                  value={clientFormData.location}
                  onChange={(e) => setClientFormData({...clientFormData, location: e.target.value})}
                  placeholder="Enter city"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="subscription" className="text-sm font-medium">Subscription</label>
                <select
                  id="subscription"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={clientFormData.subscription}
                  onChange={(e) => setClientFormData({...clientFormData, subscription: e.target.value})}
                >
                  <option value="Trial">Trial</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddClient}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientManagement;
