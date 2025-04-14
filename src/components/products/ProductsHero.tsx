
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
      className="relative pt-24 pb-12 overflow-hidden bg-white"
    >
      {/* Using the updated HeroBackground component */}
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'SMART HEALTH DEVICES' : 'DISPOSITIVOS DE SALUD INTELIGENTES'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            {/* Enhanced headline with clean styling, no gradient background */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 relative z-10">
              <span className="block">
                {language === 'en' 
                  ? 'Smart Devices For Health & Safety' 
                  : 'Dispositivos Inteligentes Para Salud y Seguridad'}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 relative z-10">
              {language === 'en' 
                ? 'Explore our range of connected health devices designed for travelers and expats, with 24/7 monitoring and emergency support in multiple languages.' 
                : 'Explore nuestra gama de dispositivos de salud conectados diseñados para viajeros y expatriados, con monitoreo 24/7 y soporte de emergencia en múltiples idiomas.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 relative z-10">
              <Link to="/join">
                <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
                  <span className="relative z-10 flex items-center">
                    {language === 'en' ? 'Join today' : 'Únete hoy'}
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-ice-500 to-ice-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;
