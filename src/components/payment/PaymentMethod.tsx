
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { paymentContent } from "./constants/paymentContent";
import CreditCardOption from "./methods/CreditCardOption";
import PayPalOption from "./methods/PayPalOption";
import BankTransferOption from "./methods/BankTransferOption";
import CreditCardForm from "./methods/CreditCardForm";
import PayPalInfo from "./methods/PayPalInfo";
import BankTransferInfo from "./methods/BankTransferInfo";

interface PaymentMethodProps {
  onMethodSelect: (method: string) => void;
  onCardDetailsChange: (details: any) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onMethodSelect, onCardDetailsChange }) => {
  const { language } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  
  const handleMethodChange = (value: string) => {
    setPaymentMethod(value);
    onMethodSelect(value);
  };
  
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === "number") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }
    
    // Format expiry date with slash
    if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }
    
    setCardDetails({
      ...cardDetails,
      [name]: formattedValue
    });
    
    onCardDetailsChange({
      ...cardDetails,
      [name]: formattedValue
    });
  };
  
  const current = paymentContent[language === 'en' ? 'en' : 'es'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{current.title}</CardTitle>
        <CardDescription>{current.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={paymentMethod} onValueChange={handleMethodChange} className="space-y-4">
          <CreditCardOption language={language === 'en' ? 'en' : 'es'} />
          <PayPalOption language={language === 'en' ? 'en' : 'es'} />
          <BankTransferOption language={language === 'en' ? 'en' : 'es'} />
        </RadioGroup>
        
        {paymentMethod === "credit_card" && (
          <CreditCardForm 
            cardDetails={cardDetails}
            handleCardChange={handleCardChange}
            language={language === 'en' ? 'en' : 'es'}
          />
        )}
        
        {paymentMethod === "paypal" && (
          <PayPalInfo language={language === 'en' ? 'en' : 'es'} />
        )}
        
        {paymentMethod === "bank_transfer" && (
          <BankTransferInfo language={language === 'en' ? 'en' : 'es'} />
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
