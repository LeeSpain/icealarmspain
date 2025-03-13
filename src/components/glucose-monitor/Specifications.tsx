
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
              {language === 'en' ? 'Sensor Life' : 'Vida del Sensor'}
            </h4>
            <p>{language === 'en' ? 'Up to 14 days' : 'Hasta 14 días'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Reading Frequency' : 'Frecuencia de Lectura'}
            </h4>
            <p>{language === 'en' ? 'Every 5 minutes' : 'Cada 5 minutos'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Reading Range' : 'Rango de Lectura'}
            </h4>
            <p>40-500 mg/dL</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Accuracy' : 'Precisión'}
            </h4>
            <p>±10%</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Water Resistance' : 'Resistencia al Agua'}
            </h4>
            <p>{language === 'en' ? 'IP27 (shower-proof)' : 'IP27 (resistente a la ducha)'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Connectivity' : 'Conectividad'}
            </h4>
            <p>{language === 'en' ? 'Bluetooth Low Energy' : 'Bluetooth de baja energía'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Warm-up Period' : 'Período de Calentamiento'}
            </h4>
            <p>{language === 'en' ? 'Approximately 1 hour' : 'Aproximadamente 1 hora'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Included in Package' : 'Incluido en el Paquete'}
            </h4>
            <p>{language === 'en' ? 'Glucose Monitor, 3 sensors, applicator, instructions manual' : 'Monitor de Glucosa, 3 sensores, aplicador, manual de instrucciones'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
