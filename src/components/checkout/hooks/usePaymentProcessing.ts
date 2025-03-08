
import { useState } from "react";
import { BillingInfo, CardDetails } from "../types/checkout.types";

interface UsePaymentProcessingProps {
  language: string;
  billingInfo: BillingInfo;
  paymentMethod: string;
  cardDetails: CardDetails;
  setLast4: (last4: string) => void;
  setStep: (step: number) => void;
  clearCart: () => void;
}

export const usePaymentProcessing = ({
  language,
  billingInfo,
  paymentMethod,
  cardDetails,
  setLast4,
  setStep,
  clearCart
}: UsePaymentProcessingProps) => {
  const [loading, setLoading] = useState(false);

  const processPayment = async () => {
    setLoading(true);
    
    try {
      if (paymentMethod === "credit_card") {
        if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc) {
          throw new Error(language === 'en' 
            ? "Please fill in all card details" 
            : "Por favor, completa todos los detalles de la tarjeta");
        }
      }
      
      const fullName = `${billingInfo.firstName} ${billingInfo.lastName}`.trim();
      
      const address = {
        line1: billingInfo.address,
        line2: "",
        city: billingInfo.city,
        state: billingInfo.state || "",
        postalCode: billingInfo.postalCode,
        country: billingInfo.country
      };
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (cardDetails && cardDetails.number) {
        const cardNumber = cardDetails.number.replace(/\s/g, '');
        setLast4(cardNumber.slice(-4));
      }
      
      setStep(3);
      clearCart();
      window.scrollTo(0, 0);
      
      console.log("Payment processed successfully!");
    } catch (error) {
      console.error("Payment error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    processPayment
  };
};
