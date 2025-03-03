
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Calendar, Lock } from "lucide-react";

interface CreditCardFormProps {
  cardDetails: {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  };
  handleCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  language: 'en' | 'es';
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  cardDetails,
  handleCardChange,
  language
}) => {
  const content = {
    en: {
      cardDetails: "Card Details",
      cardNumber: "Card Number",
      cardholderName: "Cardholder Name",
      expiryDate: "Expiry Date",
      cvc: "CVC",
      mmyy: "MM/YY",
      secure: "Secured with 256-bit encryption",
      cardInfo: "We accept Visa, Mastercard, and American Express"
    },
    es: {
      cardDetails: "Detalles de la Tarjeta",
      cardNumber: "Número de Tarjeta",
      cardholderName: "Nombre del Titular",
      expiryDate: "Fecha de Caducidad",
      cvc: "CVC",
      mmyy: "MM/AA",
      secure: "Protegido con encriptación de 256 bits",
      cardInfo: "Aceptamos Visa, Mastercard y American Express"
    }
  };

  const current = language === 'en' ? content.en : content.es;

  return (
    <div className="space-y-4 mt-6">
      <h3 className="font-medium text-sm">{current.cardDetails}</h3>
      
      <div className="space-y-2">
        <Label htmlFor="card-number">{current.cardNumber}</Label>
        <div className="relative">
          <Input
            id="card-number"
            name="number"
            value={cardDetails.number}
            onChange={handleCardChange}
            placeholder="4111 1111 1111 1111"
            maxLength={19}
            className="pl-10"
          />
          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cardholder-name">{current.cardholderName}</Label>
        <Input
          id="cardholder-name"
          name="name"
          value={cardDetails.name}
          onChange={handleCardChange}
          placeholder="John Smith"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">{current.expiryDate}</Label>
          <div className="relative">
            <Input
              id="expiry"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleCardChange}
              placeholder={current.mmyy}
              maxLength={5}
              className="pl-10"
            />
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cvc">{current.cvc}</Label>
          <div className="relative">
            <Input
              id="cvc"
              name="cvc"
              value={cardDetails.cvc}
              onChange={handleCardChange}
              placeholder="123"
              maxLength={3}
              className="pl-10"
            />
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground flex items-center mt-4">
        <Lock className="h-3 w-3 mr-1" />
        {current.secure}
      </p>
      <p className="text-xs text-muted-foreground">
        {current.cardInfo}
      </p>
    </div>
  );
};

export default CreditCardForm;
