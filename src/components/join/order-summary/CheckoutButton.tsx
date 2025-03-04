
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface CheckoutButtonProps {
  onCheckout: () => void;
  language: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckout, language }) => {
  return (
    <ButtonCustom 
      className="w-full mt-4 text-lg py-6" 
      onClick={onCheckout}
    >
      {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
    </ButtonCustom>
  );
};

export default CheckoutButton;
