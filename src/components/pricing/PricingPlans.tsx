
import React from "react";
import PricingPlan from "./PricingPlan";
import { Link } from "react-router-dom";

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
  const getMonthlyPrice = (deviceCount: number) => {
    const basePrice = 24.99;
    let discount = 0;
    
    if (deviceCount === 2) discount = 0.1; // 10% discount
    if (deviceCount === 3) discount = 0.2; // 20% discount
    
    const price = deviceCount * basePrice * (1 - discount);
    return price.toFixed(2);
  };
  
  return (
    <div className="container mx-auto px-4 my-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <PricingPlan
            key={index}
            title={plan.title}
            description={plan.description}
            price={`€${getMonthlyPrice(plan.deviceCount)}`}
            period={language === 'en' ? '/month' : '/mes'}
            features={plan.features}
            isPopular={plan.isPopular}
            ctaText={language === 'en' ? 'Select Plan' : 'Seleccionar Plan'}
            ctaUrl="/join" // Changed from "/checkout" to "/join"
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
