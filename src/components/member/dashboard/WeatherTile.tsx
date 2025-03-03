
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSun, Wind } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const WeatherTile: React.FC = () => {
  const { language } = useLanguage();
  const [weather, setWeather] = useState({
    temp: 24,
    condition: 'sunny',
    location: language === 'en' ? 'Madrid, Spain' : 'Madrid, España'
  });
  
  // In a real app, this would fetch actual weather data based on user's location
  
  // Get appropriate weather icon
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'partly-cloudy':
        return <CloudSun className="h-6 w-6 text-amber-500" />;
      case 'windy':
        return <Wind className="h-6 w-6 text-blue-300" />;
      case 'sunny':
      default:
        return <Sun className="h-6 w-6 text-amber-500" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 flex items-center border border-gray-100">
      <div className="mr-3">
        {getWeatherIcon()}
      </div>
      <div>
        <div className="flex items-baseline">
          <span className="text-xl font-semibold">{weather.temp}°C</span>
          <span className="ml-1 text-xs text-gray-500">{weather.location}</span>
        </div>
        <div className="text-xs text-gray-600">
          {language === 'en' 
            ? weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)
            : weather.condition === 'sunny' ? 'Soleado' 
              : weather.condition === 'rainy' ? 'Lluvioso'
              : weather.condition === 'cloudy' ? 'Nublado'
              : weather.condition === 'partly-cloudy' ? 'Parcialmente nublado'
              : weather.condition === 'windy' ? 'Ventoso' : 'Soleado'
          }
        </div>
      </div>
    </div>
  );
};

export default WeatherTile;
