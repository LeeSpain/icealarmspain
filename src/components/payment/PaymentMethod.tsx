
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Calendar, Lock } from "lucide-react";

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
  
  const content = {
    en: {
      title: "Payment Method",
      description: "Select how you would like to pay",
      creditCard: "Credit Card",
      paypal: "PayPal",
      bankTransfer: "Bank Transfer",
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
      title: "Método de Pago",
      description: "Seleccione cómo desea pagar",
      creditCard: "Tarjeta de Crédito",
      paypal: "PayPal",
      bankTransfer: "Transferencia Bancaria",
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
    <Card>
      <CardHeader>
        <CardTitle>{current.title}</CardTitle>
        <CardDescription>{current.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={paymentMethod} onValueChange={handleMethodChange} className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label htmlFor="credit_card" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              {current.creditCard}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.067 8.307C20.067 11.328 18.24 13.25 15.5 13.25H14.346C14.051 13.25 13.792 13.47 13.729 13.759L13.052 17.308L12.555 20.199C12.538 20.312 12.443 20.396 12.329 20.396H9.8C9.57 20.396 9.39 20.191 9.425 19.965L9.95 16.682L10.822 11.517C10.859 11.269 11.071 11.089 11.324 11.089H15C17.73 11.089 19.5 9.322 19.5 6.695C19.5 4.912 18.488 3.5 16.5 3.5H9.5C9.224 3.5 8.98 3.706 8.914 3.975L6 17C5.946 17.229 6.118 17.45 6.353 17.45H9C9.224 17.45 9.425 17.28 9.477 17.062L10.151 13.607" stroke="#26A0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {current.paypal}
              </span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank_transfer" id="bank_transfer" />
            <Label htmlFor="bank_transfer">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21M3 18H21M5 10H19C20.1046 10 21 9.10457 21 8V7C21 6.44772 20.5523 6 20 6H4C3.44772 6 3 6.44772 3 7V8C3 9.10457 3.89543 10 5 10ZM6 14H6.01M9 14H9.01M12 14H12.01M15 14H15.01M18 14H18.01M12 6L14 3H10L12 6Z" stroke="#6E56CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {current.bankTransfer}
              </span>
            </Label>
          </div>
        </RadioGroup>
        
        {paymentMethod === "credit_card" && (
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
        )}
        
        {paymentMethod === "paypal" && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm">
              {language === 'en' 
                ? "You will be redirected to PayPal to complete your payment securely."
                : "Será redirigido a PayPal para completar su pago de forma segura."}
            </p>
          </div>
        )}
        
        {paymentMethod === "bank_transfer" && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm">
              {language === 'en' 
                ? "You will receive our bank details to complete the transfer. Your order will be processed after payment confirmation."
                : "Recibirá nuestros datos bancarios para completar la transferencia. Su pedido se procesará después de la confirmación del pago."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
