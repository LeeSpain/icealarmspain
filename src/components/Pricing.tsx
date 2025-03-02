
import React from "react";
import { Check, Truck, Shield, Info, AlertCircle } from "lucide-react";
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
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? "Service Packages & Options" : "Paquetes de Servicio y Opciones"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en'
              ? "Learn about our comprehensive monitoring services and package options designed to fit your needs."
              : "Conozca nuestros servicios integrales de monitoreo y opciones de paquetes diseñados para adaptarse a sus necesidades."}
          </p>
          <p className="text-ice-600 mt-4">
            {language === 'en'
              ? "Explore our service packages below and visit our Products page to learn more about our innovative devices."
              : "Explore nuestros paquetes de servicio a continuación y visite nuestra página de Productos para obtener más información sobre nuestros dispositivos innovadores."}
          </p>
        </div>
        
        {/* Important Service Clarification Notice */}
        <div className="max-w-3xl mx-auto bg-orange-50 border border-orange-200 rounded-xl p-4 mb-10 flex items-start">
          <AlertCircle className="text-orange-500 h-5 w-5 mr-3 flex-shrink-0 mt-1" />
          <p className="text-sm text-gray-700">
            {language === 'en' 
              ? "Our AI Guardian service remains consistent across all plans. Adding more devices gives you device-specific features only, not additional AI services. You pay only for the connections and device-specific features you need."
              : "Nuestro servicio AI Guardian se mantiene consistente en todos los planes. Agregar más dispositivos le brinda características específicas del dispositivo únicamente, no servicios de IA adicionales. Usted paga solo por las conexiones y características específicas del dispositivo que necesita."}
          </p>
        </div>
        
        {/* Service Packages Section */}
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
        
        {/* Device Connection Information */}
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
