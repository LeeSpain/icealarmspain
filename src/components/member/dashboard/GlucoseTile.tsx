
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface GlucoseTileProps {
  onClick?: () => void;
}

const GlucoseTile: React.FC<GlucoseTileProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/devices/glucose-monitor');
    }
  };
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="bg-blue-600 text-white p-4 flex flex-row items-center">
        <CardTitle className="text-lg flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium">
            {language === 'en' ? 'Last Reading: Normal' : 'Última Lectura: Normal'}
          </span>
        </div>
        <div className="mt-3 flex items-center">
          <span className="text-2xl font-semibold">103</span>
          <span className="ml-1 text-sm">mg/dL</span>
          <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {language === 'en' 
            ? 'Taken 1 hour ago' 
            : 'Tomada hace 1 hora'}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlucoseTile;
