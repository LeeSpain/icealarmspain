
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
            <p>22 × 18 × 8 cm</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Weight' : 'Peso'}
            </h4>
            <p>650g</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Power Source' : 'Fuente de Energía'}
            </h4>
            <p>{language === 'en' ? 'AC Power with battery backup' : 'Corriente AC con batería de respaldo'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Battery Backup Life' : 'Duración de la Batería de Respaldo'}
            </h4>
            <p>{language === 'en' ? 'Up to 48 hours' : 'Hasta 48 horas'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Capacity' : 'Capacidad'}
            </h4>
            <p>{language === 'en' ? 'Up to 28 doses' : 'Hasta 28 dosis'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Connectivity' : 'Conectividad'}
            </h4>
            <p>Wi-Fi</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Audio' : 'Audio'}
            </h4>
            <p>{language === 'en' ? 'Built-in speaker for reminders' : 'Altavoz incorporado para recordatorios'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              {language === 'en' ? 'Included in Package' : 'Incluido en el Paquete'}
            </h4>
            <p>{language === 'en' ? 'Medical Dispenser, power adapter, dosage cups, user manual' : 'Dispensador Médico, adaptador de corriente, vasos de dosificación, manual de usuario'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
