
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const DeviceSettings: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Device Settings' : 'Configuración del Dispositivo'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Customize how your SOS Pendant works' 
            : 'Personaliza cómo funciona tu Colgante SOS'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' 
            ? 'Settings for your SOS Pendant would appear here.' 
            : 'La configuración de tu Colgante SOS aparecería aquí.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default DeviceSettings;
