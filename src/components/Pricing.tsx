
import React from "react";
import { Check, Truck, Shield } from "lucide-react";
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
        
        <div className="text-center max-w-3xl mx-auto mt-12">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">
              {language === 'en' ? "How Our Service Works" : "Cómo Funciona Nuestro Servicio"}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en'
                ? "Our AI Guardian service combines smart devices with 24/7 monitoring for comprehensive protection."
                : "Nuestro servicio AI Guardian combina dispositivos inteligentes con monitoreo 24/7 para una protección integral."}
            </p>
          </div>
          
          <div className="flex items-center justify-center text-ice-600 font-medium mb-8">
            <Truck className="mr-2 h-5 w-5" />
            <p>
              {language === 'en'
                ? "Devices are shipped directly to your door with easy setup instructions"
                : "Los dispositivos se envían directamente a su puerta con instrucciones de configuración sencillas"}
            </p>
          </div>
          
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
