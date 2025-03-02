
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DevicesTable } from "./DevicesTable";

// Define the device type
interface Device {
  id: string;
  name: string;
  status: string;
  lastChecked: string;
  batteryLevel: string;
}

interface DevicesSectionProps {
  devices: Device[];
  onAddDevice: () => void;
}

export const DevicesSection: React.FC<DevicesSectionProps> = ({ devices, onAddDevice }) => {
  const { language } = useLanguage();
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-ice-500" />
            <CardTitle>{language === 'en' ? 'My Devices' : 'Mis Dispositivos'}</CardTitle>
          </div>
          {devices.length > 0 && (
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Manage Devices' : 'Gestionar Dispositivos'}
            </Button>
          )}
        </div>
        <CardDescription>
          {language === 'en' 
            ? 'Manage your connected ICE Alarm devices' 
            : 'Gestiona tus dispositivos ICE Alarm conectados'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DevicesTable devices={devices} onAddDevice={onAddDevice} />
      </CardContent>
    </Card>
  );
};
