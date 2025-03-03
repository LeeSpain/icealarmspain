
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const NewsTile: React.FC = () => {
  const { language } = useLanguage();
  
  const news = [
    {
      title: language === 'en' 
        ? 'New Health Tips for Seniors' 
        : 'Nuevos Consejos de Salud para Mayores',
      date: language === 'en' ? '2 hours ago' : 'hace 2 horas'
    },
    {
      title: language === 'en' 
        ? 'Safety Guidelines Updated' 
        : 'Directrices de Seguridad Actualizadas',
      date: language === 'en' ? '1 day ago' : 'hace 1 día'
    }
  ];
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-purple-600 text-white p-4 flex flex-row items-center">
        <CardTitle className="text-lg flex items-center">
          <Newspaper className="mr-2 h-5 w-5" />
          {language === 'en' ? 'News & Updates' : 'Noticias y Actualizaciones'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-3">
          {news.map((item, index) => (
            <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-muted-foreground">{item.date}</div>
            </li>
          ))}
        </ul>
        <div className="mt-3 text-sm text-blue-600 cursor-pointer">
          {language === 'en' ? 'View all news' : 'Ver todas las noticias'} →
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsTile;
