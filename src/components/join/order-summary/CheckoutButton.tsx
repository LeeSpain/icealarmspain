
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface CheckoutButtonProps {
  onCheckout: () => void;
  language: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckout, language }) => {
  // This function ensures the onCheckout callback is triggered correctly
  const handleCheckout = (e: React.MouseEvent) => {
    console.log("CheckoutButton clicked, preventing default behavior");
    e.preventDefault(); // Prevent any default navigation
    e.stopPropagation(); // Stop event propagation
    console.log("Triggering onCheckout callback directly");
    onCheckout(); // Call the provided onCheckout function from parent
  };

  return (
    <ButtonCustom 
      className="w-full mt-4 text-lg py-6" 
      onClick={handleCheckout}
      type="button"
      data-testid="checkout-button" // Add test ID for easier debugging
    >
      {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
    </ButtonCustom>
  );
};

export default CheckoutButton;
