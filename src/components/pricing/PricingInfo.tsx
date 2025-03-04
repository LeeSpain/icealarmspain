
import React from "react";
import { Shield, Check, Truck } from "lucide-react";

interface PricingInfoProps {
  language: string;
}

const PricingInfo: React.FC<PricingInfoProps> = ({ language }) => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="max-w-3xl mx-auto bg-white border border-ice-100 rounded-xl p-6 mb-12 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {language === 'en' ? "How Device Connections Work" : "Cómo Funcionan las Conexiones de Dispositivos"}
        </h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-start">
            <div className="bg-ice-100 rounded-full p-2 mr-4 flex-shrink-0">
              <Shield className="h-5 w-5 text-ice-600" />
            </div>
            <div>
              <h4 className="font-medium mb-1">
                {language === 'en' ? "One AI Guardian Service" : "Un Servicio AI Guardian"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "All devices connect to your single AI Guardian service. Adding devices does not create multiple AI Guardian services or enhance its features."
                  : "Todos los dispositivos se conectan a su único servicio AI Guardian. Agregar dispositivos no crea múltiples servicios AI Guardian ni mejora sus características."}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-ice-100 rounded-full p-2 mr-4 flex-shrink-0">
              <Check className="h-5 w-5 text-ice-600" />
            </div>
            <div>
              <h4 className="font-medium mb-1">
                {language === 'en' ? "Device-Specific Features" : "Características Específicas del Dispositivo"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "Each device adds its unique monitoring capabilities to your existing service. For example, adding a medication dispenser provides medication management features only."
                  : "Cada dispositivo agrega sus capacidades únicas de monitoreo a su servicio existente. Por ejemplo, agregar un dispensador de medicamentos proporciona únicamente funciones de gestión de medicamentos."}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-ice-100 rounded-full p-2 mr-4 flex-shrink-0">
              <Truck className="h-5 w-5 text-ice-600" />
            </div>
            <div>
              <h4 className="font-medium mb-1">
                {language === 'en' ? "Simple Device Setup" : "Configuración Simple de Dispositivos"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "All devices are shipped directly to your door with easy setup instructions. Our support team is available to help with installation if needed."
                  : "Todos los dispositivos se envían directamente a su puerta con instrucciones de configuración sencillas. Nuestro equipo de soporte está disponible para ayudar con la instalación si es necesario."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInfo;
