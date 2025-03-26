
import React, { useEffect } from "react";
import PricingPlan from "./PricingPlan";
import { Link } from "react-router-dom";
import { trackPageView, trackProductView } from "@/utils/analytics";
import SEO from "@/components/SEO";
import { ButtonCustom } from "@/components/ui/button-custom";
import { CreditCard, Sparkles } from "lucide-react";

interface Plan {
  title: string;
  description: string;
  deviceCount: number;
  features: string[];
  isPopular?: boolean;
}

interface PricingPlansProps {
  plans: Plan[];
  language: string;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ plans, language }) => {
  // Add useEffect to track page view when component mounts
  useEffect(() => {
    trackPageView('pricing_plans_view');
    
    // Track individual plan views
    plans.forEach(plan => {
      trackProductView(
        `plan_${plan.deviceCount}_devices`,
        plan.title,
        { price: getMonthlyPrice(plan.deviceCount), is_popular: !!plan.isPopular }
      );
    });
  }, []);
  
  const getMonthlyPrice = (deviceCount: number) => {
    const basePrice = 24.99;
    let discount = 0;
    
    if (deviceCount === 2) discount = 0.1; // 10% discount
    if (deviceCount === 3) discount = 0.2; // 20% discount
    
    const price = deviceCount * basePrice * (1 - discount);
    return price.toFixed(2);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
            <CreditCard size={16} className="mr-2" />
            <span className="relative">
              {language === 'en' ? 'FLEXIBLE PRICING' : 'PRECIOS FLEXIBLES'}
              <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mx-auto max-w-4xl relative">
            <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
              {language === 'en' ? "Choose Your Protection Plan" : "Elija Su Plan de Protección"}
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'en'
              ? "Select the plan that best fits your needs with our flexible device options and monitoring services."
              : "Seleccione el plan que mejor se adapte a sus necesidades con nuestras opciones flexibles de dispositivos y servicios de monitoreo."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const price = getMonthlyPrice(plan.deviceCount);
            
            return (
              <PricingPlan
                key={index}
                title={plan.title}
                description={plan.description}
                price={`€${price}`}
                period={language === 'en' ? '/month' : '/mes'}
                features={plan.features}
                isPopular={plan.isPopular}
                ctaText={language === 'en' ? 'Select Plan' : 'Seleccionar Plan'}
                ctaUrl="/join" 
                language={language}
              />
            );
          })}
        </div>
        
        <div className="text-center mt-12 space-y-4">
          <Link to="/devices">
            <ButtonCustom variant="outline" className="mr-4">
              {language === 'en' ? 'View Device Information' : 'Ver Información de Dispositivos'}
            </ButtonCustom>
          </Link>
          
          <Link to="/checkout">
            <ButtonCustom variant="primary">
              {language === 'en' ? 'Proceed to Checkout' : 'Proceder al Pago'}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
