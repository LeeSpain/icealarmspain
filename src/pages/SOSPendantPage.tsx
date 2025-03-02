
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { 
  BellRing, Smartphone, Wifi, Battery, Shield, 
  Check, Headphones, HeartPulse, ArrowRight, Sparkles, MapPin
} from "lucide-react";

const SOSPendantPage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          id="product-hero" 
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
                  <BellRing size={16} className="mr-2" />
                  <span className="relative">
                    {language === 'en' ? 'EMERGENCY RESPONSE' : 'RESPUESTA DE EMERGENCIA'}
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
                        ? 'SOS Pendant' 
                        : 'Colgante SOS'}
                    </span>
                    
                    {/* Accent decorations */}
                    <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
                  </h1>
                  
                  {/* Decorative elements after the headline */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
                </div>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6">
                  {language === 'en' 
                    ? 'Immediate emergency response with just one touch. Our advanced pendant provides around-the-clock protection with built-in fall detection and GPS tracking.' 
                    : 'Respuesta inmediata a emergencias con un solo toque. Nuestro colgante avanzado proporciona protección las 24 horas con detección de caídas y seguimiento GPS.'}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <Link to="/join">
                    <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
                      <span className="relative z-10 flex items-center">
                        {language === 'en' ? 'Order Now' : 'Ordenar Ahora'}
                        <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-ice-500 to-ice-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                    </ButtonCustom>
                  </Link>
                  <Link to="/demo">
                    <ButtonCustom variant="outline" size="lg" className="border-ice-200 hover:border-ice-300 shadow-sm">
                      {language === 'en' ? 'Request Demo' : 'Solicitar Demo'}
                    </ButtonCustom>
                  </Link>
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

        {/* Product Details Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <BellRing className="w-16 h-16 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {language === 'en' 
                    ? "Enhanced Protection at Your Fingertips" 
                    : "Protección Mejorada a Su Alcance"}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {language === 'en'
                    ? "Our most popular device, the SOS Pendant provides immediate emergency response with just one touch. Advanced fall detection automatically alerts our monitoring center when a fall is detected."
                    : "Nuestro dispositivo más popular, el Colgante SOS proporciona respuesta inmediata a emergencias con un solo toque. La detección avanzada de caídas alerta automáticamente a nuestro centro de monitoreo cuando se detecta una caída."}
                </p>
                
                <h3 className="text-xl font-semibold mb-3">
                  {language === 'en' ? "Key Features" : "Características Principales"}
                </h3>
                <ul className="space-y-3 mb-6">
                  {(language === 'en' 
                    ? [
                        "One-touch emergency button",
                        "Advanced fall detection",
                        "GPS location tracking",
                        "Water-resistant design",
                        "Long battery life (up to 7 days)",
                        "Two-way voice communication",
                        "Automatic emergency alerts",
                        "Customizable emergency contacts"
                      ]
                    : [
                        "Botón de emergencia con un toque",
                        "Detección avanzada de caídas",
                        "Seguimiento de ubicación GPS",
                        "Diseño resistente al agua",
                        "Batería de larga duración (hasta 7 días)",
                        "Comunicación de voz bidireccional",
                        "Alertas automáticas de emergencia",
                        "Contactos de emergencia personalizables"
                      ]
                  ).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">
                  {language === 'en' ? "Technical Specifications" : "Especificaciones Técnicas"}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {Object.entries({
                    batteryLife: language === 'en' ? "Up to 7 days" : "Hasta 7 días",
                    waterResistance: language === 'en' ? "IP67 (water resistant)" : "IP67 (resistente al agua)",
                    connectivity: language === 'en' ? "4G LTE & Bluetooth" : "4G LTE y Bluetooth",
                    dimensions: "4.5 × 3.2 × 1.2 cm",
                    weight: "35g"
                  }).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-orange-600">€110.00</p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? "One-time purchase (excl. 21% IVA)" : "Compra única (sin 21% IVA)"}
                    </p>
                  </div>
                  <span className="text-xl">+</span>
                  <div>
                    <p className="text-lg font-bold text-orange-600">€24.99/
                      <span className="text-sm font-medium">
                        {language === 'en' ? "month" : "mes"}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? "Monthly service (excl. 10% IVA)" : "Servicio mensual (sin 10% IVA)"}
                    </p>
                  </div>
                </div>
                
                <Link to="/join">
                  <ButtonCustom size="lg">
                    {language === 'en' ? "Add to Cart" : "Añadir al Carrito"}
                  </ButtonCustom>
                </Link>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png"
                  alt={language === 'en' ? "SOS Pendant" : "Colgante SOS"}
                  className="rounded-xl shadow-subtle w-full object-contain bg-white p-4"
                  style={{ height: '400px' }}
                />
                
                {/* Technical indicators */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-subtle">
                  <Wifi className="h-5 w-5 text-ice-600" />
                </div>
                <div className="absolute top-16 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-subtle">
                  <Battery className="h-5 w-5 text-green-500" />
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-subtle">
                  <MapPin className="h-5 w-5 text-orange-500" />
                </div>
                
                {/* Feature callouts */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-subtle text-sm font-medium text-ice-600 flex items-center">
                  <HeartPulse className="h-4 w-4 mr-1" />
                  {language === 'en' ? "Fall Detection" : "Detección de Caídas"}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-ice-50/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'en' ? "How It Works" : "Cómo Funciona"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BellRing className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'en' ? "Press the Button" : "Presione el Botón"}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? "When you need help, simply press the emergency button on your pendant." 
                    : "Cuando necesite ayuda, simplemente presione el botón de emergencia en su colgante."}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-14 h-14 bg-ice-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-7 h-7 text-ice-600" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'en' ? "Connect with Support" : "Conéctese con Soporte"}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? "You'll be connected to our 24/7 emergency response center in seconds." 
                    : "Se conectará con nuestro centro de respuesta de emergencia 24/7 en segundos."}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'en' ? "Get Immediate Help" : "Obtenga Ayuda Inmediata"}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? "Our team will send the appropriate help based on your situation." 
                    : "Nuestro equipo enviará la ayuda adecuada según su situación."}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-ice-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' 
                ? "Ready to experience peace of mind?" 
                : "¿Listo para experimentar tranquilidad?"}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {language === 'en'
                ? "Join thousands of satisfied customers who trust ICE Alarm España for their health monitoring needs."
                : "Únase a miles de clientes satisfechos que confían en ICE Alarm España para sus necesidades de monitoreo de salud."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <ButtonCustom variant="secondary" size="lg">
                  {language === 'en' ? "Order Now" : "Ordenar Ahora"}
                </ButtonCustom>
              </Link>
              <Link to="/demo">
                <ButtonCustom variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  {language === 'en' ? "Request Demo" : "Solicitar Demo"}
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

export default SOSPendantPage;
