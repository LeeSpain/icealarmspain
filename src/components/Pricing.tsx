
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import PricingHero from "./pricing/PricingHero";
import PricingPlans from "./pricing/PricingPlans";
import PricingInfo from "./pricing/PricingInfo";
import PricingActions from "./pricing/PricingActions";

const Pricing: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
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
  
  const handleCheckout = () => {
    navigate("/checkout");
  };
  
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-ice-50">
      <PricingHero language={language} />
      <PricingPlans plans={plans} language={language} />
      <PricingInfo language={language} />
      <PricingActions language={language} />
    </section>
  );
};

export default Pricing;
