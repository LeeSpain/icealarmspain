
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";

const ProductsCTA: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const handleCheckoutClick = (e: React.MouseEvent) => {
    console.log("Products CTA: Checkout button clicked");
    e.preventDefault();
    e.stopPropagation();
    
    // Use React Router for navigation with state flag to prevent redirect
    console.log("Products CTA: Navigating to /checkout");
    navigate("/checkout", { state: { fromCheckoutButton: true } });
  };

  return (
    <section className="bg-ice-600 text-white py-14">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 font-playfair">
          {language === 'en' ? "Ready to experience peace of mind?" : "¿Listo para experimentar tranquilidad?"}
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto font-playfair">
          {language === 'en'
            ? "Join thousands of satisfied customers who trust ICE Alarm España for their health monitoring and emergency response needs."
            : "Únase a miles de clientes satisfechos que confían en ICE Alarm España para sus necesidades de monitoreo de salud y respuesta de emergencia."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonCustom 
            variant="secondary" 
            size="lg"
            onClick={handleCheckoutClick}
            data-testid="products-cta-checkout-button"
            className="font-playfair"
          >
            {language === 'en' ? "Start Checkout Process" : "Iniciar Proceso de Compra"}
          </ButtonCustom>
          <Link to="/contact">
            <ButtonCustom variant="outline" size="lg" className="text-white border-white hover:bg-white/10 font-playfair">
              {language === 'en' ? "Contact Our Team" : "Contactar a Nuestro Equipo"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsCTA;
