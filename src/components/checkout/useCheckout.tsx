
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/components/payment/CartContext";
import { useCheckoutNavigation } from "./hooks/useCheckoutNavigation";
import { usePaymentProcessing } from "./hooks/usePaymentProcessing";
import { useOrderData } from "./hooks/useOrderData";
import { useCheckoutValidation } from "./hooks/useCheckoutValidation";
import { usePaymentMethods } from "./hooks/usePaymentMethods";
import { useBillingInfo } from "./hooks/useBillingInfo";

export const useCheckout = () => {
  const { language } = useLanguage();
  const { getTotalPrice, clearCart } = useCart();
  
  // Use extracted hooks
  const { step, setStep, handleBillingInfoSubmit, handleStepBack, handleBackToShopping, handleGoToDashboard } = useCheckoutNavigation();
  const { billingInfo } = useBillingInfo();
  const { paymentMethod, cardDetails, handlePaymentMethodSelect, handleCardDetailsChange } = usePaymentMethods();
  const { orderData, paymentResult, setLast4 } = useOrderData();
  useCheckoutValidation(); // Just for the validation effect
  
  // Set up payment processing
  const { loading, processPayment } = usePaymentProcessing({
    language,
    billingInfo,
    paymentMethod,
    cardDetails,
    setLast4,
    setStep,
    clearCart
  });
  
  return {
    step,
    loading,
    billingInfo,
    paymentMethod,
    orderData,
    paymentResult,
    handleBillingInfoSubmit,
    handlePaymentMethodSelect,
    handleCardDetailsChange,
    processPayment,
    handleBackToShopping,
    handleGoToDashboard,
    handleStepBack,
    getTotalPrice
  };
};
