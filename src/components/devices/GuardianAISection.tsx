
import React from "react";
import { Shield, Bot, Zap, Brain, HeartPulse, Activity } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface GuardianAISectionProps {
  language: string;
}

const GuardianAISection: React.FC<GuardianAISectionProps> = ({ language }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-glass overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ice-50/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-ice-50/30 -mr-12 -mb-12"></div>
      <div className="absolute top-20 left-10 w-48 h-48 rounded-full border border-ice-100"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
            <Bot size={18} className="mr-2" />
            <span>{language === 'en' ? 'AI GUARDIAN TECHNOLOGY' : 'TECNOLOGÍA GUARDIAN DE IA'}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            {language === 'en' 
              ? "Intelligent Health Monitoring" 
              : "Monitoreo Inteligente de Salud"}
          </h2>
          
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {language === 'en'
              ? "Our AI Guardian system continuously monitors your health data from connected devices, providing smart alerts and emergency response when you need it most."
              : "Nuestro sistema Guardian de IA monitorea continuamente sus datos de salud desde dispositivos conectados, proporcionando alertas inteligentes y respuesta de emergencia cuando más lo necesita."}
          </p>
        </div>
        
        {/* Visual illustration */}
        <div className="relative h-48 mb-8 overflow-hidden rounded-xl bg-ice-50/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-xs">
              {/* Center brain icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-full shadow-glass z-10">
                <Brain size={40} className="text-guardian-600" />
              </div>
              
              {/* Orbiting icons */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-subtle">
                <Activity size={24} className="text-ice-500" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-3 rounded-full shadow-subtle">
                <HeartPulse size={24} className="text-ice-500" />
              </div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-subtle">
                <Shield size={24} className="text-guardian-400" />
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-subtle">
                <Zap size={24} className="text-guardian-400" />
              </div>
              
              {/* Connecting lines */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-ice-100 animate-spin" style={{ animationDuration: "30s" }}></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start bg-white p-5 rounded-xl shadow-subtle">
            <div className="bg-ice-50 p-3 rounded-full mr-4">
              <Shield size={22} className="text-guardian-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg font-playfair">
                {language === 'en' ? "Predictive Analysis" : "Análisis Predictivo"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "Identifies potential health issues before they become emergencies."
                  : "Identifica posibles problemas de salud antes de que se conviertan en emergencias."}
              </p>
            </div>
          </div>
          
          <div className="flex items-start bg-white p-5 rounded-xl shadow-subtle">
            <div className="bg-ice-50 p-3 rounded-full mr-4">
              <Zap size={22} className="text-guardian-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg font-playfair">
                {language === 'en' ? "Instant Response" : "Respuesta Instantánea"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "Automatically alerts emergency services when critical situations are detected."
                  : "Alerta automáticamente a los servicios de emergencia cuando se detectan situaciones críticas."}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link to="/about-ai-guardian">
            <ButtonCustom size="lg">
              {language === 'en' ? "Learn More About AI Guardian" : "Más Información Sobre Guardian de IA"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuardianAISection;
