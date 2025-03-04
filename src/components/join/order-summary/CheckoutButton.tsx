
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface CheckoutButtonProps {
  onCheckout: () => void;
  language: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckout, language }) => {
  // This function ensures the onCheckout callback is triggered correctly
  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default navigation
    onCheckout(); // Call the provided onCheckout function from parent
  };

  return (
    <ButtonCustom 
      className="w-full mt-4 text-lg py-6" 
      onClick={handleCheckout}
    >
      {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
    </ButtonCustom>
  );
};

export default CheckoutButton;
