
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Smartphone,
  Battery,
  RefreshCw,
  WifiOff,
  Signal,
  AlertTriangle,
  Wifi
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock data for devices
const MOCK_DEVICES = [
  {
    id: "DEV-001",
    model: "IceAlarm Pro",
    serialNumber: "IC-PRO-12345",
    client: "Avenida Hotels Group",
    location: "Madrid",
    batteryLevel: 87,
    status: "active",
    lastCheckin: "10 minutes ago",
    firmware: "2.4.1",
    alertsTriggered: 0
  },
  {
    id: "DEV-002",
    model: "IceAlarm Standard",
    serialNumber: "IC-STD-23456",
    client: "Barcelona Senior Homes",
    location: "Barcelona",
    batteryLevel: 64,
    status: "active",
    lastCheckin: "1 hour ago",
    firmware: "2.3.8",
    alertsTriggered: 2
  },
  {
    id: "DEV-003",
    model: "IceAlarm Pro",
    serialNumber: "IC-PRO-34567",
    client: "Valencia Care Centers",
    location: "Valencia",
    batteryLevel: 92,
    status: "maintenance",
    lastCheckin: "3 days ago",
    firmware: "2.4.0",
    alertsTriggered: 0
  },
  {
    id: "DEV-004",
    model: "IceAlarm Basic",
    serialNumber: "IC-BAS-45678",
    client: "Andalusia Elderly Services",
    location: "Sevilla",
    batteryLevel: 28,
    status: "warning",
    lastCheckin: "2 hours ago",
    firmware: "2.2.5",
    alertsTriggered: 1
  },
  {
    id: "DEV-005",
    model: "IceAlarm Standard",
    serialNumber: "IC-STD-56789",
    client: "Northern Homes Network",
    location: "Oviedo",
    batteryLevel: 76,
    status: "active",
    lastCheckin: "25 minutes ago",
    firmware: "2.3.8",
    alertsTriggered: 0
  },
  {
    id: "DEV-006",
    model: "IceAlarm Pro",
    serialNumber: "IC-PRO-67890",
    client: "Costa del Sol Senior Living",
    location: "Málaga",
    batteryLevel: 45,
    status: "offline",
    lastCheckin: "2 days ago",
    firmware: "2.4.1",
    alertsTriggered: 3
  },
  {
    id: "DEV-007",
    model: "IceAlarm Basic",
    serialNumber: "IC-BAS-78901",
    client: "Galicia Care Association",
    location: "Santiago",
    batteryLevel: 89,
    status: "active",
    lastCheckin: "15 minutes ago",
    firmware: "2.2.5",
    alertsTriggered: 0
  }
];

const DeviceManagement: React.FC = () => {
  const [devices, setDevices] = useState(MOCK_DEVICES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Filter devices based on search term
  const filteredDevices = devices.filter(device => 
    device.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDevice = (device: any) => {
    setSelectedDevice(device);
  };

  const handleDeleteDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    toast.success("Device removed successfully!");
  };

  const handleUpdateFirmware = (deviceId: string) => {
    toast.info(`Initiating firmware update for device ${deviceId}`);
    // Simulate firmware update
    setTimeout(() => {
      toast.success(`Firmware updated successfully for device ${deviceId}`);
    }, 3000);
  };

  const handleResetDevice = (deviceId: string) => {
    toast.info(`Resetting device ${deviceId}`);
    // Simulate device reset
    setTimeout(() => {
      toast.success(`Device ${deviceId} has been reset successfully`);
    }, 2000);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "offline":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "maintenance":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Signal className="h-4 w-4 text-green-600" />;
      case "offline":
        return <WifiOff className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "maintenance":
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return <Wifi className="h-4 w-4 text-gray-600" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 70) return "bg-green-500";
    if (level > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Device Management</h1>
          <p className="text-muted-foreground">Monitor and manage all deployed devices</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Device
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across {new Set(devices.map(d => d.client)).size} clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.filter(d => d.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round((devices.filter(d => d.status === 'active').length / devices.length) * 100)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Offline Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.filter(d => d.status === 'offline').length}</div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round((devices.filter(d => d.status === 'offline').length / devices.length) * 100)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Battery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.filter(d => d.batteryLevel < 30).length}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Device Inventory</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search devices..."
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
                  <DropdownMenuItem>Model</DropdownMenuItem>
                  <DropdownMenuItem>Client</DropdownMenuItem>
                  <DropdownMenuItem>Battery Level</DropdownMenuItem>
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
                <TableHead>Device ID</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Last Check-in</TableHead>
                <TableHead>Firmware</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">{device.id}</TableCell>
                    <TableCell>{device.model}</TableCell>
                    <TableCell>{device.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(device.status)}
                        <Badge variant="outline" className={getStatusBadgeColor(device.status)}>
                          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Battery className="h-4 w-4 text-muted-foreground" />
                        <div className="w-16">
                          <Progress value={device.batteryLevel} className={getBatteryColor(device.batteryLevel)} />
                        </div>
                        <span className="text-xs">{device.batteryLevel}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{device.lastCheckin}</TableCell>
                    <TableCell>{device.firmware}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button variant="ghost" size="icon" onClick={() => handleViewDevice(device)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleUpdateFirmware(device.id)}>
                              <RefreshCw className="mr-2 h-4 w-4" /> Update Firmware
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResetDevice(device.id)}>
                              <RefreshCw className="mr-2 h-4 w-4" /> Reset Device
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteDevice(device.id)}>
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
                    No devices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Device Details Dialog */}
      {selectedDevice && (
        <Dialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedDevice.model}</DialogTitle>
              <DialogDescription>
                ID: {selectedDevice.id} | Serial: {selectedDevice.serialNumber}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
                <TabsTrigger value="alerts">Alert History</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Device Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedDevice.status)}
                        <span className="font-medium">
                          {selectedDevice.status.charAt(0).toUpperCase() + selectedDevice.status.slice(1)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Battery Level:</span>
                          <div className="flex items-center">
                            <span className="mr-2">{selectedDevice.batteryLevel}%</span>
                            <div className="w-16">
                              <Progress value={selectedDevice.batteryLevel} className={getBatteryColor(selectedDevice.batteryLevel)} />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Check-in:</span>
                          <span>{selectedDevice.lastCheckin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Firmware:</span>
                          <span>v{selectedDevice.firmware}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Alerts Triggered:</span>
                          <span>{selectedDevice.alertsTriggered}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Assignment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Client:</span>
                          <span className="font-medium">{selectedDevice.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>{selectedDevice.location}, Spain</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Installation Date:</span>
                          <span>04/01/2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Warranty Until:</span>
                          <span>04/01/2025</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="bg-muted w-1 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Device check-in</p>
                            <p className="text-xs text-muted-foreground">{selectedDevice.lastCheckin}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="bg-muted w-1 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Firmware update</p>
                            <p className="text-xs text-muted-foreground">2 weeks ago</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="bg-muted w-1 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Battery status check</p>
                            <p className="text-xs text-muted-foreground">3 weeks ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="diagnostics">
                <Card>
                  <CardHeader>
                    <CardTitle>System Diagnostics</CardTitle>
                    <CardDescription>
                      Hardware and software performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Diagnostic data would be displayed here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="alerts">
                <Card>
                  <CardHeader>
                    <CardTitle>Alert History</CardTitle>
                    <CardDescription>
                      All alerts triggered by this device
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Alert history would be displayed here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="maintenance">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance History</CardTitle>
                    <CardDescription>
                      Service history and scheduled maintenance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Maintenance history would be displayed here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedDevice(null)}>Close</Button>
              <Button onClick={() => handleUpdateFirmware(selectedDevice.id)}>Update Firmware</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Device Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Register a new device to the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="model" className="text-sm font-medium">Device Model</label>
                <select
                  id="model"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="IceAlarm Basic">IceAlarm Basic</option>
                  <option value="IceAlarm Standard">IceAlarm Standard</option>
                  <option value="IceAlarm Pro">IceAlarm Pro</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="serialNumber" className="text-sm font-medium">Serial Number</label>
                <Input
                  id="serialNumber"
                  placeholder="Enter serial number"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="client" className="text-sm font-medium">Assign to Client</label>
              <select
                id="client"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a client...</option>
                <option value="Avenida Hotels Group">Avenida Hotels Group</option>
                <option value="Barcelona Senior Homes">Barcelona Senior Homes</option>
                <option value="Valencia Care Centers">Valencia Care Centers</option>
                <option value="Andalusia Elderly Services">Andalusia Elderly Services</option>
                <option value="Northern Homes Network">Northern Homes Network</option>
                <option value="Costa del Sol Senior Living">Costa del Sol Senior Living</option>
                <option value="Galicia Care Association">Galicia Care Association</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input
                  id="location"
                  placeholder="Enter device location"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                <Input
                  id="notes"
                  placeholder="Optional notes"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              setShowAddDialog(false);
              toast.success("New device added successfully!");
            }}>
              Register Device
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeviceManagement;
