
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentDetails } from "@/types/payment";

interface CardInformationSectionProps {
  formData: PaymentDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardInformationSection: React.FC<CardInformationSectionProps> = ({
  formData,
  handleChange
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {language === 'en' ? "Card Information" : "Información de Tarjeta"}
      </h3>
      
      <div className="space-y-2">
        <Label htmlFor="cardNumber">
          {language === 'en' ? "Card Number" : "Número de Tarjeta"}
        </Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          required
          autoComplete="cc-number"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">
            {language === 'en' ? "Expiry Date" : "Fecha de Expiración"}
          </Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
            autoComplete="cc-exp"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">
            {language === 'en' ? "CVC" : "CVC"}
          </Label>
          <Input
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            placeholder="123"
            required
            autoComplete="cc-csc"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">
          {language === 'en' ? "Cardholder Name" : "Nombre del Titular"}
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={language === 'en' ? "Full Name" : "Nombre Completo"}
          required
          autoComplete="cc-name"
        />
      </div>
    </div>
  );
};

export default CardInformationSection;
