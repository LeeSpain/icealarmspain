
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const ReadingsHistory: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Glucose Readings' : 'Lecturas de Glucosa'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Detailed history of your glucose readings' 
            : 'Historial detallado de tus lecturas de glucosa'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'en' 
            ? 'Detailed readings would appear here.' 
            : 'Las lecturas detalladas aparecerían aquí.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReadingsHistory;
