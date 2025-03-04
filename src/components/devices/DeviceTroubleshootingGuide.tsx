
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Language } from "@/context/LanguageContext";

interface DeviceTroubleshootingGuideProps {
  deviceType: 'pendant' | 'monitor' | 'dispenser';
  language: Language;
}

const DeviceTroubleshootingGuide: React.FC<DeviceTroubleshootingGuideProps> = ({ 
  deviceType, 
  language 
}) => {
  const [showAdditionalHelp, setShowAdditionalHelp] = useState(false);
  
  const troubleshootingData = {
    pendant: {
      en: [
        {
          issue: "Device won't power on",
          solution: "Ensure the battery is properly installed and has charge. The SOS Pendant uses a CR2032 battery that should last up to 12 months. If the battery is new and correctly installed but the device still won't power on, press and hold the power button for 10 seconds to perform a reset."
        },
        {
          issue: "SOS button not triggering alerts",
          solution: "Verify that the pendant is connected to your account in the app. Test the connection by navigating to Device Settings and selecting 'Test Connection'. If the connection test fails, ensure your smartphone has Bluetooth enabled and is within range (30 feet/10 meters)."
        },
        {
          issue: "False alarms triggering",
          solution: "Adjust the sensitivity settings in the app under Device Settings > Alert Sensitivity. If false alarms continue, make sure the pendant is worn securely and not subject to excessive movement during normal activities."
        },
        {
          issue: "Pendant not connecting to smartphone",
          solution: "Ensure Bluetooth is enabled on your smartphone and the pendant is within range. If still having issues, go to your smartphone's Bluetooth settings, forget the device, and then pair it again through the ICE Alarm app."
        },
        {
          issue: "App not receiving alerts from pendant",
          solution: "Check that notifications are enabled for the ICE Alarm app in your phone settings. Also verify that the app has necessary permissions for background operation and location access."
        }
      ],
      es: [
        {
          issue: "El dispositivo no enciende",
          solution: "Asegúrese de que la batería esté instalada correctamente y tenga carga. El Colgante SOS utiliza una batería CR2032 que debería durar hasta 12 meses. Si la batería es nueva y está correctamente instalada pero el dispositivo aún no enciende, mantenga presionado el botón de encendido durante 10 segundos para realizar un reinicio."
        },
        {
          issue: "El botón SOS no activa alertas",
          solution: "Verifique que el colgante esté conectado a su cuenta en la aplicación. Pruebe la conexión navegando a Configuración del dispositivo y seleccionando 'Probar conexión'. Si la prueba de conexión falla, asegúrese de que su smartphone tenga Bluetooth habilitado y esté dentro del alcance (30 pies/10 metros)."
        },
        {
          issue: "Falsas alarmas activándose",
          solution: "Ajuste la configuración de sensibilidad en la aplicación en Configuración del dispositivo > Sensibilidad de alerta. Si las falsas alarmas continúan, asegúrese de que el colgante se use de forma segura y no esté sujeto a movimientos excesivos durante las actividades normales."
        },
        {
          issue: "El colgante no se conecta al smartphone",
          solution: "Asegúrese de que el Bluetooth esté habilitado en su smartphone y que el colgante esté dentro del alcance. Si sigue teniendo problemas, vaya a la configuración de Bluetooth de su smartphone, olvide el dispositivo y luego emparéjelo nuevamente a través de la aplicación ICE Alarm."
        },
        {
          issue: "La aplicación no recibe alertas del colgante",
          solution: "Verifique que las notificaciones estén habilitadas para la aplicación ICE Alarm en la configuración de su teléfono. También verifique que la aplicación tenga los permisos necesarios para la operación en segundo plano y el acceso a la ubicación."
        }
      ]
    },
    monitor: {
      en: [
        {
          issue: "Health Monitor showing incorrect readings",
          solution: "Calibrate the device by going to Settings > Calibration. Follow the on-screen instructions to ensure accurate readings. Make sure the sensor is properly placed according to the user manual."
        },
        {
          issue: "Device not syncing data to app",
          solution: "Ensure Bluetooth is enabled and the device is within range of your smartphone. Check that the monitor has sufficient battery power. If problems persist, force close the app, restart your phone, and try again."
        },
        {
          issue: "Continuous reading mode not working",
          solution: "Verify that continuous monitoring is enabled in the app settings. The Health Monitor may automatically disable continuous mode when battery is below 20%. Charge the device and try again."
        },
        {
          issue: "Alerts not triggering for abnormal readings",
          solution: "Check that alert thresholds are correctly set in the app under Health Settings > Alert Thresholds. Ensure your account has emergency contacts configured to receive these alerts."
        },
        {
          issue: "Device charging issues",
          solution: "Use only the provided charging cable and adapter. Ensure the charging contacts on the device are clean. If the device still won't charge, try a different USB port or adapter. Contact support if issues persist."
        }
      ],
      es: [
        {
          issue: "El Monitor de Salud muestra lecturas incorrectas",
          solution: "Calibre el dispositivo yendo a Configuración > Calibración. Siga las instrucciones en pantalla para asegurar lecturas precisas. Asegúrese de que el sensor esté colocado correctamente según el manual del usuario."
        },
        {
          issue: "El dispositivo no sincroniza datos con la aplicación",
          solution: "Asegúrese de que el Bluetooth esté habilitado y el dispositivo esté dentro del alcance de su smartphone. Verifique que el monitor tenga suficiente batería. Si los problemas persisten, cierre forzosamente la aplicación, reinicie su teléfono e intente nuevamente."
        },
        {
          issue: "El modo de lectura continua no funciona",
          solution: "Verifique que el monitoreo continuo esté habilitado en la configuración de la aplicación. El Monitor de Salud puede desactivar automáticamente el modo continuo cuando la batería está por debajo del 20%. Cargue el dispositivo e intente nuevamente."
        },
        {
          issue: "Las alertas no se activan para lecturas anormales",
          solution: "Verifique que los umbrales de alerta estén correctamente establecidos en la aplicación en Configuración de Salud > Umbrales de Alerta. Asegúrese de que su cuenta tenga contactos de emergencia configurados para recibir estas alertas."
        },
        {
          issue: "Problemas de carga del dispositivo",
          solution: "Utilice solo el cable y adaptador de carga proporcionados. Asegúrese de que los contactos de carga en el dispositivo estén limpios. Si el dispositivo aún no se carga, pruebe con un puerto o adaptador USB diferente. Contacte a soporte si los problemas persisten."
        }
      ]
    },
    dispenser: {
      en: [
        {
          issue: "Medication dispenser not releasing pills at scheduled times",
          solution: "Verify that the medication schedule is correctly programmed in the app. Check that the dispenser has power and is connected to WiFi. Ensure the medication tray is properly loaded and not jammed."
        },
        {
          issue: "Dispenser showing 'Tray Error'",
          solution: "Remove the medication tray completely, check for any obstructions or stuck pills, then reinsert the tray firmly until you hear a click. If the error persists, clean the tray sensors with a dry cloth."
        },
        {
          issue: "Missed dose notifications not working",
          solution: "Check app notification permissions on your phone. Verify that your dispenser is connected to WiFi. If using a caregiver account, ensure that dose notifications are enabled in Settings > Care Preferences."
        },
        {
          issue: "WiFi connection issues",
          solution: "Place the dispenser closer to your WiFi router. Check that your home WiFi is working properly. Reset the dispenser's WiFi connection by holding the reset button for 10 seconds, then set up the connection again in the app."
        },
        {
          issue: "Battery draining too quickly",
          solution: "The backup battery is designed for emergency use only. Make sure the dispenser is plugged into a power outlet for normal operation. If the battery still drains when plugged in, contact customer support as this may indicate a hardware issue."
        }
      ],
      es: [
        {
          issue: "El dispensador de medicamentos no libera píldoras en los horarios programados",
          solution: "Verifique que el horario de medicación esté correctamente programado en la aplicación. Compruebe que el dispensador tenga energía y esté conectado a WiFi. Asegúrese de que la bandeja de medicamentos esté cargada adecuadamente y no esté atascada."
        },
        {
          issue: "El dispensador muestra 'Error de Bandeja'",
          solution: "Retire completamente la bandeja de medicamentos, verifique si hay obstrucciones o píldoras atascadas, luego vuelva a insertar la bandeja firmemente hasta que escuche un clic. Si el error persiste, limpie los sensores de la bandeja con un paño seco."
        },
        {
          issue: "Las notificaciones de dosis perdidas no funcionan",
          solution: "Verifique los permisos de notificación de la aplicación en su teléfono. Compruebe que su dispensador esté conectado a WiFi. Si usa una cuenta de cuidador, asegúrese de que las notificaciones de dosis estén habilitadas en Configuración > Preferencias de Cuidado."
        },
        {
          issue: "Problemas de conexión WiFi",
          solution: "Coloque el dispensador más cerca de su router WiFi. Verifique que su WiFi doméstica funcione correctamente. Restablezca la conexión WiFi del dispensador manteniendo presionado el botón de reinicio durante 10 segundos, luego configure la conexión nuevamente en la aplicación."
        },
        {
          issue: "La batería se agota demasiado rápido",
          solution: "La batería de respaldo está diseñada solo para uso de emergencia. Asegúrese de que el dispensador esté conectado a una toma de corriente para el funcionamiento normal. Si la batería aún se agota cuando está enchufada, contacte al servicio de atención al cliente, ya que esto puede indicar un problema de hardware."
        }
      ]
    }
  };
  
  const contentData = troubleshootingData[deviceType][language as 'en' | 'es'];
  
  const handleContactSupport = () => {
    // In a real implementation, this would open a support chat or form
    setShowAdditionalHelp(true);
  };
  
  const supportText = {
    en: {
      title: "Need additional help?",
      contactSupport: "Contact Support",
      additionalHelp: "If you're still experiencing issues with your device, our support team is available 24/7 to assist you.",
      callUs: "Call us at 1-800-ICE-HELP",
      emailUs: "Email: support@icealarm.com",
      supportHours: "Support hours: 24/7"
    },
    es: {
      title: "¿Necesitas ayuda adicional?",
      contactSupport: "Contactar Soporte",
      additionalHelp: "Si aún experimenta problemas con su dispositivo, nuestro equipo de soporte está disponible 24/7 para ayudarlo.",
      callUs: "Llámenos al 1-800-ICE-HELP",
      emailUs: "Email: soporte@icealarm.com",
      supportHours: "Horario de soporte: 24/7"
    }
  };
  
  const support = language === 'en' ? supportText.en : supportText.es;
  
  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <HelpCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          {language === 'en' 
            ? 'Common troubleshooting steps for your device.' 
            : 'Pasos comunes de solución de problemas para su dispositivo.'}
        </AlertDescription>
      </Alert>
      
      <Accordion type="single" collapsible className="w-full">
        {contentData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="py-4 flex hover:bg-ice-50 px-3 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                <span>{item.issue}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-10 pr-4 pb-4 text-gray-600">
              {item.solution}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">{support.title}</h3>
        
        {!showAdditionalHelp ? (
          <Button 
            onClick={handleContactSupport}
            variant="outline" 
            className="w-full"
          >
            {support.contactSupport}
          </Button>
        ) : (
          <div className="space-y-4 p-4 border rounded-md bg-ice-50">
            <p>{support.additionalHelp}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>{support.callUs}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>{support.emailUs}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>{support.supportHours}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceTroubleshootingGuide;
