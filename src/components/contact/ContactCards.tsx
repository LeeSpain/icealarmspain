
import React from "react";
import { MessageSquare, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactCards: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {/* Email Card */}
      <div className="glass-panel p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-guardian-100 to-guardian-200 flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-guardian-600" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Email Us' : 'Envíenos un Correo'}</h3>
        <p className="text-lg text-muted-foreground">
          {language === 'en' ? 'Get a response within 24 hours' : 'Obtenga una respuesta dentro de las 24 horas'}
        </p>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'Available 24/7' : 'Disponible 24/7'}
        </p>
        <div className="mt-4 text-sm">
          {language === 'en' 
            ? 'Best for detailed inquiries and support requests' 
            : 'Ideal para consultas detalladas y solicitudes de soporte'}
        </div>
      </div>
      
      {/* Live Chat Card */}
      <div className="glass-panel p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-ice-100 to-guardian-100 flex items-center justify-center mb-4">
          <MessageSquare className="h-8 w-8 text-ice-600" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Live Chat' : 'Chat en Vivo'}</h3>
        <p className="text-lg text-muted-foreground">
          {language === 'en' ? 'Start a conversation now' : 'Inicie una conversación ahora'}
        </p>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'Available 24/7' : 'Disponible 24/7'}
        </p>
        <div className="mt-4 text-sm">
          {language === 'en' 
            ? 'Fastest way to get immediate assistance' 
            : 'La forma más rápida de obtener ayuda inmediata'}
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
