
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const DeviceSettings: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Device Settings' : 'Configuración del Dispositivo'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Customize how your Medical Dispenser works' 
            : 'Personaliza cómo funciona tu Dispensador Médico'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' 
            ? 'Settings for your Medical Dispenser would appear here.' 
            : 'La configuración de tu Dispensador Médico aparecería aquí.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default DeviceSettings;
