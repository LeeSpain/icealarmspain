
import React from "react";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactCards: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="glass-panel p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-5px]">
        <div className="h-16 w-16 rounded-full bg-ice-100 flex items-center justify-center mb-4">
          <PhoneIcon className="h-8 w-8 text-ice-600" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Call Us' : 'Llámenos'}</h3>
        <p className="text-lg text-muted-foreground">+34 951 123 456</p>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'Mon-Fri, 9:00-19:00' : 'Lun-Vie, 9:00-19:00'}
        </p>
        <div className="mt-4 text-sm">
          {language === 'en' 
            ? 'English and Spanish support available' 
            : 'Soporte disponible en español e inglés'}
        </div>
      </div>
      
      <div className="glass-panel p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-5px]">
        <div className="h-16 w-16 rounded-full bg-guardian-100 flex items-center justify-center mb-4">
          <MailIcon className="h-8 w-8 text-guardian-600" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Email Us' : 'Envíenos un Email'}</h3>
        <p className="text-lg text-muted-foreground">info@icealarespana.com</p>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'We respond within 24 hours' : 'Respondemos en 24 horas'}
        </p>
        <div className="mt-4 text-sm">
          {language === 'en' 
            ? 'For both general inquiries and support' 
            : 'Para consultas generales y soporte'}
        </div>
      </div>
      
      <div className="glass-panel p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-5px]">
        <div className="h-16 w-16 rounded-full bg-ice-100 flex items-center justify-center mb-4">
          <MapPinIcon className="h-8 w-8 text-ice-600" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Visit Us' : 'Visítenos'}</h3>
        <p className="text-lg text-muted-foreground">Calle Ejemplo 123</p>
        <p className="text-muted-foreground">29001 Málaga, Spain</p>
        <div className="mt-4 text-sm">
          {language === 'en' 
            ? 'By appointment only' 
            : 'Solo con cita previa'}
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
