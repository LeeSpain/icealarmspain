
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { InfoField } from "./InfoField";
import { EmptyDataState } from "./MedicalConditionsTab";

interface VitalsTabProps {
  editMode: boolean;
  medicalData: any;
  onUpdate: (section: string, field: string, value: string) => void;
}

const VitalsTab: React.FC<VitalsTabProps> = ({ 
  editMode, 
  medicalData, 
  onUpdate 
}) => {
  const { language } = useLanguage();
  
  if (!medicalData || !medicalData.health) {
    return <EmptyDataState type="vitals" />;
  }
  
  const vitals = {
    bloodType: medicalData.health.bloodType || '-',
    weight: medicalData.health.weight || '-',
    height: medicalData.health.height || '-',
    bloodPressure: medicalData.health.bloodPressure || '-'
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField 
            label={language === 'en' ? 'Blood Type' : 'Tipo de Sangre'}
            value={vitals.bloodType}
            editMode={editMode}
            onChange={(value) => onUpdate('vitals', 'bloodType', value)}
          />
          <InfoField 
            label={language === 'en' ? 'Weight' : 'Peso'}
            value={vitals.weight}
            editMode={editMode}
            onChange={(value) => onUpdate('vitals', 'weight', value)}
          />
          <InfoField 
            label={language === 'en' ? 'Height' : 'Altura'}
            value={vitals.height}
            editMode={editMode}
            onChange={(value) => onUpdate('vitals', 'height', value)}
          />
          <InfoField 
            label={language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}
            value={vitals.bloodPressure}
            editMode={editMode}
            onChange={(value) => onUpdate('vitals', 'bloodPressure', value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalsTab;
