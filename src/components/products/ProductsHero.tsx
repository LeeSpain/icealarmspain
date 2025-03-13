
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import HeroBackground from "../hero/HeroBackground";

const ProductsHero: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const handleCheckoutClick = (e: React.MouseEvent) => {
    console.log("Products page: Checkout button clicked");
    e.preventDefault();
    e.stopPropagation();
    
    // Use React Router for navigation with state flag to prevent redirect
    console.log("Products page: Navigating to /checkout");
    navigate("/checkout", { state: { fromCheckoutButton: true } });
  };
  
  return (
    <section 
      id="products-hero" 
      className="relative pt-24 pb-24 overflow-hidden bg-white"
    >
      {/* Using the updated HeroBackground component */}
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'INNOVATIVE SOLUTIONS' : 'SOLUCIONES INNOVADORAS'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            {/* Enhanced headline with professional styling */}
            <div className="relative mb-12">
              {/* Decorative elements behind the headline */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair mx-auto max-w-4xl relative">
                <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                  {language === 'en' 
                    ? 'Complete Healthcare Protection' 
                    : 'Protección Completa de Salud'}
                </span>
                
                {/* Accent decorations */}
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
              </h1>
              
              {/* Decorative elements after the headline */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto py-2 rounded-lg mt-6">
              {language === 'en' 
                ? 'Experience peace of mind with our integrated ecosystem of protection devices and 24/7 emergency monitoring for independent living.' 
                : 'Experimente tranquilidad con nuestro ecosistema integrado de dispositivos de protección y monitoreo de emergencia 24/7 para una vida independiente.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/devices">
                <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
                  <span className="relative z-10 flex items-center">
                    {language === 'en' ? 'Explore Devices' : 'Explorar Dispositivos'}
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-ice-500 to-ice-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                </ButtonCustom>
              </Link>
              <ButtonCustom 
                variant="outline" 
                size="lg" 
                className="border-ice-200 hover:border-ice-300 shadow-sm"
                onClick={handleCheckoutClick}
                data-testid="products-checkout-button"
              >
                {language === 'en' ? 'Start Checkout Process' : 'Iniciar Proceso de Compra'}
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
      
      {/* Removed bottom wave entirely */}
    </section>
  );
};

export default ProductsHero;
