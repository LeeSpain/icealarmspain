
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const WeatherTile: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg flex items-center text-amber-500">
          <Sun className="mr-2 h-5 w-5" />
          {language === 'en' ? 'Weather' : 'Clima'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">24°C</div>
            <div className="text-sm text-muted-foreground">
              {language === 'en' ? 'Partly Cloudy' : 'Parcialmente Nublado'}
            </div>
          </div>
          <Cloud className="h-10 w-10 text-amber-500" />
        </div>
        <div className="mt-3 text-sm">
          <div className="flex justify-between mb-1">
            <span>{language === 'en' ? 'Humidity' : 'Humedad'}</span>
            <span>65%</span>
          </div>
          <div className="flex justify-between">
            <span>{language === 'en' ? 'Wind' : 'Viento'}</span>
            <span>8 km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherTile;
