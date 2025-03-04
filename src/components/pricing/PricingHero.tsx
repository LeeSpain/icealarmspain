
import React from "react";
import { Shield, Sparkles } from "lucide-react";
import { Language } from "@/context/LanguageContext";

interface PricingHeroProps {
  language: Language;
}

const PricingHero: React.FC<PricingHeroProps> = ({ language }) => {
  return (
    <section 
      id="pricing-hero" 
      className="relative pt-32 pb-24 overflow-hidden mb-16"
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full border border-guardian-200/50 -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/50 to-transparent -z-10"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/30 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'Service Packages' : 'Paquetes de Servicio'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            <div className="relative mb-12">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair mx-auto max-w-4xl relative">
                <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                  {language === 'en' 
                    ? 'Service Packages & Options' 
                    : 'Paquetes de Servicio y Opciones'}
                </span>
                
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
              </h1>
              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6">
              {language === 'en' 
                ? 'Learn about our comprehensive monitoring services and package options designed to fit your needs.' 
                : 'Conozca nuestros servicios integrales de monitoreo y opciones de paquetes diseñados para adaptarse a sus necesidades.'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default PricingHero;
