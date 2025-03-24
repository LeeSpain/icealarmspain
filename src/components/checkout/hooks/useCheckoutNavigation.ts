
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trackCheckoutStep } from "@/utils/analytics";

export const useCheckoutNavigation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [billingInfo, setBillingInfo] = useState(null);
  
  // Track checkout steps
  useEffect(() => {
    trackCheckoutStep(step);
  }, [step]);
  
  const handleBillingInfoSubmit = (info: any) => {
    setBillingInfo(info);
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handleStepBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      handleBackToShopping();
    }
  };
  
  const handleBackToShopping = () => {
    navigate('/products');
  };
  
  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };
  
  return {
    step,
    setStep,
    billingInfo,
    handleBillingInfoSubmit,
    handleStepBack,
    handleBackToShopping,
    handleGoToDashboard,
  };
};
