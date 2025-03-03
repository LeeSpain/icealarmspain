
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Phone, Edit, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Device } from "../client-details/types";
import { toast } from "react-toastify";
import DeviceDetailDialog from "./DeviceDetailDialog";

interface DevicesListProps {
  devices: Device[];
}

const DevicesList: React.FC<DevicesListProps> = ({ devices }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  
  const selectedDevice = selectedDeviceId 
    ? devices.find(device => device.id === selectedDeviceId) 
    : null;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Alert</Badge>;
      case 'offline':
        return <Badge className="bg-gray-100 text-gray-800">Offline</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
    }
  };
  
  const handleContactClient = (device: Device) => {
    toast.info(`Initiating contact for device ${device.serialNumber}`);
  };
  
  const handleViewDevice = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
    setDetailOpen(true);
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead>Last Maintenance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.length > 0 ? (
            devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">{device.model}</TableCell>
                <TableCell>{device.serialNumber}</TableCell>
                <TableCell>Client #{device.clientId}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>{getStatusBadge(device.status)}</TableCell>
                <TableCell>{device.batteryStatus}</TableCell>
                <TableCell>{device.lastMaintenance}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDevice(device.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info(`Editing device ${device.serialNumber}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleContactClient(device)}>
                        <Phone className="mr-2 h-4 w-4" />
                        <span>Contact Client</span>
                      </DropdownMenuItem>
                      {(device.status === 'warning' || device.status === 'error') && (
                        <DropdownMenuItem onClick={() => toast.info(`Resolving alert for ${device.serialNumber}`)}>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          <span>Resolve Alert</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No devices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {selectedDevice && (
        <DeviceDetailDialog 
          device={selectedDevice} 
          open={detailOpen} 
          onOpenChange={setDetailOpen} 
        />
      )}
    </div>
  );
};

export default DevicesList;
