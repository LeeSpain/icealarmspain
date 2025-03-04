
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lightbulb } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GuardianWelcomeProps {
  onStartInteraction: () => void;
}

const GuardianWelcome: React.FC<GuardianWelcomeProps> = ({ onStartInteraction }) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center py-2 text-center space-y-4">
      <div className="p-3 bg-guardian-100 rounded-full">
        <ShieldCheck className="h-8 w-8 text-guardian-500" />
      </div>
      <div>
        <h3 className="font-medium text-lg">
          {language === 'en' ? 'Health Assistant' : 'Asistente de Salud'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {language === 'en' 
            ? 'Your AI Guardian is monitoring your health data and can provide personalized insights.' 
            : 'Tu Guardian AI está monitoreando tus datos de salud y puede proporcionar información personalizada.'}
        </p>
      </div>
      <Button 
        onClick={onStartInteraction} 
        className="mt-2 bg-guardian-500 hover:bg-guardian-600"
      >
        <Lightbulb className="mr-2 h-4 w-4" />
        {language === 'en' ? 'Start interaction' : 'Iniciar interacción'}
      </Button>
    </div>
  );
};

export default GuardianWelcome;
