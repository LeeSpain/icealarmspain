
import React, { useEffect } from "react";
import PricingPlan from "./PricingPlan";
import { Link } from "react-router-dom";
import { trackPageView, trackProductView } from "@/utils/analytics";
import SEO from "@/components/SEO";

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
  // Add useEffect to scroll to top and track page view when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('pricing_plans_page');
  }, []);
  
  const getMonthlyPrice = (deviceCount: number) => {
    const basePrice = 24.99;
    let discount = 0;
    
    if (deviceCount === 2) discount = 0.1; // 10% discount
    if (deviceCount === 3) discount = 0.2; // 20% discount
    
    const price = deviceCount * basePrice * (1 - discount);
    return price.toFixed(2);
  };

  // Create structured data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "ICE Alarm Alert Systems",
    "description": language === 'en' 
      ? "Emergency alert systems for seniors and individuals with medical conditions" 
      : "Sistemas de alerta de emergencia para personas mayores y con condiciones médicas",
    "offers": plans.map(plan => ({
      "@type": "Offer",
      "name": plan.title,
      "price": getMonthlyPrice(plan.deviceCount),
      "priceCurrency": "EUR",
      "description": plan.description,
      "url": `${window.location.origin}/join`
    }))
  };
  
  return (
    <>
      <SEO 
        title={language === 'en' ? "Pricing Plans | ICE Alarm España" : "Planes de Precios | ICE Alarm España"}
        description={language === 'en' 
          ? "Choose the perfect emergency alert system plan for your needs. Flexible pricing options with monthly payments."
          : "Elija el plan de sistema de alerta de emergencia perfecto para sus necesidades. Opciones de precios flexibles con pagos mensuales."}
        structuredData={structuredData}
      />
      
      <div className="container mx-auto px-4 my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const price = getMonthlyPrice(plan.deviceCount);
            // Track product view for each plan
            useEffect(() => {
              trackProductView(
                `plan_${plan.deviceCount}_devices`, 
                plan.title, 
                { price: price, is_popular: !!plan.isPopular }
              );
            }, []);
            
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
      </div>
    </>
  );
};

export default PricingPlans;
