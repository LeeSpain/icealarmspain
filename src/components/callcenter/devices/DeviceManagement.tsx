
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HardDrive, Signal, CheckCircle, AlertTriangle, XCircle, Search, Plus, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DevicesList from "./DevicesList";
import DeviceInventory from "./DeviceInventory";
import MaintenanceSchedule from "./MaintenanceSchedule";
import AlertsMonitoring from "./AlertsMonitoring";
import { mockDevices } from "../client-details/mock-data";
import { Device } from "../client-details/types";

const DeviceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all-devices");
  const [searchQuery, setSearchQuery] = useState("");
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(mockDevices);
  
  // Filter devices based on search query and status
  const filterDevices = (query: string, statusFilter?: string) => {
    let filtered = devices;
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(device => 
        device.model.toLowerCase().includes(lowercaseQuery) ||
        device.serialNumber.toLowerCase().includes(lowercaseQuery) ||
        device.location.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(device => device.status === statusFilter);
    }
    
    setFilteredDevices(filtered);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterDevices(query);
  };
  
  // Count devices by status
  const activeDevices = devices.filter(d => d.status === "active").length;
  const warningDevices = devices.filter(d => d.status === "warning").length;
  const errorDevices = devices.filter(d => d.status === "error").length;
  const offlineDevices = devices.filter(d => d.status === "offline").length;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Device Management</h1>
          <p className="text-muted-foreground">Manage and monitor all client devices</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Device
          </Button>
          <Button variant="outline" size="sm">
            <Cog className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <HardDrive className="h-8 w-8 text-primary mb-2" />
            <p className="text-2xl font-bold">{devices.length}</p>
            <p className="text-xs text-muted-foreground">Total Devices</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-2xl font-bold">{activeDevices}</p>
            <p className="text-xs text-muted-foreground">Active Devices</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">{warningDevices + errorDevices}</p>
            <p className="text-xs text-muted-foreground">Devices with Alerts</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <XCircle className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-2xl font-bold">{offlineDevices}</p>
            <p className="text-xs text-muted-foreground">Offline Devices</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Device Management System</CardTitle>
          <CardDescription>View, monitor, and manage all client devices in one place</CardDescription>
          
          <div className="flex justify-between mt-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          <Tabs defaultValue="all-devices" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all-devices">All Devices</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-devices">
              <DevicesList devices={filteredDevices} />
            </TabsContent>
            
            <TabsContent value="inventory">
              <DeviceInventory devices={devices} />
            </TabsContent>
            
            <TabsContent value="maintenance">
              <MaintenanceSchedule devices={devices} />
            </TabsContent>
            
            <TabsContent value="alerts">
              <AlertsMonitoring devices={devices} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceManagement;
