
import React from "react";
import { CreditCard, Sparkles } from "lucide-react";
import HeroBackground from "../hero/HeroBackground";

interface PricingHeroProps {
  language: string;
}

const PricingHero: React.FC<PricingHeroProps> = ({ language }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-white">
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <CreditCard size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'FLEXIBLE PRICING' : 'PRECIOS FLEXIBLES'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            <div className="relative mb-12">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mx-auto max-w-4xl relative">
                <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                  {language === 'en' ? "Choose Your Protection Plan" : "Elija Su Plan de Protección"}
                </span>
                
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
              </h2>
              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto py-2 rounded-lg mt-6">
              {language === 'en'
                ? "Select the plan that best fits your needs with our flexible device options and monitoring services."
                : "Seleccione el plan que mejor se adapte a sus necesidades con nuestras opciones flexibles de dispositivos y servicios de monitoreo."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
