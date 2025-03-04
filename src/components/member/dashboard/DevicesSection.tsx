
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { PlusCircle, Wifi, Shield, Activity, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DevicesTable from "./DevicesTable";

interface DevicesSectionProps {
  userDevices?: any[];
}

const DevicesSection: React.FC<DevicesSectionProps> = ({ userDevices = [] }) => {
  const { language } = useLanguage();
  
  const hasDevices = userDevices.length > 0;
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{language === 'en' ? 'My Devices' : 'Mis Dispositivos'}</CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Manage your connected ICE Alarm devices' 
                : 'Administre sus dispositivos ICE Alarm conectados'}
            </CardDescription>
          </div>
          <Link to="/device-registration">
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              <PlusCircle className="h-3.5 w-3.5" />
              {language === 'en' ? 'Register Device' : 'Registrar Dispositivo'}
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {hasDevices ? (
          <DevicesTable devices={userDevices} />
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Wifi className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">
              {language === 'en' ? 'No Devices Connected' : 'No Hay Dispositivos Conectados'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              {language === 'en'
                ? 'You haven\'t connected any ICE Alarm devices to your account yet.'
                : 'Aún no ha conectado ningún dispositivo ICE Alarm a su cuenta.'}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-1 flex flex-col space-y-4">
        <div className="w-full border-t pt-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          <Link to="/device-registration" className="w-full" onClick={() => sessionStorage.setItem('selectedDevice', 'pendant')}>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2 text-red-500" />
              <span>{language === 'en' ? 'Add SOS Pendant' : 'Añadir Colgante SOS'}</span>
            </Button>
          </Link>
          
          <Link to="/device-registration" className="w-full" onClick={() => sessionStorage.setItem('selectedDevice', 'monitor')}>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2 text-blue-500" />
              <span>{language === 'en' ? 'Add Health Monitor' : 'Añadir Monitor de Salud'}</span>
            </Button>
          </Link>
          
          <Link to="/device-registration" className="w-full" onClick={() => sessionStorage.setItem('selectedDevice', 'dispenser')}>
            <Button variant="outline" className="w-full justify-start">
              <Pill className="h-4 w-4 mr-2 text-green-500" />
              <span>{language === 'en' ? 'Add Medical Dispenser' : 'Añadir Dispensador Médico'}</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DevicesSection;
