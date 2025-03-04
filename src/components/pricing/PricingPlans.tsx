
import React from "react";
import { AlertCircle } from "lucide-react";
import PricingPlan from "./PricingPlan";
import { Language } from "@/context/LanguageContext";

interface PricingPlansProps {
  plans: Array<{
    title: string;
    description: string;
    deviceCount: number;
    features: string[];
    isPopular?: boolean;
  }>;
  language: Language;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ plans, language }) => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
        <div className="w-24 h-1 bg-gradient-to-r from-ice-400 to-guardian-500 mx-auto rounded-full"></div>
        <p className="text-ice-600 mt-4">
          {language === 'en'
            ? "Explore our service packages below and visit our Products page to learn more about our innovative devices."
            : "Explore nuestros paquetes de servicio a continuación y visite nuestra página de Productos para obtener más información sobre nuestros dispositivos innovadores."}
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-orange-50 border border-orange-200 rounded-xl p-4 mb-10 flex items-start">
        <AlertCircle className="text-orange-500 h-5 w-5 mr-3 flex-shrink-0 mt-1" />
        <p className="text-sm text-gray-700">
          {language === 'en' 
            ? "Our AI Guardian service is provided free with all plans. The monthly fee of €24.99 only applies to each connected device that you select, providing you with device-specific features."
            : "Nuestro servicio AI Guardian se proporciona gratis con todos los planes. La cuota mensual de €24.99 solo se aplica a cada dispositivo conectado que seleccione, proporcionándole características específicas del dispositivo."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {plans.map((plan, index) => (
          <PricingPlan 
            key={index} 
            plan={plan} 
            language={language}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
