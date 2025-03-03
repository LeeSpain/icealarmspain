
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DeviceOverview: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Current status and information about your SOS Pendant' 
            : 'Estado actual e información sobre tu Colgante SOS'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Status' : 'Estado'}</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-green-600">{language === 'en' ? 'Active' : 'Activo'}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Battery' : 'Batería'}</span>
            <span className="text-sm">85%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Last Sync' : 'Última Sincronización'}</span>
            <span className="text-sm">{language === 'en' ? '10 minutes ago' : 'Hace 10 minutos'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Last Test' : 'Última Prueba'}</span>
            <span className="text-sm">{language === 'en' ? '2 days ago' : 'Hace 2 días'}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button className="w-full">
            <Shield className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Test SOS Alarm' : 'Probar Alarma SOS'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceOverview;
