
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Search, AlertCircle, Wifi, Battery, Bluetooth, RefreshCw, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DeviceTroubleshootingGuideProps {
  deviceType: 'pendant' | 'monitor' | 'dispenser';
  language: string;
}

const DeviceTroubleshootingGuide: React.FC<DeviceTroubleshootingGuideProps> = ({ 
  deviceType, 
  language 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const deviceNames = {
    pendant: language === 'en' ? 'SOS Pendant' : 'Colgante SOS',
    monitor: language === 'en' ? 'Health Monitor' : 'Monitor de Salud',
    dispenser: language === 'en' ? 'Medical Dispenser' : 'Dispensador de Medicamentos'
  };
  
  const commonIssues = [
    {
      id: 'connection',
      title: language === 'en' ? 'Connection Problems' : 'Problemas de Conexión',
      icon: <Wifi className="h-5 w-5 text-red-500" />,
      content: language === 'en' 
        ? `If your ${deviceNames[deviceType]} is not connecting to the app, try these steps:
           1. Make sure Bluetooth is enabled on your smartphone
           2. Ensure the device is within range (10 meters/30 feet)
           3. Restart both your phone and the device
           4. Check if the device has sufficient battery
           5. Uninstall and reinstall the app if the issue persists`
        : `Si su ${deviceNames[deviceType]} no se conecta a la aplicación, pruebe estos pasos:
           1. Asegúrese de que el Bluetooth esté habilitado en su smartphone
           2. Asegúrese de que el dispositivo esté dentro del alcance (10 metros/30 pies)
           3. Reinicie tanto su teléfono como el dispositivo
           4. Verifique si el dispositivo tiene batería suficiente
           5. Desinstale y reinstale la aplicación si el problema persiste`
    },
    {
      id: 'battery',
      title: language === 'en' ? 'Battery Issues' : 'Problemas de Batería',
      icon: <Battery className="h-5 w-5 text-amber-500" />,
      content: language === 'en'
        ? `If your ${deviceNames[deviceType]} is experiencing battery problems:
           1. Ensure you're using the provided charging cable
           2. Clean the charging port gently with a dry cloth
           3. Charge for at least 2 hours for a full battery
           4. If battery drains quickly, check for firmware updates
           5. Contact support if problems persist after a full reset`
        : `Si su ${deviceNames[deviceType]} tiene problemas de batería:
           1. Asegúrese de usar el cable de carga proporcionado
           2. Limpie el puerto de carga suavemente con un paño seco
           3. Cargue durante al menos 2 horas para una batería completa
           4. Si la batería se agota rápidamente, verifique las actualizaciones de firmware
           5. Contacte con soporte si los problemas persisten después de un reinicio completo`
    },
    {
      id: 'bluetooth',
      title: language === 'en' ? 'Bluetooth Pairing' : 'Emparejamiento Bluetooth',
      icon: <Bluetooth className="h-5 w-5 text-blue-500" />,
      content: language === 'en'
        ? `Having trouble pairing your ${deviceNames[deviceType]} via Bluetooth?
           1. Make sure the device is in pairing mode (usually press and hold the main button)
           2. On your smartphone, go to Bluetooth settings and scan for devices
           3. If the device was previously paired with another phone, reset it first
           4. Ensure no other devices are currently connected to your ${deviceNames[deviceType]}
           5. Try moving away from other electronic devices that might cause interference`
        : `¿Tiene problemas para emparejar su ${deviceNames[deviceType]} a través de Bluetooth?
           1. Asegúrese de que el dispositivo esté en modo de emparejamiento (generalmente mantenga presionado el botón principal)
           2. En su smartphone, vaya a la configuración de Bluetooth y busque dispositivos
           3. Si el dispositivo se emparejó previamente con otro teléfono, reinícielo primero
           4. Asegúrese de que no haya otros dispositivos conectados actualmente a su ${deviceNames[deviceType]}
           5. Intente alejarse de otros dispositivos electrónicos que puedan causar interferencia`
    }
  ];
  
  const deviceSpecificIssues = {
    pendant: [
      {
        id: 'sos-button',
        title: language === 'en' ? 'SOS Button Not Responding' : 'Botón SOS No Responde',
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        content: language === 'en'
          ? `If the SOS button on your pendant is not responding:
             1. Press and hold the button for at least 3 seconds
             2. Check if the LED indicator flashes when pressed
             3. Ensure the device is charged and powered on
             4. Verify the device is properly connected to the app
             5. Perform a device reset by holding power and SOS buttons for 10 seconds`
          : `Si el botón SOS de su colgante no responde:
             1. Mantenga presionado el botón durante al menos 3 segundos
             2. Verifique si el indicador LED parpadea cuando se presiona
             3. Asegúrese de que el dispositivo esté cargado y encendido
             4. Verifique que el dispositivo esté correctamente conectado a la aplicación
             5. Realice un reinicio del dispositivo manteniendo presionados los botones de encendido y SOS durante 10 segundos`
      }
    ],
    monitor: [
      {
        id: 'sensor-readings',
        title: language === 'en' ? 'Inaccurate Sensor Readings' : 'Lecturas Inexactas del Sensor',
        icon: <RefreshCw className="h-5 w-5 text-amber-500" />,
        content: language === 'en'
          ? `If your Health Monitor is showing inaccurate readings:
             1. Make sure the device is worn correctly and snugly against the skin
             2. Clean the sensors with a soft, slightly damp cloth
             3. Recalibrate the device in the app settings
             4. Update to the latest firmware version
             5. Try wearing the device on the other wrist if applicable`
          : `Si su Monitor de Salud muestra lecturas inexactas:
             1. Asegúrese de que el dispositivo se use correctamente y ajustado contra la piel
             2. Limpie los sensores con un paño suave y ligeramente húmedo
             3. Recalibre el dispositivo en la configuración de la aplicación
             4. Actualice a la última versión de firmware
             5. Intente usar el dispositivo en la otra muñeca si es aplicable`
      }
    ],
    dispenser: [
      {
        id: 'dispenser-mechanism',
        title: language === 'en' ? 'Dispensing Mechanism Issues' : 'Problemas del Mecanismo de Dispensación',
        icon: <Settings className="h-5 w-5 text-blue-500" />,
        content: language === 'en'
          ? `If your Medical Dispenser is not dispensing medication properly:
             1. Check if the medication compartments are properly loaded and closed
             2. Ensure the dispenser is on a flat, stable surface
             3. Verify that the correct medication schedule is set in the app
             4. Clean the dispensing mechanism carefully with compressed air
             5. Perform a system reset if problems persist`
          : `Si su Dispensador de Medicamentos no dispensa medicamentos correctamente:
             1. Verifique si los compartimentos de medicamentos están cargados y cerrados correctamente
             2. Asegúrese de que el dispensador esté en una superficie plana y estable
             3. Verifique que el programa correcto de medicamentos esté establecido en la aplicación
             4. Limpie el mecanismo de dispensación cuidadosamente con aire comprimido
             5. Realice un reinicio del sistema si los problemas persisten`
      }
    ]
  };
  
  // Combine common issues with device-specific issues
  const allIssues = [...commonIssues, ...(deviceSpecificIssues[deviceType] || [])];
  
  // Filter issues based on search query
  const filteredIssues = searchQuery 
    ? allIssues.filter(issue => 
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allIssues;
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          {language === 'en' ? 'Troubleshooting Guide' : 'Guía de Solución de Problemas'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? `Find solutions for common ${deviceNames[deviceType]} issues` 
            : `Encuentre soluciones para problemas comunes de ${deviceNames[deviceType]}`}
        </CardDescription>
        <div className="mt-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={language === 'en' ? "Search troubleshooting topics..." : "Buscar temas de solución de problemas..."}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredIssues.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredIssues.map(issue => (
              <AccordionItem key={issue.id} value={issue.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 text-left">
                    {issue.icon}
                    <span>{issue.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 whitespace-pre-line text-muted-foreground">
                    {issue.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-10">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">
              {language === 'en' 
                ? "No troubleshooting topics match your search" 
                : "No hay temas de solución de problemas que coincidan con su búsqueda"}
            </p>
          </div>
        )}
        
        <div className="mt-8 p-4 bg-ice-50 rounded-md border border-ice-100">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-ice-600" />
            {language === 'en' ? 'Need more help?' : '¿Necesita más ayuda?'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'en' 
              ? `If you're still experiencing issues with your ${deviceNames[deviceType]}, please contact our customer support at support@icealarm.es or call us at +34 900 123 456.` 
              : `Si aún experimenta problemas con su ${deviceNames[deviceType]}, comuníquese con nuestro servicio de atención al cliente en support@icealarm.es o llámenos al +34 900 123 456.`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceTroubleshootingGuide;
