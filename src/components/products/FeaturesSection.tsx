
import React from "react";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FeaturesSection: React.FC = () => {
  const { language } = useLanguage();
  
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
  );
};

export default FeaturesSection;
