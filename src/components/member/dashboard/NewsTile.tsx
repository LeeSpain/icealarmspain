
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const NewsTile: React.FC = () => {
  const { language } = useLanguage();
  
  const newsItems = language === 'en' 
    ? [
        { title: "New Health Guidelines Published", date: "Today" },
        { title: "Tips for Summer Heat Safety", date: "Yesterday" },
        { title: "ICE Alarm Adds New Features", date: "2 days ago" }
      ]
    : [
        { title: "Nuevas Pautas de Salud Publicadas", date: "Hoy" },
        { title: "Consejos para la Seguridad en el Calor del Verano", date: "Ayer" },
        { title: "ICE Alarm Añade Nuevas Funciones", date: "Hace 2 días" }
      ];
  
  return (
    <Card className="flex flex-col shadow-sm border-2 border-ice-100 hover:border-purple-200 transition-all">
      <CardHeader className="bg-purple-50 pb-2">
        <CardTitle className="text-md font-medium text-purple-800 flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-purple-600" />
          {language === 'en' ? 'Health News' : 'Noticias de Salud'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <ul className="space-y-3">
          {newsItems.map((item, index) => (
            <li key={index} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.date}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right">
          <a 
            href="#"
            className="text-xs text-purple-600 hover:text-purple-800 transition-colors"
          >
            {language === 'en' ? 'View all articles →' : 'Ver todos los artículos →'}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
