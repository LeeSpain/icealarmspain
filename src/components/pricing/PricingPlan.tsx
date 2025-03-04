
import React from "react";
import { Check, ArrowRightIcon } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface PricingPlanProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaUrl: string;
  language: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  description,
  price,
  period,
  features,
  isPopular,
  ctaText,
  ctaUrl,
  language
}) => {
  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 ${
      isPopular 
        ? "border-2 border-ice-500 shadow-lg scale-105 transform z-10 bg-white" 
        : "border border-gray-200 shadow hover:shadow-md bg-white"
    }`}>
      {isPopular && (
        <div className="py-1.5 px-4 bg-ice-500 text-white text-center text-sm font-medium">
          {language === 'en' ? 'Most Popular' : 'Más Popular'}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6">{description}</p>
        
        <div className="mb-6">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-1">{period}</span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <div className="mr-3 mt-1 bg-ice-100 rounded-full p-0.5">
                <Check size={12} className="text-ice-600" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link to={ctaUrl}>
          <ButtonCustom 
            variant={isPopular ? "primary" : "outline"} 
            className={`w-full ${isPopular ? "bg-ice-600 hover:bg-ice-700" : "border-ice-600 text-ice-600 hover:bg-ice-50"}`}
          >
            <span className="flex items-center justify-center">
              {ctaText}
              <ArrowRightIcon size={16} className="ml-2" />
            </span>
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default PricingPlan;
