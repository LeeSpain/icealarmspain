
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Package, BarChart } from "lucide-react";
import { Device } from "../client-details/types";
import { toast } from "react-toastify";

interface DeviceInventoryProps {
  devices: Device[];
}

const DeviceInventory: React.FC<DeviceInventoryProps> = ({ devices }) => {
  // Group devices by model
  const deviceModels = devices.reduce((acc, device) => {
    if (!acc[device.model]) {
      acc[device.model] = {
        total: 0,
        active: 0,
        inactive: 0,
        needsMaintenance: 0
      };
    }
    
    acc[device.model].total += 1;
    
    if (device.status === 'active') {
      acc[device.model].active += 1;
    } else {
      acc[device.model].inactive += 1;
    }
    
    if (device.lastMaintenance === 'Overdue') {
      acc[device.model].needsMaintenance += 1;
    }
    
    return acc;
  }, {} as Record<string, { total: number, active: number, inactive: number, needsMaintenance: number }>);
  
  // Convert to array for rendering
  const deviceModelsList = Object.keys(deviceModels).map(model => ({
    model,
    ...deviceModels[model]
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Device Inventory</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Order New Devices
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Package className="h-4 w-4 mr-1" />
              Inventory Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device Model</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Active</TableHead>
                  <TableHead className="text-right">Inactive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deviceModelsList.map(item => (
                  <TableRow key={item.model}>
                    <TableCell className="font-medium">{item.model}</TableCell>
                    <TableCell className="text-right">{item.total}</TableCell>
                    <TableCell className="text-right">{item.active}</TableCell>
                    <TableCell className="text-right">{item.inactive}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart className="h-4 w-4 mr-1" />
              Maintenance Needs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device Model</TableHead>
                  <TableHead className="text-right">Needs Maintenance</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deviceModelsList.map(item => (
                  <TableRow key={item.model}>
                    <TableCell className="font-medium">{item.model}</TableCell>
                    <TableCell className="text-right">{item.needsMaintenance}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.info(`Scheduling maintenance for ${item.model}`)}
                        disabled={item.needsMaintenance === 0}
                      >
                        Schedule
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-muted rounded-md p-4">
        <h3 className="font-medium mb-2">Recent Inventory Changes</h3>
        <ul className="space-y-2">
          <li className="text-sm">
            <span className="text-muted-foreground">2023-05-15:</span> Added 5 SOS Pendants to inventory
          </li>
          <li className="text-sm">
            <span className="text-muted-foreground">2023-05-10:</span> Ordered 10 Health Wristbands
          </li>
          <li className="text-sm">
            <span className="text-muted-foreground">2023-05-01:</span> Removed 2 defective Medical Dispensers
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeviceInventory;
