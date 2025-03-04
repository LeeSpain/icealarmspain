import React, { useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeviceShowcase from "@/components/DeviceShowcase";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, CheckCircle, Shield, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleCheckoutClick = useCallback((e: React.MouseEvent) => {
    console.log("Products page: Checkout button clicked");
    e.preventDefault();
    e.stopPropagation();
    
    // Use React Router for navigation
    console.log("Products page: Navigating to /checkout");
    navigate("/checkout");
  }, [navigate]);

  const featuresList = language === 'en' ? [
    "Real-time health monitoring",
    "24/7 emergency response",
    "AI-powered insights",
    "Medication management",
    "Family access dashboard",
    "Multilingual support",
    "Professional monitoring"
  ] : [
    "Monitoreo de salud en tiempo real",
    "Respuesta de emergencia 24/7",
    "Análisis impulsados por IA",
    "Gestión de medicamentos",
    "Panel de acceso familiar",
    "Soporte multilingüe",
    "Monitoreo profesional"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section - Updated to match other pages styling */}
        <section 
          id="products-hero" 
          className="relative pt-32 pb-24 overflow-hidden"
        >
          {/* Enhanced Background Elements */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
          <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full border border-guardian-200/50 -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
          
          {/* Decorative accent lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/50 to-transparent -z-10"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/30 to-transparent -z-10"></div>
          
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
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6">
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
          
          {/* Enhanced Bottom Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
              <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Showcase our devices */}
        <DeviceShowcase />
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'en' ? "Why Choose ICE Alarm España" : "Por Qué Elegir ICE Alarm España"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'en'
                  ? "Our integrated ecosystem provides comprehensive protection and monitoring, with multilingual support designed specifically for residents of Spain."
                  : "Nuestro ecosistema integrado proporciona protección y monitoreo integrales, con soporte multilingüe diseñado específicamente para residentes de España."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {featuresList.map((feature, index) => (
                <div key={index} className="flex items-start p-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-ice-600 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' ? "Ready to experience peace of mind?" : "¿Listo para experimentar tranquilidad?"}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
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
              >
                {language === 'en' ? "Start Checkout Process" : "Iniciar Proceso de Compra"}
              </ButtonCustom>
              <Link to="/contact">
                <ButtonCustom variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  {language === 'en' ? "Contact Our Team" : "Contactar a Nuestro Equipo"}
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
