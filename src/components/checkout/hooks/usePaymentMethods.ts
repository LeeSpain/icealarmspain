
import { useState } from "react";
import { CardDetails } from "../types/checkout.types";

export const usePaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  
  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };
  
  const handleCardDetailsChange = (details: CardDetails) => {
    setCardDetails(details);
  };
  
  return {
    paymentMethod,
    cardDetails,
    handlePaymentMethodSelect,
    handleCardDetailsChange
  };
};
