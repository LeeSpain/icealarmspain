
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { Smile, Bell, Activity, Settings, ShoppingCart, FileText, HelpCircle, PhoneCall } from "lucide-react";
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
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Smile className="h-5 w-5 text-ice-500" />
          <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {hasDevices ? (
          <>
            <Button variant="outline" size="sm" className="justify-start">
              <Bell className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Test Alarm' : 'Probar Alarma'}
            </Button>
            <Button variant="outline" size="sm" className="justify-start" onClick={() => navigate('/dashboard/health/metrics')}>
              <Activity className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Health Metrics' : 'Métricas de Salud'}
            </Button>
            <Button 
              variant="outline" size="sm" className="justify-start"
              onClick={() => navigate('/dashboard/personal-details')}
            >
              <FileText className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Personal Details' : 'Datos Personales'}
            </Button>
            <Button 
              variant="outline" size="sm" className="justify-start"
              onClick={() => navigate('/dashboard/emergency-contacts')}
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
            </Button>
            <Button 
              variant="outline" size="sm" className="justify-start"
              onClick={() => navigate('/dashboard/help')}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Get Help' : 'Obtener Ayuda'}
            </Button>
            <Button 
              variant="outline" size="sm" className="justify-start"
              onClick={() => navigate('/dashboard/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Settings' : 'Configuración'}
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="default" size="sm" className="justify-start col-span-2"
              onClick={onShowAddProducts}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Shop Devices' : 'Comprar Dispositivos'}
            </Button>
            <Button 
              variant="outline" size="sm" className="justify-start"
              onClick={() => navigate('/dashboard/personal-details')}
            >
              <FileText className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Personal Details' : 'Datos Personales'}
            </Button>
            <Button 
              variant="outline" size="sm" className="justify-start"
              onClick={() => navigate('/dashboard/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Settings' : 'Configuración'}
            </Button>
            <Button 
              variant="outline" size="sm" className="justify-start"
              onClick={() => navigate('/dashboard/help')}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Help' : 'Ayuda'}
            </Button>
            <Button 
              variant="outline" size="sm" className="justify-start"
              onClick={() => navigate('/dashboard/emergency-contacts')}
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Contacts' : 'Contactos'}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
