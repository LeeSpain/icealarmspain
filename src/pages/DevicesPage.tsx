
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { 
  BellRing, PlusSquare, ActivitySquare, Shield, 
  Check, Headphones, Smartphone, Wifi, Battery, Heart, ArrowRight, Sparkles
} from "lucide-react";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  
  const devices = [
    {
      id: "sos",
      name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
      icon: <BellRing className="w-16 h-16 text-orange-500" />,
      image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png",
      price: 110.00,
      monthlyService: 24.99,
      description: language === 'en' 
        ? "Our most popular device, the SOS Pendant provides immediate emergency response with just one touch. Advanced fall detection automatically alerts our monitoring center when a fall is detected."
        : "Nuestro dispositivo más popular, el Colgante SOS proporciona respuesta inmediata a emergencias con un solo toque. La detección avanzada de caídas alerta automáticamente a nuestro centro de monitoreo cuando se detecta una caída.",
      features: language === 'en' 
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
          ],
      specs: {
        batteryLife: language === 'en' ? "Up to 7 days" : "Hasta 7 días",
        waterResistance: language === 'en' ? "IP67 (water resistant)" : "IP67 (resistente al agua)",
        connectivity: language === 'en' ? "4G LTE & Bluetooth" : "4G LTE y Bluetooth",
        dimensions: "4.5 × 3.2 × 1.2 cm",
        weight: "35g"
      },
      path: "/sos-pendant"
    },
    {
      id: "dispenser",
      name: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
      icon: <PlusSquare className="w-16 h-16 text-guardian-500" />,
      image: "/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png",
      price: 249.99,
      monthlyService: 24.99,
      description: language === 'en' 
        ? "Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking. The system can alert caregivers or family members when doses are missed."
        : "Nunca vuelva a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes y seguimiento de adherencia. El sistema puede alertar a cuidadores o familiares cuando se omiten dosis.",
      features: language === 'en' 
        ? [
            "Automated pill dispensing",
            "Customizable medication schedules",
            "Missed dose notifications",
            "Medication adherence tracking",
            "Refill reminders",
            "Multiple medication compartments",
            "Caregiver notifications",
            "Integration with health dashboard"
          ]
        : [
            "Dispensación automatizada de píldoras",
            "Horarios de medicación personalizables",
            "Notificaciones de dosis olvidadas",
            "Seguimiento de adherencia a la medicación",
            "Recordatorios de recarga",
            "Múltiples compartimentos para medicamentos",
            "Notificaciones para cuidadores",
            "Integración con el panel de salud"
          ],
      specs: {
        capacity: language === 'en' ? "Up to 28 doses" : "Hasta 28 dosis",
        powerSource: language === 'en' ? "AC Power with battery backup" : "Corriente AC con batería de respaldo",
        connectivity: "Wi-Fi",
        dimensions: "22 × 18 × 8 cm",
        weight: "650g"
      },
      path: "/medical-dispenser"
    },
    {
      id: "glucose",
      name: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
      icon: <ActivitySquare className="w-16 h-16 text-orange-500" />,
      image: "/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png",
      price: 149.99,
      monthlyService: 24.99,
      description: language === 'en' 
        ? "Our continuous Glucose Monitor provides real-time glucose tracking with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations. The device syncs automatically with our health dashboard."
        : "Nuestro Monitor de Glucosa continuo proporciona seguimiento de glucosa en tiempo real con análisis impulsado por IA. Reciba alertas inmediatas para niveles preocupantes y recomendaciones personalizadas. El dispositivo se sincroniza automáticamente con nuestro panel de salud.",
      features: language === 'en' 
        ? [
            "Continuous glucose monitoring",
            "Real-time data transmission",
            "Customizable alert thresholds",
            "Trend analysis and predictions",
            "Easy sensor application",
            "14-day sensor life",
            "Water-resistant design",
            "No fingerstick calibration needed"
          ]
        : [
            "Monitoreo continuo de glucosa",
            "Transmisión de datos en tiempo real",
            "Umbrales de alerta personalizables",
            "Análisis de tendencias y predicciones",
            "Fácil aplicación del sensor",
            "Vida útil del sensor de 14 días",
            "Diseño resistente al agua",
            "No se necesita calibración con pinchazo en el dedo"
          ],
      specs: {
        sensorLife: language === 'en' ? "Up to 14 days" : "Hasta 14 días",
        waterResistance: language === 'en' ? "IP27 (shower-proof)" : "IP27 (resistente a la ducha)",
        connectivity: language === 'en' ? "Bluetooth Low Energy" : "Bluetooth de baja energía",
        readingRange: "40-500 mg/dL",
        accuracy: "±10%"
      },
      path: "/glucose-monitor"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section - Updated to match other pages styling */}
        <section 
          id="devices-hero" 
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
                    {language === 'en' ? 'SMART HEALTH DEVICES' : 'DISPOSITIVOS INTELIGENTES DE SALUD'}
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
                        ? 'Our Smart Health Monitoring Devices' 
                        : 'Nuestros Dispositivos Inteligentes de Monitoreo de Salud'}
                    </span>
                    
                    {/* Accent decorations */}
                    <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
                  </h1>
                  
                  {/* Decorative elements after the headline */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
                </div>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6">
                  {language === 'en' 
                    ? 'Discover our comprehensive range of AI-powered health monitoring devices designed to provide peace of mind and enhanced care for you and your loved ones.' 
                    : 'Descubra nuestra amplia gama de dispositivos de monitoreo de salud impulsados por IA diseñados para brindar tranquilidad y atención mejorada para usted y sus seres queridos.'}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <Link to="/join">
                    <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
                      <span className="relative z-10 flex items-center">
                        {language === 'en' ? 'Shop Now' : 'Comprar Ahora'}
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

        {/* Guardian AI Integration Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
                  <Shield size={16} className="mr-2" />
                  {language === 'en' ? 'AI GUARDIAN TECHNOLOGY' : 'TECNOLOGÍA DE IA GUARDIAN'}
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {language === 'en' 
                    ? "Powered by Guardian AI" 
                    : "Impulsado por Guardian AI"}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {language === 'en'
                    ? "All our devices seamlessly integrate with our advanced Guardian AI system, providing intelligent monitoring and proactive health insights."
                    : "Todos nuestros dispositivos se integran perfectamente con nuestro avanzado sistema Guardian AI, proporcionando monitoreo inteligente e información proactiva sobre la salud."}
                </p>
                <ul className="space-y-3 mb-8">
                  {(language === 'en' 
                    ? [
                        "Continuous health monitoring with AI analysis",
                        "Proactive alerts before critical situations develop",
                        "Personalized health insights and recommendations",
                        "Seamless integration between all devices"
                      ]
                    : [
                        "Monitoreo continuo de salud con análisis de IA",
                        "Alertas proactivas antes de que se desarrollen situaciones críticas",
                        "Información y recomendaciones de salud personalizadas",
                        "Integración perfecta entre todos los dispositivos"
                      ]
                  ).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-ice-50 p-8 rounded-xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-ice-200 rounded-full opacity-50"></div>
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-guardian-200 rounded-full opacity-40"></div>
                <div className="relative z-10 bg-white rounded-lg shadow-subtle p-6 max-w-md mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">
                      {language === 'en' ? "Guardian AI" : "IA Guardian"}
                    </h3>
                    <span className="text-green-500 text-sm font-medium px-2 py-1 bg-green-50 rounded-full">
                      {language === 'en' ? "Active" : "Activo"}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-ice-100 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Heart className="text-red-500 mr-2 h-5 w-5" />
                        <span className="font-medium">
                          {language === 'en' ? "Health Insight" : "Información de Salud"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en'
                          ? "Your blood pressure readings show improvement after starting your new medication."
                          : "Sus lecturas de presión arterial muestran mejoría después de comenzar su nuevo medicamento."}
                      </p>
                    </div>
                    <div className="p-4 border border-orange-100 rounded-lg">
                      <div className="flex items-center mb-2">
                        <BellRing className="text-orange-500 mr-2 h-5 w-5" />
                        <span className="font-medium">
                          {language === 'en' ? "Recommendation" : "Recomendación"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en'
                          ? "It's time for your evening medication. Your dispenser has prepared your dose."
                          : "Es hora de su medicación nocturna. Su dispensador ha preparado su dosis."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Detailed Device Info */}
        {devices.map((device, index) => (
          <section key={device.id} className={`py-16 ${index % 2 === 0 ? 'bg-ice-50/30' : 'bg-white'}`}>
            <div className="container mx-auto px-4 md:px-6">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="mb-6">{device.icon}</div>
                  <h2 className="text-3xl font-bold mb-4">{device.name}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{device.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">
                    {language === 'en' ? "Key Features" : "Características Principales"}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {device.features.map((feature, idx) => (
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
                    {Object.entries(device.specs).map(([key, value]) => (
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
                      <p className="text-2xl font-bold text-orange-600">€{device.price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? "One-time purchase (excl. 21% IVA)" : "Compra única (sin 21% IVA)"}
                      </p>
                    </div>
                    <span className="text-xl">+</span>
                    <div>
                      <p className="text-lg font-bold text-orange-600">€{device.monthlyService.toFixed(2)}/
                        <span className="text-sm font-medium">
                          {language === 'en' ? "month" : "mes"}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? "Monthly service (excl. 10% IVA)" : "Servicio mensual (sin 10% IVA)"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/join">
                      <ButtonCustom>
                        {language === 'en' ? "Add to Cart" : "Añadir al Carrito"}
                      </ButtonCustom>
                    </Link>
                    <Link to={device.path}>
                      <ButtonCustom variant="outline">
                        {language === 'en' ? "Learn More" : "Más Información"}
                      </ButtonCustom>
                    </Link>
                  </div>
                </div>
                
                <div className={`${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    <img 
                      src={device.image}
                      alt={device.name}
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
                      <Smartphone className="h-5 w-5 text-ice-600" />
                    </div>
                    
                    {/* Feature callouts */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-subtle text-sm font-medium text-ice-600 flex items-center">
                      <Headphones className="h-4 w-4 mr-1" />
                      {language === 'en' ? "24/7 Support" : "Soporte 24/7"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
        
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
                  {language === 'en' ? "Shop Now" : "Comprar Ahora"}
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

export default DevicesPage;
