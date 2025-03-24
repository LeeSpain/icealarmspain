import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

interface PricingInfoProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  mostPopular?: boolean;
}

const PricingInfo: React.FC<PricingInfoProps> = ({
  title,
  description,
  price,
  features,
  mostPopular = false,
}) => {
  const { language } = useLanguage();

  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
      {mostPopular && (
        <Badge className="mb-4 bg-ice-500 text-white">
          {language === 'en' ? 'Most Popular' : 'Más Popular'}
        </Badge>
      )}
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="text-4xl font-bold text-ice-600 dark:text-ice-400 mb-4">
        ${price}
        <span className="text-sm text-gray-600 dark:text-gray-300">/month</span>
      </div>
      <ul className="list-disc pl-5 mb-6 text-gray-700 dark:text-gray-200">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PricingInfo;
