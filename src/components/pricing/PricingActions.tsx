
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

interface PricingActionsProps {
  language: string;
}

const PricingActions: React.FC<PricingActionsProps> = ({ language }) => {
  console.log("PricingActions rendering with direct link to /checkout");
  
  const handleCheckoutClick = useCallback((e: React.MouseEvent) => {
    console.log("PricingActions: Checkout button clicked");
    e.preventDefault();
    e.stopPropagation();
    
    // Direct navigation to checkout
    console.log("PricingActions: Directly navigating to /checkout via window.location");
    window.location.href = "/checkout";
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link to="/products">
            <ButtonCustom variant="outline" size="lg">
              {language === 'en' ? "View Device Information" : "Ver Información de Dispositivos"}
            </ButtonCustom>
          </Link>
          <ButtonCustom 
            variant="primary" 
            size="lg" 
            onClick={handleCheckoutClick}
            data-testid="pricing-checkout-button"
          >
            {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default PricingActions;
