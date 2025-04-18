
import React from "react";
import { Shield, HeartPulse, Clock } from "lucide-react";

interface FeatureCardsProps {
  language: string;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ language }) => {
  const features = [
    {
      icon: <Shield className="w-10 h-10 text-ice-600" />,
      title: language === 'en' ? "24/7 Protection" : "Protección 24/7",
      description: language === 'en' 
        ? "Continuous monitoring with instant emergency response when you need it most."
        : "Monitoreo continuo con respuesta de emergencia instantánea cuando más lo necesita.",
      delay: "animate-delay-100",
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-guardian-600" />,
      title: language === 'en' ? "Health Insights" : "Información de Salud",
      description: language === 'en'
        ? "AI-powered analysis of your health data for personalized recommendations."
        : "Análisis impulsado por IA de sus datos de salud para recomendaciones personalizadas.",
      delay: "animate-delay-200",
    },
    {
      icon: <Clock className="w-10 h-10 text-ice-600" />,
      title: language === 'en' ? "Rapid Response" : "Respuesta Rápida",
      description: language === 'en'
        ? "Immediate assistance through our professional call center and AI Guardian."
        : "Asistencia inmediata a través de nuestro centro de llamadas profesional y Guardián de IA.",
      delay: "animate-delay-300",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className={`glass-panel p-6 flex flex-col items-center text-center animate-slide-up ${feature.delay} hover:translate-y-[-5px] transition-transform duration-300 relative overflow-hidden`}
        >
          {/* Removed the problematic gradient background */}
          <div className="mb-4 p-3 bg-white rounded-full shadow-subtle relative z-10">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 relative z-10">{feature.title}</h3>
          <p className="text-muted-foreground relative z-10">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
