
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DeviceTroubleshootingGuide: React.FC = () => {
  const { language } = useLanguage();
  const [showMoreTips, setShowMoreTips] = useState(false);
  
  // Common troubleshooting tips
  const troubleshootingTips = [
    {
      title: language === 'en' ? "Device Not Powering On" : "El Dispositivo No Enciende",
      content: language === 'en' 
        ? "Check that the device is properly charged or has fresh batteries. Try holding the power button for 5-10 seconds to force restart." 
        : "Verifique que el dispositivo esté correctamente cargado o tenga baterías nuevas. Intente mantener presionado el botón de encendido durante 5-10 segundos para forzar el reinicio."
    },
    {
      title: language === 'en' ? "Connection Issues" : "Problemas de Conexión",
      content: language === 'en'
        ? "Ensure your home WiFi is working properly. Try restarting your router and the device. Make sure the device is within range of your WiFi signal."
        : "Asegúrese de que su WiFi doméstico funcione correctamente. Intente reiniciar su router y el dispositivo. Asegúrese de que el dispositivo esté dentro del alcance de la señal WiFi."
    },
    {
      title: language === 'en' ? "Alerts Not Working" : "Las Alertas No Funcionan",
      content: language === 'en'
        ? "Check the device settings to ensure alerts are enabled. Verify that the emergency contacts are correctly configured in your account."
        : "Revise la configuración del dispositivo para asegurarse de que las alertas estén habilitadas. Verifique que los contactos de emergencia estén configurados correctamente en su cuenta."
    }
  ];
  
  // Additional tips shown when "Show More Tips" is clicked
  const additionalTips = [
    {
      title: language === 'en' ? "Battery Draining Quickly" : "La Batería Se Agota Rápidamente",
      content: language === 'en'
        ? "Check if there are any background features running that could be draining the battery. Try lowering screen brightness or reducing alert frequency if applicable."
        : "Verifique si hay funciones en segundo plano que podrían estar agotando la batería. Intente reducir el brillo de la pantalla o reducir la frecuencia de las alertas si corresponde."
    },
    {
      title: language === 'en' ? "Inaccurate Readings" : "Lecturas Inexactas",
      content: language === 'en'
        ? "Ensure the device is worn or positioned correctly according to the user manual. Try recalibrating the device using the settings menu."
        : "Asegúrese de que el dispositivo se use o se coloque correctamente según el manual del usuario. Intente recalibrar el dispositivo utilizando el menú de configuración."
    }
  ];
  
  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">
        {language === 'en' ? "Troubleshooting Guide" : "Guía de Solución de Problemas"}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {language === 'en' 
          ? "Here are some common issues and their solutions. If you continue experiencing problems, please contact our support team." 
          : "Aquí hay algunos problemas comunes y sus soluciones. Si continúa experimentando problemas, comuníquese con nuestro equipo de soporte."}
      </p>
      
      <Accordion type="single" collapsible className="mb-6">
        {troubleshootingTips.map((tip, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium">{tip.title}</AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              {tip.content}
            </AccordionContent>
          </AccordionItem>
        ))}
        
        {showMoreTips && additionalTips.map((tip, index) => (
          <AccordionItem key={`additional-${index}`} value={`additional-${index}`}>
            <AccordionTrigger className="text-lg font-medium">{tip.title}</AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              {tip.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      {!showMoreTips && (
        <Button 
          variant="outline" 
          onClick={() => setShowMoreTips(true)}
          className="mb-6"
        >
          {language === 'en' ? "Show More Tips" : "Mostrar Más Consejos"}
        </Button>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          {language === 'en' ? "Contact Support" : "Contactar con Soporte"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {language === 'en' 
            ? "Still having issues? Enter your device ID below and we'll help troubleshoot your specific device." 
            : "¿Todavía tiene problemas? Ingrese su ID de dispositivo a continuación y le ayudaremos a solucionar su dispositivo específico."}
        </p>
        
        <div className="flex gap-4">
          <Input 
            placeholder={language === 'en' ? "Enter device ID" : "Ingrese ID del dispositivo"} 
            className="max-w-xs"
          />
          <Button>
            {language === 'en' ? "Submit" : "Enviar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeviceTroubleshootingGuide;
