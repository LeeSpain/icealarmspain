
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Language } from "@/context/LanguageContext";

interface PricingActionsProps {
  language: Language;
}

const PricingActions: React.FC<PricingActionsProps> = ({ language }) => {
  const navigate = useNavigate();
  
  const handleCheckoutClick = (e: React.MouseEvent) => {
    console.log("PricingActions: Checkout button clicked");
    e.preventDefault();
    e.stopPropagation();
    
    // Create sample order data for the pricing page
    const sampleOrderData = {
      membershipType: "individual",
      items: [
        {
          id: "sos",
          name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
          price: 110.00,
          quantity: 1,
          monthlyPrice: 24.99,
          image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png"
        }
      ],
      deviceCount: 1,
      oneTimeTotal: 110.00,
      productTax: 23.10,  // 21% of 110
      shippingTotal: 14.99,
      shippingTax: 0,     // No longer charging shipping tax
      monthlyTotal: 24.99,
      monthlyTax: 2.50,   // 10% of 24.99
      total: 148.09       // 110 + 23.10 + 14.99 (without shipping tax)
    };
    
    console.log("PricingActions: Navigating to /checkout with sample data:", sampleOrderData);
    
    // Use React Router for navigation with the order data
    navigate("/checkout", { 
      state: { 
        orderData: sampleOrderData,
        fromPricing: true 
      }
    });
  };

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
