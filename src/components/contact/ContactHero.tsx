
import React from "react";
import { Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import HeroBackground from "../hero/HeroBackground";

const ContactHero: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section 
      id="contact-hero" 
      className="relative pt-32 pb-24 overflow-hidden"
    >
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-10">
            <div className="w-full space-y-6 animate-slide-down text-center">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
                <Shield size={16} className="mr-2" />
                <span className="relative">
                  {language === 'en' ? 'GET IN TOUCH WITH US' : 'CONTÁCTENOS'}
                  <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
                </span>
              </div>
              
              {/* Enhanced headline with professional styling */}
              <div className="relative mb-8">
                {/* Decorative elements behind the headline */}
                <div className="absolute -top-10 left-0 w-32 h-1 bg-gradient-to-r from-ice-400 via-transparent to-transparent rounded-full opacity-70"></div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair relative">
                  <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                    {language === 'en' 
                      ? 'We\'re Here to Help You' 
                      : 'Estamos Aquí Para Ayudarte'}
                  </span>
                  
                  {/* Accent decorations */}
                  <span className="absolute -bottom-3 left-0 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
                </h1>
                
                {/* Decorative elements after the headline */}
                <div className="absolute -bottom-8 left-0 w-24 h-0.5 bg-gradient-to-r from-guardian-300 via-transparent to-transparent rounded-full opacity-60"></div>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg">
                {language === 'en' 
                  ? 'Our multilingual team is ready to assist you with any questions about our services, devices, or support needs.' 
                  : 'Nuestro equipo multilingüe está listo para ayudarte con cualquier pregunta sobre nuestros servicios, dispositivos o necesidades de soporte.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default ContactHero;
