
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useNavigate } from "react-router-dom";

interface CheckoutButtonProps {
  onCheckout: () => void;
  language: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckout, language }) => {
  const navigate = useNavigate();
  
  const handleCheckout = (e: React.MouseEvent) => {
    console.log("CheckoutButton clicked");
    e.preventDefault(); // Prevent any default navigation
    e.stopPropagation(); // Stop event propagation
    
    // Call the parent handler first if it exists
    onCheckout();
    
    // Use React Router to navigate with state flag to prevent redirect
    console.log("CheckoutButton: Navigating to /checkout");
    navigate("/checkout", { state: { fromCheckoutButton: true } });
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
