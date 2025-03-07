
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { PlusCircle, Pencil, Trash } from "lucide-react";

interface MedicationsTabContentProps {
  editMode: boolean;
  questionnaireData: any;
}

const MedicationsTabContent: React.FC<MedicationsTabContentProps> = ({ 
  editMode,
  questionnaireData
}) => {
  const { language } = useLanguage();
  
  // Extract medications from questionnaire data
  const medications = questionnaireData?.multiEntries?.medications || [];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-lg">
            {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'}
          </h3>
          
          {editMode && (
            <Button size="sm" className="bg-ice-600 hover:bg-ice-700">
              <PlusCircle className="h-4 w-4 mr-1" />
              {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
            </Button>
          )}
        </div>
        
        {medications.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border">
            <p className="text-gray-500">
              {language === 'en'
                ? 'No medications have been added yet.'
                : 'No se han añadido medicamentos todavía.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {medications.map((medication: any, index: number) => (
              <MedicationCard 
                key={medication._id || index}
                medication={medication}
                editMode={editMode}
                language={language === 'en' ? 'en' : 'es'}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface MedicationCardProps {
  medication: any;
  editMode: boolean;
  language: 'en' | 'es';
}

const MedicationCard: React.FC<MedicationCardProps> = ({ 
  medication, 
  editMode,
  language
}) => {
  return (
    <div className="p-4 border rounded-md bg-white relative">
      {editMode && (
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="icon" variant="ghost" className="h-7 w-7">
            <Pencil className="h-4 w-4 text-gray-500" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:text-red-700">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="font-medium text-lg">{medication.name || '-'}</div>
          <div className="mt-1 text-sm text-gray-500">
            {language === 'en' ? 'Dosage:' : 'Dosis:'} {medication.dosage || '-'}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {language === 'en' ? 'Frequency:' : 'Frecuencia:'} {medication.frequency || '-'}
          </div>
        </div>
        
        <div>
          <div className="text-sm">
            <span className="font-medium">
              {language === 'en' ? 'Purpose:' : 'Propósito:'}
            </span> {medication.purpose || '-'}
          </div>
          <div className="text-sm mt-1">
            <span className="font-medium">
              {language === 'en' ? 'Prescribing Doctor:' : 'Médico Prescriptor:'}
            </span> {medication.doctor || '-'}
          </div>
          <div className="text-sm mt-1">
            <span className="font-medium">
              {language === 'en' ? 'Start Date:' : 'Fecha de Inicio:'}
            </span> {medication.startDate || '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationsTabContent;
