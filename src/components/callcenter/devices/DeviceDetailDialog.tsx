
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HardDrive, MapPin, Battery, Calendar, User, Signal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Device } from "../client-details/types";
import { toast } from "react-toastify";

interface DeviceDetailDialogProps {
  device: Device;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeviceDetailDialog: React.FC<DeviceDetailDialogProps> = ({
  device,
  open,
  onOpenChange,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      case 'offline':
        return 'text-gray-500';
      default:
        return 'text-blue-500';
    }
  };
  
  const handleScheduleMaintenance = () => {
    toast.success(`Maintenance scheduled for ${device.model}`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Device Details
          </DialogTitle>
          <DialogDescription>
            Detailed information about this device
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{device.model}</h3>
              <p className="text-sm text-muted-foreground">Serial: {device.serialNumber}</p>
            </div>
            <Badge 
              className={`${
                device.status === 'active' ? 'bg-green-100 text-green-800' :
                device.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                device.status === 'error' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
            </Badge>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 items-center">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Client ID</p>
                <p className="text-sm">{device.clientId}</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm">{device.location}</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <Battery className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Battery</p>
                <p className="text-sm">{device.batteryStatus}</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <Signal className={`h-4 w-4 ${getStatusColor(device.status)}`} />
              <div>
                <p className="text-sm font-medium">Signal Strength</p>
                <p className="text-sm">
                  {device.status === 'active' ? 'Strong' : 
                   device.status === 'warning' ? 'Weak' : 
                   device.status === 'error' ? 'Very Weak' : 'No Signal'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Activation Date</p>
                <p className="text-sm">{device.activationDate}</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Last Maintenance</p>
                <p className="text-sm">{device.lastMaintenance}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Battery check: 2 days ago</p>
              <p>Configuration update: 1 week ago</p>
              <p>Alert triggered: {device.status === 'error' ? '2 hours ago' : 'None'}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleScheduleMaintenance}>
            Schedule Maintenance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDetailDialog;
