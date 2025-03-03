
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";

export const GlucoseTile: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [lastReading] = useState<number>(114);
  const [timestamp] = useState<string>("12:30 PM");
  
  // Determine the status of glucose level
  const getStatusColor = (value: number) => {
    if (value < 70) return "text-red-600";
    if (value > 180) return "text-orange-600";
    return "text-green-600";
  };
  
  return (
    <Card className="flex flex-col shadow-sm border-2 border-ice-100 hover:border-green-200 transition-all">
      <CardHeader className="bg-green-50 pb-2">
        <CardTitle className="text-md font-medium text-green-800 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-green-600" />
          {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {language === 'en' ? 'Last Reading:' : 'Última Lectura:'}
            </span>
            <span className="text-sm text-gray-500">{timestamp}</span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <span className={`text-3xl font-bold ${getStatusColor(lastReading)}`}>
              {lastReading}
            </span>
            <span className="text-sm ml-1 text-gray-600">mg/dL</span>
          </div>
          <div className="text-xs flex items-center justify-center mb-4 text-gray-500">
            <Info className="h-3 w-3 mr-1" />
            <span>
              {language === 'en'
                ? 'Normal range: 70-180 mg/dL'
                : 'Rango normal: 70-180 mg/dL'}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            variant="outline" 
            className="w-full text-sm py-1"
            onClick={() => navigate('/devices/glucose-monitor')}
          >
            {language === 'en' ? 'View Detailed History' : 'Ver Historial Detallado'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
