
import React from "react";
import { CreditCard } from "lucide-react";

interface PricingHeroProps {
  language: string;
}

const PricingHero: React.FC<PricingHeroProps> = ({ language }) => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
        <CreditCard size={16} className="mr-2" />
        {language === 'en' ? 'FLEXIBLE PRICING' : 'PRECIOS FLEXIBLES'}
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
        {language === 'en' ? "Choose Your Protection Plan" : "Elija Su Plan de Protección"}
      </h2>
      
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {language === 'en'
          ? "Select the plan that best fits your needs with our flexible device options and monitoring services."
          : "Seleccione el plan que mejor se adapte a sus necesidades con nuestras opciones flexibles de dispositivos y servicios de monitoreo."}
      </p>
    </div>
  );
};

export default PricingHero;
