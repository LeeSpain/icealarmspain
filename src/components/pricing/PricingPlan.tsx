import React, { useCallback } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

interface PricingPlanProps {
  plan: {
    title: string;
    description: string;
    deviceCount: number;
    features: string[];
    isPopular?: boolean;
  };
  language: string;
  index: number;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ plan, language, index }) => {
  const handleCheckoutClick = useCallback((e: React.MouseEvent) => {
    console.log("PricingPlan: Select Plan button clicked");
    e.preventDefault();
    e.stopPropagation();
    
    // Force direct navigation to checkout
    console.log("PricingPlan: Forcing direct navigation to /checkout");
    
    // Using a small timeout to ensure the event completes first
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 50);
  }, []);

  return (
    <div 
      className={`relative bg-white rounded-3xl shadow-subtle overflow-hidden border transition-all duration-300 hover:shadow-lg animate-slide-up ${
        plan.isPopular ? "border-ice-400 transform md:scale-105" : "border-gray-100"
      }`}
      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
      {plan.isPopular && (
        <div className="absolute top-0 right-0 bg-ice-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          {language === 'en' ? "Recommended" : "Recomendado"}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
        
        <p className="text-muted-foreground text-sm mb-6">
          {plan.description}
        </p>
        
        <div className="bg-ice-50 rounded-lg p-3 text-center mb-6">
          <span className="text-sm font-medium text-ice-700">
            {language === 'en' ? `${plan.deviceCount} Device Connection${plan.deviceCount > 1 ? 's' : ''}` : 
            `${plan.deviceCount} Conexión${plan.deviceCount > 1 ? 'es' : ''} de Dispositivo`}
          </span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex flex-col gap-3">
          <Link to="/products">
            <ButtonCustom variant="outline" className="w-full">
              {language === 'en' ? "View Devices" : "Ver Dispositivos"}
            </ButtonCustom>
          </Link>
          <ButtonCustom 
            className="w-full" 
            onClick={handleCheckoutClick}
            data-testid="pricing-plan-checkout-button"
          >
            {language === 'en' ? "Select Plan" : "Seleccionar Plan"}
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
