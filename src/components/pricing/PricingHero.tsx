
import React from "react";
import { CreditCard, Sparkles } from "lucide-react";
import HeroBackground from "../hero/HeroBackground";

interface PricingHeroProps {
  language: string;
}

const PricingHero: React.FC<PricingHeroProps> = ({ language }) => {
  return (
    <section className="relative pt-16 pb-24 overflow-hidden bg-white">
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm">
              <CreditCard size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'FLEXIBLE PRICING' : 'PRECIOS FLEXIBLES'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            <div className="relative mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mx-auto max-w-4xl relative z-10 text-gray-900">
                <span className="relative z-10 inline-block">
                  {language === 'en' ? "Choose Your Protection Plan" : "Elija Su Plan de Protección"}
                </span>
              </h2>
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
