
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface NoMedicalDataProps {
  handleCompleteQuestionnaire: () => void;
}

const NoMedicalData: React.FC<NoMedicalDataProps> = ({ handleCompleteQuestionnaire }) => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-gray-500 mb-4">
          {language === 'en' 
            ? 'No medical information found. Please complete the health questionnaire to see your data here.' 
            : 'No se encontró información médica. Por favor complete el cuestionario de salud para ver sus datos aquí.'}
        </p>
        <Button 
          className="bg-ice-600 hover:bg-ice-700"
          onClick={handleCompleteQuestionnaire}
        >
          {language === 'en' ? 'Complete Questionnaire' : 'Completar Cuestionario'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoMedicalData;
