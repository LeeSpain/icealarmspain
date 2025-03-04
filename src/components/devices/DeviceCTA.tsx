
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

interface DeviceCTAProps {
  language: string;
}

const DeviceCTA: React.FC<DeviceCTAProps> = ({ language }) => {
  const navigate = useNavigate();
  
  const handleCheckoutClick = (e: React.MouseEvent) => {
    console.log("DeviceCTA: Checkout button clicked");
    e.preventDefault();
    e.stopPropagation();
    
    // Use React Router for navigation
    console.log("DeviceCTA: Navigating to /checkout");
    navigate("/checkout");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-ice-50 to-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {language === 'en' 
            ? "Ready to Experience Complete Health Monitoring?" 
            : "¿Listo para Experimentar un Monitoreo de Salud Completo?"}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {language === 'en'
            ? "Choose the devices that best suit your needs and start your journey to better health monitoring today."
            : "Elija los dispositivos que mejor se adapten a sus necesidades y comience su camino hacia un mejor monitoreo de la salud hoy."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ButtonCustom 
            size="lg" 
            onClick={handleCheckoutClick}
            data-testid="device-cta-checkout-button"
          >
            {language === 'en' ? "Start Checkout Process" : "Iniciar Proceso de Compra"}
          </ButtonCustom>
          <Link to="/pricing">
            <ButtonCustom variant="outline" size="lg">
              {language === 'en' ? "View Pricing" : "Ver Precios"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeviceCTA;
