
import React from "react";
import { BellRing, Check, Wifi, MessageSquare, Battery } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HowItWorks: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'How the SOS Pendant Works' : 'Cómo Funciona el Colgante SOS'}
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-orange-100 p-3 rounded-full mr-4">
            <BellRing className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Emergency Button' : 'Botón de Emergencia'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Press and hold the SOS button for 3 seconds to activate an emergency call to our 24/7 monitoring center.' 
                : 'Mantén presionado el botón SOS durante 3 segundos para activar una llamada de emergencia a nuestro centro de monitoreo 24/7.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Check className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Fall Detection' : 'Detección de Caídas'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? "The built-in accelerometer automatically detects falls. If a fall is detected, the pendant initiates a 30-second countdown before calling for help, allowing you to cancel if it's a false alarm." 
                : 'El acelerómetro incorporado detecta automáticamente caídas. Si se detecta una caída, el colgante inicia una cuenta regresiva de 30 segundos antes de llamar para pedir ayuda, permitiéndote cancelar si es una falsa alarma.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Wifi className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'GPS Tracking' : 'Seguimiento GPS'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'The pendant transmits your precise location to our monitoring center and authorized contacts during an emergency.' 
                : 'El colgante transmite tu ubicación precisa a nuestro centro de monitoreo y contactos autorizados durante una emergencia.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <MessageSquare className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Two-Way Communication' : 'Comunicación Bidireccional'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'The built-in speaker and microphone allow for clear two-way communication with our monitoring center during emergencies.' 
                : 'El altavoz y micrófono incorporados permiten una comunicación bidireccional clara con nuestro centro de monitoreo durante emergencias.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <Battery className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h4 className="font-medium">
              {language === 'en' ? 'Battery Alerts' : 'Alertas de Batería'}
            </h4>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Receive alerts when the battery is running low. The pendant also sends notifications to our monitoring center if the battery reaches critically low levels.' 
                : 'Recibe alertas cuando la batería está baja. El colgante también envía notificaciones a nuestro centro de monitoreo si la batería alcanza niveles críticamente bajos.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
