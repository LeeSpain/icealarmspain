
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";

interface GuardianWelcomeProps {
  onStartInteraction: () => void;
}

const GuardianWelcome: React.FC<GuardianWelcomeProps> = ({ onStartInteraction }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Get user's name, with proper fallbacks
  const getUserName = () => {
    if (user?.name) return user.name.split(' ')[0]; // Get first name only
    if (user?.displayName) return user.displayName.split(' ')[0]; // Get first name only
    if (user?.email) return user.email.split('@')[0]; // Use part before @ in email
    return language === 'en' ? 'there' : 'allí'; // Default fallback
  };
  
  const userName = getUserName();
  
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="h-14 w-14 rounded-full bg-guardian-100 flex items-center justify-center mb-4">
        <Shield className="h-7 w-7 text-guardian-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {language === 'en' ? 'Hello, ' + userName : 'Hola, ' + userName}
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        {language === 'en' 
          ? "I'm your AI Health Guardian, ready to assist with any health or device questions you might have." 
          : "Soy tu Guardián de Salud IA, listo para ayudarte con cualquier pregunta sobre salud o dispositivos que puedas tener."}
      </p>
      <Button 
        className="bg-guardian-500 hover:bg-guardian-600 text-white"
        onClick={onStartInteraction}
      >
        {language === 'en' ? 'Start Conversation' : 'Iniciar Conversación'}
      </Button>
    </div>
  );
};

export default GuardianWelcome;
