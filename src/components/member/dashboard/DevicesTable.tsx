
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/context/LanguageContext";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the device type
interface Device {
  id: string;
  name: string;
  status: string;
  lastChecked: string;
  batteryLevel: string;
}

interface DevicesTableProps {
  devices: Device[];
  onAddDevice: () => void;
}

export const DevicesTable: React.FC<DevicesTableProps> = ({ devices, onAddDevice }) => {
  const { language } = useLanguage();
  
  if (devices.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
        <h3 className="text-lg font-medium mb-2">
          {language === 'en' ? 'No devices yet' : 'Aún no hay dispositivos'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {language === 'en' 
            ? 'You don\'t have any devices connected to your account yet.' 
            : 'Aún no tienes dispositivos conectados a tu cuenta.'}
        </p>
        <Button onClick={onAddDevice}>
          <Plus className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Add Your First Device' : 'Añade Tu Primer Dispositivo'}
        </Button>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{language === 'en' ? 'Device' : 'Dispositivo'}</TableHead>
          <TableHead>{language === 'en' ? 'Status' : 'Estado'}</TableHead>
          <TableHead>{language === 'en' ? 'Last Checked' : 'Última Revisión'}</TableHead>
          <TableHead>{language === 'en' ? 'Battery' : 'Batería'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map(device => (
          <TableRow key={device.id}>
            <TableCell className="font-medium">{device.name}</TableCell>
            <TableCell>
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                {device.status === 'active' 
                  ? (language === 'en' ? 'Active' : 'Activo') 
                  : (language === 'en' ? 'Inactive' : 'Inactivo')}
              </span>
            </TableCell>
            <TableCell>{device.lastChecked}</TableCell>
            <TableCell>{device.batteryLevel}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
