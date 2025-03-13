
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Specifications: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'Technical Specifications' : 'Especificaciones Técnicas'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Dimensions' : 'Dimensiones'}
            </h4>
            <p>4.5 × 3.2 × 1.2 cm</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Weight' : 'Peso'}
            </h4>
            <p>35g</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Battery Life' : 'Duración de la Batería'}
            </h4>
            <p>{language === 'en' ? 'Up to 7 days' : 'Hasta 7 días'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Charging Time' : 'Tiempo de Carga'}
            </h4>
            <p>{language === 'en' ? 'Approximately 2 hours' : 'Aproximadamente 2 horas'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Water Resistance' : 'Resistencia al Agua'}
            </h4>
            <p>{language === 'en' ? 'IP67 (water resistant)' : 'IP67 (resistente al agua)'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Connectivity' : 'Conectividad'}
            </h4>
            <p>{language === 'en' ? '4G LTE & Bluetooth' : '4G LTE y Bluetooth'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'GPS Accuracy' : 'Precisión GPS'}
            </h4>
            <p>{language === 'en' ? 'Within 5 meters' : 'Dentro de 5 metros'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Included in Package' : 'Incluido en el Paquete'}
            </h4>
            <p>{language === 'en' ? 'SOS Pendant, charging dock, lanyard, belt clip, user manual' : 'Colgante SOS, base de carga, cordón, clip para cinturón, manual de usuario'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
