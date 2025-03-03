
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
import { AlertTriangle, BellRing, CheckCircle, Phone } from "lucide-react";
import { Device } from "../client-details/types";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";

interface AlertsMonitoringProps {
  devices: Device[];
}

const AlertsMonitoring: React.FC<AlertsMonitoringProps> = ({ devices }) => {
  const alertDevices = devices.filter(device => 
    device.status === 'warning' || device.status === 'error'
  );
  
  // Mock alert data
  const deviceAlerts = alertDevices.map(device => ({
    id: device.id,
    deviceId: device.id,
    deviceModel: device.model,
    clientId: device.clientId,
    alertType: device.status === 'error' ? 'critical' : 'warning',
    message: device.status === 'error' 
      ? 'Device not responding' 
      : 'Low battery or weak signal',
    timestamp: new Date().toISOString(),
    resolved: false
  }));
  
  const getAlertBadge = (alertType: string) => {
    switch (alertType) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      default:
        return <Badge>{alertType}</Badge>;
    }
  };
  
  const handleResolveAlert = (alertId: number) => {
    toast.success(`Alert ${alertId} marked as resolved`);
  };
  
  const handleContactClient = (clientId: number) => {
    toast.info(`Initiating contact with client ${clientId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Alert Monitoring</h2>
        <Button variant="outline" size="sm">
          <BellRing className="h-4 w-4 mr-1" />
          Alert Settings
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {deviceAlerts.filter(alert => alert.alertType === 'critical').length}
            </p>
            <p className="text-xs text-muted-foreground">unresolved critical alerts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
              Warning Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {deviceAlerts.filter(alert => alert.alertType === 'warning').length}
            </p>
            <p className="text-xs text-muted-foreground">unresolved warning alerts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Resolved Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">alerts resolved in the last 24 hours</p>
          </CardContent>
        </Card>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>Client ID</TableHead>
            <TableHead>Alert Type</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deviceAlerts.map(alert => (
            <TableRow key={alert.id}>
              <TableCell className="font-medium">{alert.deviceModel}</TableCell>
              <TableCell>{alert.clientId}</TableCell>
              <TableCell>{getAlertBadge(alert.alertType)}</TableCell>
              <TableCell>{alert.message}</TableCell>
              <TableCell>{new Date(alert.timestamp).toLocaleTimeString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContactClient(alert.clientId)}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleResolveAlert(alert.id)}
                  >
                    Resolve
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AlertsMonitoring;
