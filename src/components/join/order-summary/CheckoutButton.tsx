
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface CheckoutButtonProps {
  onCheckout: () => void;
  language: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckout, language }) => {
  // This function ensures direct navigation to checkout page
  const handleCheckout = (e: React.MouseEvent) => {
    console.log("CheckoutButton clicked, preventing default behavior");
    e.preventDefault(); // Prevent any default navigation
    e.stopPropagation(); // Stop event propagation
    
    // Call the parent handler first if it exists
    onCheckout();
    
    // Force direct navigation to checkout page without React Router
    console.log("CheckoutButton: Forcing direct navigation to /checkout");
    
    // Using a small timeout to ensure the onCheckout function completes first
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 50);
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
