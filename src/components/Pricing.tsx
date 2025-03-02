
import React from "react";
import { Check, Truck, Shield, Info } from "lucide-react";
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
      features: language === 'en' 
        ? [
            "1 device monitoring",
            "24/7 emergency response",
            "AI Guardian basic interactions",
            "Dashboard access for family",
            "Monthly health reports"
          ]
        : [
            "Monitoreo de 1 dispositivo",
            "Respuesta de emergencia 24/7",
            "Interacciones básicas con IA Guardian",
            "Acceso al panel para la familia",
            "Informes de salud mensuales"
          ],
    },
    {
      title: language === 'en' ? "Dual Protection" : "Protección Dual",
      description: language === 'en'
        ? "Enhanced protection with two integrated devices."
        : "Protección mejorada con dos dispositivos integrados.",
      features: language === 'en'
        ? [
            "2 devices monitoring",
            "24/7 priority emergency response",
            "Full AI Guardian interactions",
            "Dashboard access for family",
            "Weekly health reports",
            "Medication reminders",
            "Wellness check-ins"
          ]
        : [
            "Monitoreo de 2 dispositivos",
            "Respuesta prioritaria de emergencia 24/7",
            "Interacciones completas con IA Guardian",
            "Acceso al panel para la familia",
            "Informes de salud semanales",
            "Recordatorios de medicación",
            "Consultas de bienestar"
          ],
      isPopular: true
    },
    {
      title: language === 'en' ? "Complete Guardian" : "Guardian Completo",
      description: language === 'en'
        ? "Comprehensive health monitoring with all three devices."
        : "Monitoreo de salud integral con los tres dispositivos.",
      features: language === 'en'
        ? [
            "3 devices monitoring",
            "24/7 VIP emergency response",
            "Premium AI Guardian features",
            "Multiple family members access",
            "Daily health insights",
            "Personalized health recommendations",
            "Priority technical support",
            "Advanced medication management"
          ]
        : [
            "Monitoreo de 3 dispositivos",
            "Respuesta VIP de emergencia 24/7",
            "Características premium de IA Guardian",
            "Acceso para múltiples miembros de la familia",
            "Información diaria de salud",
            "Recomendaciones de salud personalizadas",
            "Soporte técnico prioritario",
            "Gestión avanzada de medicamentos"
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
        
        {/* Service Clarification Notice */}
        <div className="max-w-3xl mx-auto bg-ice-50 border border-ice-100 rounded-xl p-4 mb-10 flex items-start">
          <Info className="text-ice-600 h-5 w-5 mr-3 flex-shrink-0 mt-1" />
          <p className="text-sm text-ice-700">
            {language === 'en' 
              ? "Our pricing is device-based. Each additional device connects to your existing AI Guardian service. You'll receive services specific to each device you add, without duplicating core AI Guardian features."
              : "Nuestro precio se basa en dispositivos. Cada dispositivo adicional se conecta a su servicio AI Guardian existente. Recibirá servicios específicos para cada dispositivo que agregue, sin duplicar las características básicas de AI Guardian."}
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
                    ? "All devices connect to your single AI Guardian service. Adding devices does not create multiple AI Guardian services."
                    : "Todos los dispositivos se conectan a su único servicio AI Guardian. Agregar dispositivos no crea múltiples servicios AI Guardian."}
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
                    ? "Each device adds its unique monitoring capabilities to your existing service. For example, adding a medication dispenser provides medication management features."
                    : "Cada dispositivo agrega sus capacidades únicas de monitoreo a su servicio existente. Por ejemplo, agregar un dispensador de medicamentos proporciona funciones de gestión de medicamentos."}
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
