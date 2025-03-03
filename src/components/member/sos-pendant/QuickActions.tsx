
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const QuickActions: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Configure Alerts' : 'Configurar Alertas'}
        </Button>
        <Button variant="outline" size="sm">
          {language === 'en' ? 'Update Emergency Contacts' : 'Actualizar Contactos de Emergencia'}
        </Button>
        <Button variant="outline" size="sm">
          {language === 'en' ? 'View User Manual' : 'Ver Manual de Usuario'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
