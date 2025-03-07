
import React, { useState } from "react";
import { 
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui";
import { AlertTriangle, CheckCircle, XCircle, MoreVertical, RefreshCw, Power, Settings, AlertCircle } from "lucide-react";
import { Device } from "./types";
import { toast } from "react-toastify";

interface DevicesTabProps {
  devices: Device[];
  allowRemoteActions?: boolean;
  onRemoteAction?: (deviceId: number, action: string) => void;
}

const DevicesTab: React.FC<DevicesTabProps> = ({ 
  devices,
  allowRemoteActions = false,
  onRemoteAction
}) => {
  const [pendingAction, setPendingAction] = useState<{ deviceId: number | null, action: string | null }>({
    deviceId: null,
    action: null
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "offline":
        return <XCircle className="h-5 w-5 text-gray-400" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "error":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Error</Badge>;
      case "offline":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Offline</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleRemoteAction = (deviceId: number, action: string) => {
    if (onRemoteAction) {
      onRemoteAction(deviceId, action);
    } else {
      toast.success(`Device ${deviceId}: ${action} action initiated`);
    }
  };

  const confirmAction = (deviceId: number, action: string) => {
    setPendingAction({ deviceId, action });
  };

  const executePendingAction = () => {
    if (pendingAction.deviceId && pendingAction.action) {
      handleRemoteAction(pendingAction.deviceId, pendingAction.action);
      setPendingAction({ deviceId: null, action: null });
    }
  };

  const cancelPendingAction = () => {
    setPendingAction({ deviceId: null, action: null });
  };

  if (devices.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No devices registered for this client.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Action confirmation dialog */}
      {pendingAction.deviceId && (
        <div className="border border-yellow-300 bg-yellow-50 p-4 rounded-md mb-4">
          <h4 className="font-medium text-yellow-800">Confirm Remote Action</h4>
          <p className="text-sm text-yellow-700 mb-4">
            Are you sure you want to {pendingAction.action} device #{pendingAction.deviceId}?
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={cancelPendingAction}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={executePendingAction}>
              Confirm
            </Button>
          </div>
        </div>
      )}

      {devices.map((device) => (
        <div key={device.id} className="border rounded-md p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {getStatusIcon(device.status)}
              <div>
                <h3 className="font-medium">{device.type} - {device.model}</h3>
                <p className="text-sm text-muted-foreground">SN: {device.serialNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(device.status)}
              
              {allowRemoteActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => confirmAction(device.id, "restart")}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      <span>Restart Device</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => confirmAction(device.id, "configure")}>
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Configure Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => confirmAction(device.id, "toggle power")}>
                      <Power className="h-4 w-4 mr-2" />
                      <span>Toggle Power</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-sm">{device.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Connection</p>
              <p className="text-sm">{device.lastConnection}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Battery</p>
              <p className="text-sm">{device.batteryLevel || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Firmware</p>
              <p className="text-sm">{device.firmware || 'N/A'}</p>
            </div>
          </div>

          {device.alerts && device.alerts.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded-md">
              <p className="text-sm font-medium text-red-800">Recent Alerts</p>
              <ul className="mt-2 space-y-1">
                {device.alerts.map((alert, index) => (
                  <li key={index} className="text-sm text-red-700">
                    {alert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DevicesTab;
