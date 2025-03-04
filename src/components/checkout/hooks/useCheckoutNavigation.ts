
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckoutNavigation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleBillingInfoSubmit = (data: any) => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleStepBack = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBackToShopping = () => {
    navigate("/products");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return {
    step,
    setStep,
    handleBillingInfoSubmit,
    handleStepBack,
    handleBackToShopping,
    handleGoToDashboard
  };
};
