
import React from "react";
import { Shield, Check, Heart, BellRing } from "lucide-react";

interface GuardianAISectionProps {
  language: string;
}

const GuardianAISection: React.FC<GuardianAISectionProps> = ({ language }) => {
  return (
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
  );
};

export default GuardianAISection;
