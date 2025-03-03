
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SOSTile: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const handleEmergencyTrigger = () => {
    toast.info(
      language === 'en' 
        ? 'SOS alert has been triggered. Help is on the way.' 
        : 'La alerta SOS ha sido activada. La ayuda está en camino.'
    );
  };
  
  return (
    <Card className="flex flex-col shadow-sm border-2 border-ice-100 hover:border-red-200 transition-all">
      <CardHeader className="bg-red-50 pb-2">
        <CardTitle className="text-md font-medium text-red-800 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
          {language === 'en' ? 'SOS Emergency' : 'Emergencia SOS'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-grow flex flex-col justify-between">
        <p className="text-sm text-gray-600 mb-4">
          {language === 'en' 
            ? 'One-touch emergency assistance when you need it.' 
            : 'Asistencia de emergencia con un solo toque cuando la necesites.'}
        </p>
        
        <div className="flex flex-col space-y-2">
          <Button 
            variant="destructive" 
            className="w-full text-sm py-1"
            onClick={handleEmergencyTrigger}
          >
            {language === 'en' ? 'Trigger SOS Alert' : 'Activar Alerta SOS'}
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-sm py-1"
            onClick={() => navigate('/devices/sos-pendant')}
          >
            {language === 'en' ? 'Manage SOS Pendant' : 'Gestionar Colgante SOS'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
