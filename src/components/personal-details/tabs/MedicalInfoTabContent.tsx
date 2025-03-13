
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Clipboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MedicalInfoTabContentProps {
  questionnaireData: any;
}

const InfoField: React.FC<{
  label: string;
  value: string;
  editMode: boolean;
}> = ({ label, value, editMode }) => {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      {editMode ? (
        <input 
          type="text" 
          defaultValue={value} 
          className="w-full p-2 border rounded-md bg-white text-ice-800 placeholder:text-ice-400" 
        />
      ) : (
        <div className="p-2 bg-gray-50 rounded-md border">{value}</div>
      )}
    </div>
  );
};

const MedicalInfoTabContent: React.FC<MedicalInfoTabContentProps> = ({ questionnaireData }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  if (!questionnaireData || !questionnaireData.health) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">
          {language === 'en'
            ? 'No medical information available. Please complete the questionnaire to add your medical information.'
            : 'No hay información médica disponible. Por favor complete el cuestionario para añadir su información médica.'
          }
        </p>
        <Button 
          variant="outline"
          onClick={() => navigate('/dashboard/questionnaire')}
          className="flex items-center gap-2"
        >
          <Clipboard className="h-4 w-4" />
          {language === 'en' 
            ? 'Complete Questionnaire' 
            : 'Completar Cuestionario'}
        </Button>
      </div>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg border-b pb-2">
              {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}
            </h3>
            <div className="space-y-2">
              {questionnaireData.health.conditions && questionnaireData.health.conditions.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {questionnaireData.health.conditions.map((condition: string, index: number) => (
                    <li key={index} className="text-gray-700">{condition}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  {language === 'en' ? 'No medical conditions reported' : 'No se han reportado condiciones médicas'}
                </p>
              )}
            </div>
            
            <h3 className="font-medium text-lg border-b pb-2 mt-6">
              {language === 'en' ? 'Allergies' : 'Alergias'}
            </h3>
            <div className="space-y-2">
              {questionnaireData.health.allergies && questionnaireData.health.allergies.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {questionnaireData.health.allergies.map((allergy: string, index: number) => (
                    <li key={index} className="text-gray-700">{allergy}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  {language === 'en' ? 'No allergies reported' : 'No se han reportado alergias'}
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg border-b pb-2">
              {language === 'en' ? 'Vital Information' : 'Información Vital'}
            </h3>
            
            {questionnaireData.health.vitals ? (
              <div className="grid grid-cols-1 gap-4">
                <InfoField 
                  label={language === 'en' ? 'Height' : 'Altura'}
                  value={`${questionnaireData.health.vitals.height || '-'} cm`}
                  editMode={false}
                />
                
                <InfoField 
                  label={language === 'en' ? 'Weight' : 'Peso'}
                  value={`${questionnaireData.health.vitals.weight || '-'} kg`}
                  editMode={false}
                />
                
                <InfoField 
                  label={language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}
                  value={questionnaireData.health.vitals.bloodPressure || '-'}
                  editMode={false}
                />
                
                <InfoField 
                  label={language === 'en' ? 'Heart Rate' : 'Frecuencia Cardíaca'}
                  value={`${questionnaireData.health.vitals.heartRate || '-'} bpm`}
                  editMode={false}
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {language === 'en' ? 'No vital information available' : 'No hay información vital disponible'}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalInfoTabContent;
