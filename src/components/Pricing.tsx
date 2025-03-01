
import React from "react";
import { ButtonCustom } from "./ui/button-custom";
import { Check } from "lucide-react";

const Pricing: React.FC = () => {
  const plans = [
    {
      title: "Single Device",
      price: "€24.99",
      period: "per month",
      description: "Basic monitoring with a single device of your choice.",
      features: [
        "1 device monitoring",
        "24/7 emergency response",
        "AI Guardian basic interactions",
        "Dashboard access for family",
        "Monthly health reports"
      ],
      isPopular: false
    },
    {
      title: "Dual Protection",
      price: "€44.98",
      period: "per month",
      originalPrice: "€49.98",
      savings: "Save 10%",
      description: "Enhanced protection with two integrated devices.",
      features: [
        "2 devices monitoring",
        "24/7 priority emergency response",
        "Full AI Guardian interactions",
        "Dashboard access for family",
        "Weekly health reports",
        "Medication reminders",
        "Wellness check-ins"
      ],
      isPopular: true
    },
    {
      title: "Complete Guardian",
      price: "€59.97",
      period: "per month",
      originalPrice: "€74.97",
      savings: "Save 20%",
      description: "Comprehensive health monitoring with all three devices.",
      features: [
        "3 devices monitoring",
        "24/7 VIP emergency response",
        "Premium AI Guardian features",
        "Multiple family members access",
        "Daily health insights",
        "Personalized health recommendations",
        "Priority technical support",
        "Advanced medication management"
      ],
      isPopular: false
    }
  ];
  
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-ice-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Purchase your devices and subscribe to our monitoring services. No leasing, no hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl shadow-subtle overflow-hidden border transition-all duration-300 hover:shadow-lg animate-slide-up ${
                plan.isPopular ? "border-ice-400 transform md:scale-105" : "border-gray-100"
              }`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-ice-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                
                {(plan.originalPrice && plan.savings) && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                    <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                      {plan.savings}
                    </span>
                  </div>
                )}
                
                <p className="text-muted-foreground text-sm mb-6">
                  {plan.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <ButtonCustom
                  variant={plan.isPopular ? "primary" : "outline"}
                  className="w-full"
                >
                  Get Started
                </ButtonCustom>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include device purchase. Additional fees apply for device replacement.
          </p>
          <a href="#" className="text-ice-600 hover:text-ice-700 font-medium inline-flex items-center">
            View complete pricing details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
