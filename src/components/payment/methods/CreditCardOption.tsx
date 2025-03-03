
import React from "react";
import { CreditCard } from "lucide-react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CreditCardOptionProps {
  language: 'en' | 'es';
}

const CreditCardOption: React.FC<CreditCardOptionProps> = ({ language }) => {
  const content = {
    en: "Credit Card",
    es: "Tarjeta de Crédito"
  };

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="credit_card" id="credit_card" />
      <Label htmlFor="credit_card" className="flex items-center">
        <CreditCard className="h-4 w-4 mr-2 text-primary" />
        {language === 'en' ? content.en : content.es}
      </Label>
    </div>
  );
};

export default CreditCardOption;
