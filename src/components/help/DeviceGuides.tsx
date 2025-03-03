
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";
import { getDevices } from "@/components/devices/deviceData";

interface DeviceGuidesProps {
  searchQuery: string;
}

const DeviceGuides: React.FC<DeviceGuidesProps> = ({ searchQuery }) => {
  const { language } = useLanguage();
  const devices = getDevices(language);
  
  // Filter devices based on search query
  const filteredDevices = searchQuery 
    ? devices.filter(device => 
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : devices;
  
  const guideContent = {
    en: {
      setup: "Setup Guide",
      troubleshooting: "Troubleshooting",
      maintenance: "Maintenance",
      setupSteps: [
        "Unbox your device and remove all packaging materials",
        "Charge the device fully before first use (approximately 2-3 hours)",
        "Download the ICE Alarm mobile app from App Store or Google Play",
        "Create or login to your ICE Alarm account",
        "Follow the in-app instructions to pair your device",
        "Place the device in its recommended location or wear as instructed",
        "Test the device functionality using the Test button in your app"
      ],
      troubleshootingSteps: [
        "Device not powering on: Ensure it's charged. Hold power button for 10 seconds to reset.",
        "Not connecting to app: Check Bluetooth is enabled on your phone. Restart both device and app.",
        "False alarms: Adjust sensitivity settings in app. Ensure proper placement.",
        "Battery draining quickly: Update firmware in app. Check for background processes.",
        "Sync issues: Ensure your app is updated to the latest version.",
        "Poor signal: Move device closer to WiFi router or cellular coverage area."
      ],
      maintenanceSteps: [
        "Clean with a soft, dry cloth - never use harsh chemicals",
        "Charge regularly, ideally when battery reaches 30%",
        "Keep away from extreme temperatures and moisture",
        "Update firmware when prompted by the app",
        "Replace batteries (if applicable) as recommended",
        "Perform monthly test to ensure proper functionality"
      ],
      download: "Download PDF",
      print: "Print Guide",
      share: "Share Guide"
    },
    es: {
      setup: "Guía de Configuración",
      troubleshooting: "Solución de Problemas",
      maintenance: "Mantenimiento",
      setupSteps: [
        "Desembale su dispositivo y retire todos los materiales de embalaje",
        "Cargue completamente el dispositivo antes del primer uso (aproximadamente 2-3 horas)",
        "Descargue la aplicación móvil ICE Alarm desde App Store o Google Play",
        "Cree o inicie sesión en su cuenta de ICE Alarm",
        "Siga las instrucciones en la aplicación para emparejar su dispositivo",
        "Coloque el dispositivo en su ubicación recomendada o úselo según las instrucciones",
        "Pruebe la funcionalidad del dispositivo usando el botón Probar en su aplicación"
      ],
      troubleshootingSteps: [
        "El dispositivo no enciende: Asegúrese de que esté cargado. Mantenga presionado el botón de encendido durante 10 segundos para reiniciar.",
        "No se conecta a la aplicación: Verifique que el Bluetooth esté habilitado en su teléfono. Reinicie tanto el dispositivo como la aplicación.",
        "Falsas alarmas: Ajuste la configuración de sensibilidad en la aplicación. Asegure la colocación adecuada.",
        "La batería se agota rápidamente: Actualice el firmware en la aplicación. Verifique los procesos en segundo plano.",
        "Problemas de sincronización: Asegúrese de que su aplicación esté actualizada a la última versión.",
        "Señal deficiente: Mueva el dispositivo más cerca del router WiFi o del área de cobertura celular."
      ],
      maintenanceSteps: [
        "Limpie con un paño suave y seco - nunca use productos químicos agresivos",
        "Cargue regularmente, idealmente cuando la batería llegue al 30%",
        "Mantenga alejado de temperaturas extremas y humedad",
        "Actualice el firmware cuando se lo indique la aplicación",
        "Reemplace las baterías (si corresponde) según lo recomendado",
        "Realice pruebas mensuales para garantizar el funcionamiento adecuado"
      ],
      download: "Descargar PDF",
      print: "Imprimir Guía",
      share: "Compartir Guía"
    }
  };
  
  const content = language === 'en' ? guideContent.en : guideContent.es;
  
  return (
    <div className="space-y-6">
      {filteredDevices.length > 0 ? (
        filteredDevices.map((device, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-ice-50">
              <CardTitle className="flex items-center">
                <span className="mr-2">{device.name}</span>
              </CardTitle>
              <CardDescription>{device.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="setup">
                <TabsList className="mb-4">
                  <TabsTrigger value="setup">{content.setup}</TabsTrigger>
                  <TabsTrigger value="troubleshooting">{content.troubleshooting}</TabsTrigger>
                  <TabsTrigger value="maintenance">{content.maintenance}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="setup">
                  <div className="space-y-4">
                    <ol className="list-decimal pl-5 space-y-2">
                      {content.setupSteps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
                
                <TabsContent value="troubleshooting">
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {content.troubleshootingSteps.map((step, i) => (
                        <li key={i} className="pb-2 border-b border-gray-100 last:border-0">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="maintenance">
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {content.maintenanceSteps.map((step, i) => (
                        <li key={i} className="pb-2 border-b border-gray-100 last:border-0">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-between">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {content.download}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  {content.print}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  {content.share}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'No device guides match your search criteria. Try a different search term.' 
              : 'Ninguna guía de dispositivo coincide con su criterio de búsqueda. Intente con un término diferente.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeviceGuides;
