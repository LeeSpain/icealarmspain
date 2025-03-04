
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const MedicationManagement: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'My Medications' : 'Mis Medicamentos'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Manage medications in your dispenser' 
            : 'Gestiona los medicamentos en tu dispensador'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' 
            ? 'Detailed medication management would appear here.' 
            : 'La gestión detallada de medicamentos aparecería aquí.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default MedicationManagement;
