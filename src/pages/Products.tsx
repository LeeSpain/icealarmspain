
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeviceShowcase from "@/components/DeviceShowcase";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const { t, language } = useLanguage();

  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        {/* Hero section */}
        <section className="bg-ice-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 mx-auto">
                {language === 'en' ? "Our Smart Health Monitoring Devices" : "Nuestros Dispositivos Inteligentes de Monitoreo de Salud"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                {language === 'en' 
                  ? "Discover our comprehensive range of AI-powered health monitoring devices designed to provide peace of mind and enhanced care for you and your loved ones."
                  : "Descubra nuestra amplia gama de dispositivos de monitoreo de salud impulsados por IA diseñados para brindar tranquilidad y atención mejorada para usted y sus seres queridos."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="#devices">
                  <ButtonCustom size="lg" className="px-8 py-6 text-lg">
                    {language === 'en' ? "Shop Now" : "Comprar Ahora"} <ArrowRight className="ml-2 h-5 w-5" />
                  </ButtonCustom>
                </Link>
                <Link to="/join">
                  <ButtonCustom variant="outline" size="lg" className="px-8 py-6 text-lg">
                    {language === 'en' ? "View Pricing Plans" : "Ver Planes de Precios"}
                  </ButtonCustom>
                </Link>
              </div>
            </div>
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
              <Link to="/join">
                <ButtonCustom variant="secondary" size="lg">
                  {language === 'en' ? "View Pricing Plans" : "Ver Planes de Precios"}
                </ButtonCustom>
              </Link>
              <Link to="/join">
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
