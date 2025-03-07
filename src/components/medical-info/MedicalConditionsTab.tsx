
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

interface MedicalConditionsTabProps {
  editMode: boolean;
  medicalData: any;
  onUpdate: (section: string, field: string, value: string) => void;
}

const MedicalConditionsTab: React.FC<MedicalConditionsTabProps> = ({ 
  editMode, 
  medicalData, 
  onUpdate 
}) => {
  const { language } = useLanguage();
  
  if (!medicalData || !medicalData.health || !medicalData.health.conditions) {
    return <EmptyDataState type="conditions" />;
  }
  
  const conditions = medicalData.health.conditions || [];
  
  return (
    <Card>
      <CardContent className="p-6">
        {conditions.length > 0 ? (
          <div className="space-y-4">
            {conditions.map((condition: string, index: number) => (
              <div key={index} className="p-3 bg-white border rounded-md shadow-sm">
                {editMode ? (
                  <input 
                    type="text" 
                    defaultValue={condition} 
                    className="w-full p-2 border rounded" 
                    onChange={(e) => onUpdate('conditions', index.toString(), e.target.value)}
                  />
                ) : (
                  <p>{condition}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyDataState type="conditions" />
        )}
      </CardContent>
    </Card>
  );
};

// Empty State Component
export const EmptyDataState: React.FC<{type: 'conditions' | 'vitals' | 'allergies'}> = ({ type }) => {
  const { language } = useLanguage();
  
  const messages = {
    conditions: {
      en: 'No medical conditions recorded. Please complete the health questionnaire.',
      es: 'No hay condiciones médicas registradas. Por favor complete el cuestionario de salud.'
    },
    vitals: {
      en: 'No vital records available. Please complete the health questionnaire.',
      es: 'No hay registros vitales disponibles. Por favor complete el cuestionario de salud.'
    },
    allergies: {
      en: 'No allergies recorded. Please complete the health questionnaire.',
      es: 'No hay alergias registradas. Por favor complete el cuestionario de salud.'
    }
  };
  
  return (
    <div className="text-center py-8">
      <p className="text-gray-500">
        {language === 'en' ? messages[type].en : messages[type].es}
      </p>
    </div>
  );
};

export default MedicalConditionsTab;
