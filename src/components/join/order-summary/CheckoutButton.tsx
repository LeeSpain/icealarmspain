
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useNavigate } from "react-router-dom";

interface CheckoutButtonProps {
  onCheckout: () => void;
  language: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckout, language }) => {
  const navigate = useNavigate();

  // This function ensures direct navigation to checkout page
  const handleCheckout = (e: React.MouseEvent) => {
    console.log("CheckoutButton clicked, preventing default behavior");
    e.preventDefault(); // Prevent any default navigation
    e.stopPropagation(); // Stop event propagation
    
    // Use direct navigation to checkout page
    console.log("CheckoutButton: Directly navigating to /checkout");
    window.location.href = "/checkout";
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
