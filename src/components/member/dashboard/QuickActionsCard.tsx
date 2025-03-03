
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { Smile, Bell, Activity, Settings, ShoppingCart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QuickActionsCardProps {
  hasDevices: boolean;
  onShowAddProducts: () => void;
}

export const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ hasDevices, onShowAddProducts }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smile className="h-5 w-5 text-ice-500" />
          <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        {hasDevices ? (
          <>
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Test Alarm' : 'Probar Alarma'}
            </Button>
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              {language === 'en' ? 'View Reports' : 'Ver Informes'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/profile')}
            >
              <FileText className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Personal Details' : 'Datos Personales'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Account Settings' : 'Configuración de Cuenta'}
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline"
              onClick={onShowAddProducts}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Shop Devices' : 'Comprar Dispositivos'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/onboarding')}
            >
              <FileText className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Complete Personal Details' : 'Completar Datos Personales'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Account Settings' : 'Configuración de Cuenta'}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
