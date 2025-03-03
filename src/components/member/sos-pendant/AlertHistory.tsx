
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AlertHistory: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Alert History' : 'Historial de Alertas'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Past alerts and events from your SOS Pendant' 
            : 'Alertas y eventos pasados de tu Colgante SOS'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <AlertCircle className="mx-auto h-12 w-12 opacity-50 mb-4" />
          <p>{language === 'en' ? 'No alerts recorded yet' : 'Aún no hay alertas registradas'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertHistory;
