
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const MedicationScheduleManagement: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Medication Schedule' : 'Horario de Medicamentos'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Set and view your medication schedules' 
            : 'Establece y visualiza los horarios de tus medicamentos'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' 
            ? 'Medication schedules would appear here.' 
            : 'Los horarios de medicamentos aparecerían aquí.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default MedicationScheduleManagement;
