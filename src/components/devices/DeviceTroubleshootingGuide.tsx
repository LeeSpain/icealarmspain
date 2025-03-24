
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Info, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface DeviceTroubleshootingGuideProps {
  deviceType: string;
  language: string;
}

const DeviceTroubleshootingGuide: React.FC<DeviceTroubleshootingGuideProps> = ({ deviceType, language }) => {
  // Determine common issues based on device type
  const getCommonIssues = () => {
    switch(deviceType) {
      case 'pendant':
        return language === 'en' 
          ? [
              { 
                title: "SOS Button Not Responding", 
                solution: "Ensure the battery is charged. If the problem persists, try resetting the device by holding the side button for 10 seconds." 
              },
              { 
                title: "False Alarm Triggers", 
                solution: "Adjust the sensitivity settings in the mobile app. Go to Device Settings > SOS Pendant > Sensitivity and set it to a higher threshold." 
              },
              { 
                title: "Not Connecting to App", 
                solution: "Make sure Bluetooth is enabled on your phone. Try moving the pendant closer to your phone and restart the app." 
              }
            ]
          : [
              { 
                title: "Botón SOS No Responde", 
                solution: "Asegúrese de que la batería esté cargada. Si el problema persiste, intente reiniciar el dispositivo manteniendo presionado el botón lateral durante 10 segundos." 
              },
              { 
                title: "Activaciones de Alarma Falsas", 
                solution: "Ajuste la configuración de sensibilidad en la aplicación móvil. Vaya a Configuración del Dispositivo > Colgante SOS > Sensibilidad y establézcala en un umbral más alto." 
              },
              { 
                title: "No Se Conecta a la Aplicación", 
                solution: "Asegúrese de que el Bluetooth esté habilitado en su teléfono. Intente acercar el colgante a su teléfono y reinicie la aplicación." 
              }
            ];
      case 'monitor':
        return language === 'en' 
          ? [
              { 
                title: "Inaccurate Readings", 
                solution: "Clean the sensor area with alcohol wipe. Calibrate the device using the app's calibration wizard." 
              },
              { 
                title: "Battery Drains Quickly", 
                solution: "Check for app updates as this may be a known issue. Reduce reading frequency in settings to conserve battery." 
              },
              { 
                title: "Data Not Syncing", 
                solution: "Ensure you have internet connectivity. Open the app while the device is nearby to force a sync." 
              }
            ]
          : [
              { 
                title: "Lecturas Inexactas", 
                solution: "Limpie el área del sensor con una toallita con alcohol. Calibre el dispositivo usando el asistente de calibración de la aplicación." 
              },
              { 
                title: "La Batería Se Agota Rápidamente", 
                solution: "Busque actualizaciones de la aplicación, ya que este puede ser un problema conocido. Reduzca la frecuencia de lectura en la configuración para conservar la batería." 
              },
              { 
                title: "Los Datos No Se Sincronizan", 
                solution: "Asegúrese de tener conectividad a Internet. Abra la aplicación mientras el dispositivo está cerca para forzar una sincronización." 
              }
            ];
      case 'dispenser':
        return language === 'en' 
          ? [
              { 
                title: "Dispenser Jams", 
                solution: "Open the dispenser lid and check for any obstructions. Make sure pills are placed correctly in their compartments." 
              },
              { 
                title: "Alarm Not Sounding", 
                solution: "Check volume settings in the app. Ensure notifications are enabled on your phone." 
              },
              { 
                title: "Incorrect Dispensing Time", 
                solution: "Verify time zone settings in the app. Resync the schedule from the app to the device." 
              }
            ]
          : [
              { 
                title: "Atascos del Dispensador", 
                solution: "Abra la tapa del dispensador y compruebe si hay obstrucciones. Asegúrese de que las píldoras estén colocadas correctamente en sus compartimentos." 
              },
              { 
                title: "La Alarma No Suena", 
                solution: "Verifique la configuración de volumen en la aplicación. Asegúrese de que las notificaciones estén habilitadas en su teléfono." 
              },
              { 
                title: "Hora de Dispensación Incorrecta", 
                solution: "Verifique la configuración de zona horaria en la aplicación. Resincronice el horario desde la aplicación al dispositivo." 
              }
            ];
      default:
        return [];
    }
  };
  
  const commonIssues = getCommonIssues();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-primary" />
            {language === 'en' ? 'Troubleshooting Guide' : 'Guía de Solución de Problemas'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>
              {language === 'en' ? 'Need Additional Help?' : '¿Necesita Ayuda Adicional?'}
            </AlertTitle>
            <AlertDescription>
              {language === 'en' 
                ? 'Contact our support team if these suggestions don\'t resolve your issue.' 
                : 'Póngase en contacto con nuestro equipo de soporte si estas sugerencias no resuelven su problema.'}
            </AlertDescription>
          </Alert>
          
          <h3 className="text-lg font-medium mb-3">
            {language === 'en' ? 'Common Issues' : 'Problemas Comunes'}
          </h3>
          
          <Accordion type="single" collapsible className="w-full">
            {commonIssues.map((issue, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                    {issue.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 border-l-2 border-primary/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <p>{issue.solution}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceTroubleshootingGuide;
