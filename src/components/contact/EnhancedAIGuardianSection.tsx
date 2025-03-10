
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Bot, ArrowRight, HeartHandshake } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import AIGuardianChat from "./ai-guardian/AIGuardianChat";

const EnhancedAIGuardianSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
            <Bot size={16} className="mr-2" />
            <span className="relative">
              {language === 'en' ? 'AI GUARDIAN ASSISTANT' : 'ASISTENTE GUARDIÁN IA'}
              <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
            </span>
          </div>
          
          <div className="relative mb-10">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent">
              {language === 'en' 
                ? 'Get Immediate Assistance with Our AI' 
                : 'Obtenga Asistencia Inmediata con Nuestra IA'}
            </h2>
            
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></div>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {language === 'en'
              ? 'Our AI Guardian can answer questions, guide you through device setup, and help you find the right products for your needs - all in real-time.'
              : 'Nuestro Guardián de IA puede responder preguntas, guiarlo a través de la configuración del dispositivo y ayudarlo a encontrar los productos adecuados para sus necesidades, todo en tiempo real.'}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <AIGuardianChat />
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4">
              {language === 'en'
                ? 'Need to speak with a human instead?'
                : '¿Necesita hablar con un humano en su lugar?'}
            </p>
            <ButtonCustom variant="outline" className="group">
              <HeartHandshake size={16} className="mr-2" />
              <span>
                {language === 'en'
                  ? 'Connect with Customer Service'
                  : 'Conectar con Servicio al Cliente'}
              </span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </ButtonCustom>
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

export default EnhancedAIGuardianSection;
