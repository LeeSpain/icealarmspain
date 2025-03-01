
import React from "react";
import { Check, Truck, Shield, Users, User, Heart, Home, UserCog } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";

const Pricing: React.FC = () => {
  const { language } = useLanguage();
  
  const plans = [
    {
      title: language === 'en' ? "Single Device" : "Dispositivo Único",
      price: "€24.99",
      period: language === 'en' ? "per month" : "por mes",
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
      icon: <User className="h-12 w-12 p-2 bg-orange-100 text-orange-500 rounded-full" />,
      isPopular: false
    },
    {
      title: language === 'en' ? "Dual Protection" : "Protección Dual",
      price: "€44.98",
      period: language === 'en' ? "per month" : "por mes",
      originalPrice: "€49.98",
      savings: language === 'en' ? "Save 10%" : "Ahorre 10%",
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
      icon: <Heart className="h-12 w-12 p-2 bg-orange-100 text-orange-500 rounded-full" />,
      isPopular: true
    },
    {
      title: language === 'en' ? "Complete Guardian" : "Guardian Completo",
      price: "€59.97",
      period: language === 'en' ? "per month" : "por mes",
      originalPrice: "€74.97",
      savings: language === 'en' ? "Save 20%" : "Ahorre 20%",
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
      icon: <Home className="h-12 w-12 p-2 bg-orange-100 text-orange-500 rounded-full" />,
      isPopular: false
    }
  ];
  
  const membershipTypes = [
    {
      id: "individual",
      icon: <User className="h-16 w-16 p-3 bg-gradient-to-br from-ice-50 to-ice-100 text-ice-600 rounded-full shadow-subtle animate-float" />,
      title: language === 'en' ? "Individual" : "Individual",
      subtitle: language === 'en' ? "For a single person" : "Para una persona"
    },
    {
      id: "couple",
      icon: <Heart className="h-16 w-16 p-3 bg-gradient-to-br from-ice-50 to-ice-100 text-ice-600 rounded-full shadow-subtle animate-float" />,
      title: language === 'en' ? "Couple" : "Pareja",
      subtitle: language === 'en' ? "For partners or spouses" : "Para parejas o cónyuges"
    },
    {
      id: "family",
      icon: <Home className="h-16 w-16 p-3 bg-gradient-to-br from-ice-50 to-ice-100 text-ice-600 rounded-full shadow-subtle animate-float" />,
      title: language === 'en' ? "Family" : "Familia",
      subtitle: language === 'en' ? "For family members" : "Para miembros de la familia"
    },
    {
      id: "caregiver",
      icon: <UserCog className="h-16 w-16 p-3 bg-gradient-to-br from-ice-50 to-ice-100 text-ice-600 rounded-full shadow-subtle animate-float" />,
      title: language === 'en' ? "Caregiver" : "Cuidador",
      subtitle: language === 'en' ? "For caregivers" : "Para cuidadores"
    }
  ];
  
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-ice-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? "Simple, Transparent Pricing" : "Precios Simples y Transparentes"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en'
              ? "Purchase your devices and subscribe to our monitoring services. No leasing, no hidden fees."
              : "Compre sus dispositivos y suscríbase a nuestros servicios de monitoreo. Sin arrendamiento, sin tarifas ocultas."}
          </p>
          <p className="text-ice-600 mt-4">
            {language === 'en'
              ? "Scroll down to select the devices you want to purchase and see your personalized pricing."
              : "Desplácese hacia abajo para seleccionar los dispositivos que desea comprar y ver sus precios personalizados."}
          </p>
        </div>
        
        {/* Package For Section - Now centered and with improved icons */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center flex items-center justify-center text-ice-600">
            <Shield className="mr-3 h-6 w-6" />
            {language === 'en' ? "Who Is This Package For?" : "¿Para Quién Es Este Paquete?"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipTypes.map(type => (
              <div 
                key={type.id}
                className="p-6 rounded-xl border border-ice-100 bg-white shadow-subtle hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4">{type.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  {language === 'en' ? "Most Popular" : "Más Popular"}
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  {plan.icon}
                  <h3 className="text-xl font-semibold ml-3">{plan.title}</h3>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                
                {(plan.originalPrice && plan.savings) && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                    <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                      {plan.savings}
                    </span>
                  </div>
                )}
                
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
                
                <Link to="/#devices">
                  <ButtonCustom className="w-full">
                    {language === 'en' ? "Select Devices" : "Seleccionar Dispositivos"}
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {language === 'en'
              ? "All plans include device purchase. Additional fees apply for device replacement."
              : "Todos los planes incluyen la compra del dispositivo. Se aplican tarifas adicionales para el reemplazo del dispositivo."}
          </p>
          <div className="flex items-center justify-center text-ice-600 font-medium animate-pulse">
            <Truck className="mr-2 h-5 w-5" />
            <p>
              {language === 'en'
                ? "Shipping fee of €14.99 applies per device"
                : "Se aplica una tarifa de envío de €14.99 por dispositivo"}
            </p>
          </div>
          <p className="text-ice-600 font-medium mt-4 animate-pulse">
            {language === 'en'
              ? "Select your devices below to create your personalized package"
              : "Seleccione sus dispositivos a continuación para crear su paquete personalizado"}
          </p>
          
          <Link to="/#devices" className="inline-block mt-6">
            <ButtonCustom variant="primary" size="lg">
              {language === 'en' ? "Shop Devices Now" : "Comprar Dispositivos Ahora"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
