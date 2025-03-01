
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Device } from "./types";
import { formatDate, getDeviceStatusBadge } from "./utils";

interface DevicesTabProps {
  devices: Device[];
}

const DevicesTab: React.FC<DevicesTabProps> = ({ devices }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium">
          Active Devices: {devices.filter(d => d.status === 'active').length}/{devices.length}
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
          {devices.map((device) => (
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
  );
};

export default DevicesTab;
