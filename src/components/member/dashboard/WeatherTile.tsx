
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, Thermometer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const WeatherTile: React.FC = () => {
  const { language } = useLanguage();
  const [weather, setWeather] = useState({
    temperature: 24,
    condition: 'sunny',
    humidity: 60,
    location: language === 'en' ? 'Madrid, Spain' : 'Madrid, España'
  });
  
  // This would normally fetch from a weather API
  useEffect(() => {
    // Mock weather data update
    const interval = setInterval(() => {
      const conditions = ['sunny', 'cloudy', 'rainy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemp = Math.floor(Math.random() * 15) + 15; // 15-30°C
      const randomHumidity = Math.floor(Math.random() * 40) + 40; // 40-80%
      
      setWeather({
        temperature: randomTemp,
        condition: randomCondition,
        humidity: randomHumidity,
        location: language === 'en' ? 'Madrid, Spain' : 'Madrid, España'
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [language]);
  
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-10 w-10 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-10 w-10 text-blue-500" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />;
    }
  };
  
  const getConditionTranslation = () => {
    switch (weather.condition) {
      case 'sunny':
        return language === 'en' ? 'Sunny' : 'Soleado';
      case 'cloudy':
        return language === 'en' ? 'Cloudy' : 'Nublado';
      case 'rainy':
        return language === 'en' ? 'Rainy' : 'Lluvioso';
      default:
        return language === 'en' ? 'Unknown' : 'Desconocido';
    }
  };
  
  return (
    <Card className="flex flex-col shadow-sm border-2 border-ice-100 hover:border-blue-200 transition-all">
      <CardHeader className="bg-blue-50 pb-2">
        <CardTitle className="text-md font-medium text-blue-800 flex items-center">
          <Thermometer className="h-5 w-5 mr-2 text-blue-600" />
          {language === 'en' ? 'Local Weather' : 'Clima Local'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">{weather.location}</p>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-800">{weather.temperature}°C</span>
              <span className="ml-2 text-sm text-gray-600">
                {language === 'en' ? `Humidity: ${weather.humidity}%` : `Humedad: ${weather.humidity}%`}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {getWeatherIcon()}
            <span className="text-sm mt-1 text-gray-600">{getConditionTranslation()}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          {language === 'en' 
            ? 'Weather updates may affect your health. Stay informed.' 
            : 'Las actualizaciones meteorológicas pueden afectar tu salud. Mantente informado.'}
        </p>
      </CardContent>
    </Card>
  );
};
