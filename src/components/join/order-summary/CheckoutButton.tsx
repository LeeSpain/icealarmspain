
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface CheckoutButtonProps {
  onCheckout: () => void;
  language: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckout, language }) => {
  const handleCheckout = (e: React.MouseEvent) => {
    console.log("CheckoutButton clicked");
    e.preventDefault(); // Prevent any default navigation
    e.stopPropagation(); // Stop event propagation
    
    // Call the parent handler which has all the navigation logic
    onCheckout();
  };

  return (
    <ButtonCustom 
      className="w-full mt-4 text-lg py-6" 
      onClick={handleCheckout}
      type="button"
      data-testid="checkout-button"
    >
      {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
    </ButtonCustom>
  );
};

export default CheckoutButton;
