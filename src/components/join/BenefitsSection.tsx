
import React from "react";
import { Check } from "lucide-react";

interface BenefitsSectionProps {
  language: string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ language }) => {
  const benefits = language === 'en' ? [
    "No long-term contracts",
    "Cancel anytime",
    "Software updates included",
    "Multilingual support",
    "30-day money-back guarantee",
    "No hidden fees",
    "Technical support"
  ] : [
    "Sin contratos a largo plazo",
    "Cancele en cualquier momento",
    "Actualizaciones de software incluidas",
    "Soporte multilingüe",
    "Garantía de devolución de 30 días",
    "Sin tarifas ocultas",
    "Soporte técnico"
  ];

  return (
    <div className="max-w-3xl mx-auto text-center mb-10">
      <h2 className="text-2xl font-bold mb-6">
        {language === 'en' ? "All Plans Include" : "Todos los Planes Incluyen"}
      </h2>
      <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((feature, idx) => (
          <div key={idx} className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
