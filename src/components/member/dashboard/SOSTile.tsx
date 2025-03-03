
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface SOSTileProps {
  onClick?: () => void;
}

const SOSTile: React.FC<SOSTileProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/devices/sos-pendant');
    }
  };
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="bg-red-600 text-white p-4 flex flex-row items-center">
        <CardTitle className="text-lg flex items-center">
          <ShieldAlert className="mr-2 h-5 w-5" />
          {language === 'en' ? 'SOS Device Status' : 'Estado del Dispositivo SOS'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium">
            {language === 'en' ? 'Active & Connected' : 'Activo y Conectado'}
          </span>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          {language === 'en' 
            ? 'Last emergency test: 3 days ago' 
            : 'Última prueba de emergencia: hace 3 días'}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {language === 'en' 
            ? 'Battery: 78%' 
            : 'Batería: 78%'}
        </div>
      </CardContent>
    </Card>
  );
};

export default SOSTile;
