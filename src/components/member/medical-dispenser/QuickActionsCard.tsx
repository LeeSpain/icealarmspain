
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Settings } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const QuickActionsCard: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm">
          <Pill className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Configure Alerts' : 'Configurar Alertas'}
        </Button>
        <Button variant="outline" size="sm">
          {language === 'en' ? 'Order Refills' : 'Pedir Recambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
