import React from "react";
import { Check, Truck, Shield, Info, AlertCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";

const Pricing: React.FC = () => {
  const { language } = useLanguage();
  
  const plans = [
    {
      title: language === 'en' ? "Single Device" : "Dispositivo Único",
      description: language === 'en' 
        ? "Basic monitoring with a single device of your choice." 
        : "Monitoreo básico con un solo dispositivo de su elección.",
      deviceCount: 1,
      features: language === 'en' 
        ? [
            "AI Guardian service",
            "24/7 emergency response",
            "Dashboard access for family",
            "Monthly health updates",
            "Device-specific features"
          ]
        : [
            "Servicio AI Guardian",
            "Respuesta de emergencia 24/7",
            "Acceso al panel para la familia",
            "Actualizaciones mensuales de salud",
            "Características específicas del dispositivo"
          ],
    },
    {
      title: language === 'en' ? "Dual Protection" : "Protección Dual",
      description: language === 'en'
        ? "Enhanced monitoring with two integrated devices."
        : "Monitoreo mejorado con dos dispositivos integrados.",
      deviceCount: 2,
      features: language === 'en'
        ? [
            "AI Guardian service",
            "24/7 emergency response",
            "Dashboard access for family",
            "Monthly health updates",
            "Device-specific features for both devices",
            "10% monthly discount"
          ]
        : [
            "Servicio AI Guardian",
            "Respuesta de emergencia 24/7",
            "Acceso al panel para la familia",
            "Actualizaciones mensuales de salud",
            "Características específicas para ambos dispositivos",
            "10% de descuento mensual"
          ],
      isPopular: true
    },
    {
      title: language === 'en' ? "Complete Guardian" : "Guardian Completo",
      description: language === 'en'
        ? "Comprehensive monitoring with all three devices."
        : "Monitoreo integral con los tres dispositivos.",
      deviceCount: 3,
      features: language === 'en'
        ? [
            "AI Guardian service",
            "24/7 emergency response",
            "Dashboard access for family",
            "Monthly health updates",
            "Device-specific features for all devices",
            "20% monthly discount"
          ]
        : [
            "Servicio AI Guardian",
            "Respuesta de emergencia 24/7",
            "Acceso al panel para la familia",
            "Actualizaciones mensuales de salud",
            "Características específicas para todos los dispositivos",
            "20% de descuento mensual"
          ],
    }
  ];
  
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-ice-50">
      <section 
        id="pricing-hero" 
        className="relative pt-32 pb-24 overflow-hidden mb-16"
      >
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
        <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full border border-guardian-200/50 -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
        
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/50 to-transparent -z-10"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/30 to-transparent -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-6 animate-slide-down">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
                <Shield size={16} className="mr-2" />
                <span className="relative">
                  {language === 'en' ? 'Service Packages' : 'Paquetes de Servicio'}
                  <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
                </span>
              </div>
              
              <div className="relative mb-12">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair mx-auto max-w-4xl relative">
                  <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                    {language === 'en' 
                      ? 'Service Packages & Options' 
                      : 'Paquetes de Servicio y Opciones'}
                  </span>
                  
                  <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
                </h1>
                
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6">
                {language === 'en' 
                  ? 'Learn about our comprehensive monitoring services and package options designed to fit your needs.' 
                  : 'Conozca nuestros servicios integrales de monitoreo y opciones de paquetes diseñados para adaptarse a sus necesidades.'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
            <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <div className="w-24 h-1 bg-gradient-to-r from-ice-400 to-guardian-500 mx-auto rounded-full"></div>
          <p className="text-ice-600 mt-4">
            {language === 'en'
              ? "Explore our service packages below and visit our Products page to learn more about our innovative devices."
              : "Explore nuestros paquetes de servicio a continuación y visite nuestra página de Productos para obtener más información sobre nuestros dispositivos innovadores."}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-orange-50 border border-orange-200 rounded-xl p-4 mb-10 flex items-start">
          <AlertCircle className="text-orange-500 h-5 w-5 mr-3 flex-shrink-0 mt-1" />
          <p className="text-sm text-gray-700">
            {language === 'en' 
              ? "Our AI Guardian service is provided free with all plans. The monthly fee of €24.99 only applies to each connected device that you select, providing you with device-specific features."
              : "Nuestro servicio AI Guardian se proporciona gratis con todos los planes. La cuota mensual de €24.99 solo se aplica a cada dispositivo conectado que seleccione, proporcionándole características específicas del dispositivo."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl shadow-subtle overflow-hidden border transition-all duration-300 hover:shadow-lg animate-slide-up ${
                plan.isPopular ? "border-ice-400 transform md:scale-105" : "border-gray-100"
              }`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-ice-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                  {language === 'en' ? "Recommended" : "Recomendado"}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                
                <p className="text-muted-foreground text-sm mb-6">
                  {plan.description}
                </p>
                
                <div className="bg-ice-50 rounded-lg p-3 text-center mb-6">
                  <span className="text-sm font-medium text-ice-700">
                    {language === 'en' ? `${plan.deviceCount} Device Connection${plan.deviceCount > 1 ? 's' : ''}` : 
                    `${plan.deviceCount} Conexión${plan.deviceCount > 1 ? 'es' : ''} de Dispositivo`}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col gap-3">
                  <Link to="/products">
                    <ButtonCustom variant="outline" className="w-full">
                      {language === 'en' ? "View Devices" : "Ver Dispositivos"}
                    </ButtonCustom>
                  </Link>
                  <Link to="/join">
                    <ButtonCustom className="w-full">
                      {language === 'en' ? "Learn More" : "Más Información"}
                    </ButtonCustom>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto bg-white border border-ice-100 rounded-xl p-6 mb-12 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {language === 'en' ? "How Device Connections Work" : "Cómo Funcionan las Conexiones de Dispositivos"}
          </h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-start">
              <div className="bg-ice-100 rounded-full p-2 mr-4 flex-shrink-0">
                <Shield className="h-5 w-5 text-ice-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">
                  {language === 'en' ? "One AI Guardian Service" : "Un Servicio AI Guardian"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en'
                    ? "All devices connect to your single AI Guardian service. Adding devices does not create multiple AI Guardian services or enhance its features."
                    : "Todos los dispositivos se conectan a su único servicio AI Guardian. Agregar dispositivos no crea múltiples servicios AI Guardian ni mejora sus características."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-ice-100 rounded-full p-2 mr-4 flex-shrink-0">
                <Check className="h-5 w-5 text-ice-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">
                  {language === 'en' ? "Device-Specific Features" : "Características Específicas del Dispositivo"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en'
                    ? "Each device adds its unique monitoring capabilities to your existing service. For example, adding a medication dispenser provides medication management features only."
                    : "Cada dispositivo agrega sus capacidades únicas de monitoreo a su servicio existente. Por ejemplo, agregar un dispensador de medicamentos proporciona únicamente funciones de gestión de medicamentos."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-ice-100 rounded-full p-2 mr-4 flex-shrink-0">
                <Truck className="h-5 w-5 text-ice-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">
                  {language === 'en' ? "Simple Device Setup" : "Configuración Simple de Dispositivos"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en'
                    ? "All devices are shipped directly to your door with easy setup instructions. Our support team is available to help with installation if needed."
                    : "Todos los dispositivos se envían directamente a su puerta con instrucciones de configuración sencillas. Nuestro equipo de soporte está disponible para ayudar con la instalación si es necesario."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/products">
              <ButtonCustom variant="outline" size="lg">
                {language === 'en' ? "View Device Information" : "Ver Información de Dispositivos"}
              </ButtonCustom>
            </Link>
            <Link to="/join">
              <ButtonCustom variant="primary" size="lg">
                {language === 'en' ? "Get Started Today" : "Comience Hoy"}
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
