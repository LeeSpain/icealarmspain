
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { getCategoryIcon } from "./utils";
import { useGuardian } from "./GuardianContext";

const KnowledgeAreaSelector: React.FC = () => {
  const { language } = useLanguage();
  const { selectedArea, handleAreaSelect } = useGuardian();
  
  const knowledgeAreas = [
    'services', 'support', 'business', 'appointments'
  ];

  // Function to get area name in selected language
  const getAreaName = (area: string, lang: 'en' | 'es'): string => {
    switch (area) {
      case 'services':
        return lang === 'en' ? 'our services' : 'nuestros servicios';
      case 'support':
        return lang === 'en' ? 'support and troubleshooting' : 'soporte y solución de problemas';
      case 'business':
        return lang === 'en' ? 'business inquiries' : 'consultas de negocio';
      case 'appointments':
        return lang === 'en' ? 'scheduling appointments' : 'programación de citas';
      default:
        return lang === 'en' ? 'general information' : 'información general';
    }
  };

  return (
    <div className="px-4 py-2 bg-guardian-50/50 border-b flex items-center gap-2 overflow-x-auto">
      <span className="text-xs font-medium text-guardian-700 whitespace-nowrap">
        {language === 'en' ? 'I need help with:' : 'Necesito ayuda con:'}
      </span>
      {knowledgeAreas.map(area => (
        <Button
          key={area}
          variant={selectedArea === area ? "default" : "outline"}
          size="sm"
          className={`text-xs whitespace-nowrap ${selectedArea === area 
            ? 'bg-guardian-600 hover:bg-guardian-700' 
            : 'hover:bg-guardian-100'}`}
          onClick={() => handleAreaSelect(area)}
        >
          {getCategoryIcon(area)}
          {getAreaName(area, language === 'en' ? 'en' : 'es')}
        </Button>
      ))}
    </div>
  );
};

export default KnowledgeAreaSelector;
