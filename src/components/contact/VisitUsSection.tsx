
import React from "react";
import { MapPinIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const VisitUsSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="mb-12 p-6 glass-panel max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="h-16 w-16 rounded-full bg-ice-100 flex items-center justify-center mb-4 md:mb-0">
          <MapPinIcon className="h-8 w-8 text-ice-600" />
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3">{language === 'en' ? 'Visit Us' : 'Visítenos'}</h3>
          <p className="text-lg text-muted-foreground">Calle Ejemplo 123</p>
          <p className="text-muted-foreground">29001 Málaga, Spain</p>
          <div className="mt-2 text-sm">
            {language === 'en' 
              ? 'By appointment only' 
              : 'Solo con cita previa'}
          </div>
        </div>
        
        <div className="hidden md:block flex-1">
          <div className="aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12793.979779726072!2d-4.4212696387939465!3d36.71978276853623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f7eb5bf87b93%3A0x7eb4c1e0e43c378a!2zTcOhbGFnYQ!5e0!3m2!1sen!2ses!4v1653665019045!5m2!1sen!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitUsSection;
