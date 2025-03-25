
import { useState } from "react";
import { BillingInfo, CardDetails } from "../types/checkout.types";
import { logEvent } from "@/services/analytics";

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
      
      // Track the payment attempt for analytics
      logEvent('payment_attempt', {
        payment_method: paymentMethod,
        value: cardDetails && cardDetails.number ? cardDetails.number.slice(-4) : 'unknown'
      });
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (cardDetails && cardDetails.number) {
        const cardNumber = cardDetails.number.replace(/\s/g, '');
        setLast4(cardNumber.slice(-4));
      }
      
      // Log successful payment
      logEvent('payment_success', {
        payment_method: paymentMethod,
        country: billingInfo.country
      });
      
      setStep(3);
      clearCart();
      window.scrollTo(0, 0);
      
      console.log("Payment processed successfully!");
    } catch (error) {
      // Log payment error
      logEvent('payment_error', {
        payment_method: paymentMethod,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
      
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
