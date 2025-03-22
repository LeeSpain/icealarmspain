
import React from "react";
import { Brain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Header: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-guardian-50/80 to-guardian-100/80 border border-guardian-200 text-guardian-600 text-sm font-medium mb-3 shadow-sm backdrop-blur-sm">
        <Brain size={16} className="mr-2" />
        <span>
          {language === 'en' ? 'ICE AI Guardian' : 'ICE AI Guardian'}
        </span>
      </div>
      <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent">
        {language === 'en' ? 'Connect With Our Enhanced AI Assistant' : 'Conéctate Con Nuestro Asistente IA Mejorado'}
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {language === 'en' 
          ? 'Our advanced AI assistant is integrated with all our business systems. Get instant answers about our services, create support tickets, or request specialized assistance from our team.' 
          : 'Nuestro asistente de IA avanzado está integrado con todos nuestros sistemas de negocio. Obtenga respuestas instantáneas sobre nuestros servicios, cree tickets de soporte o solicite asistencia especializada de nuestro equipo.'}
      </p>
    </div>
  );
};

export default Header;
