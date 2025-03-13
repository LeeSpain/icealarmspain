
import React from "react";
import { Shield, Bot, Zap } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface GuardianAISectionProps {
  language: string;
}

const GuardianAISection: React.FC<GuardianAISectionProps> = ({ language }) => {
  return (
    <section className="py-4 bg-white overflow-hidden relative h-full">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ice-50/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-ice-50/30 -mr-12 -mb-12"></div>
      <div className="absolute top-20 left-10 w-48 h-48 rounded-full border border-ice-100"></div>
      
      <div className="relative z-10 h-full">
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-2">
            <Bot size={16} className="mr-2" />
            <span>{language === 'en' ? 'AI GUARDIAN TECHNOLOGY' : 'TECNOLOGÍA GUARDIAN DE IA'}</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair">
            {language === 'en' 
              ? "Intelligent Health Monitoring" 
              : "Monitoreo Inteligente de Salud"}
          </h2>
          
          <p className="text-base text-muted-foreground">
            {language === 'en'
              ? "Our AI Guardian system continuously monitors your health data from connected devices, providing smart alerts and emergency response when you need it most."
              : "Nuestro sistema Guardian de IA monitorea continuamente sus datos de salud desde dispositivos conectados, proporcionando alertas inteligentes y respuesta de emergencia cuando más lo necesita."}
          </p>
          
          <div className="space-y-4 pt-3">
            <div className="flex items-start">
              <div className="bg-ice-50 p-2 rounded-full mr-3">
                <Shield size={18} className="text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium font-playfair">
                  {language === 'en' ? "Predictive Analysis" : "Análisis Predictivo"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'en'
                    ? "Identifies potential health issues before they become emergencies."
                    : "Identifica posibles problemas de salud antes de que se conviertan en emergencias."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-ice-50 p-2 rounded-full mr-3">
                <Zap size={18} className="text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium font-playfair">
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
          
          <div className="pt-4">
            <Link to="/about-ai-guardian">
              <ButtonCustom size="sm">
                {language === 'en' ? "Learn More About AI Guardian" : "Más Información Sobre Guardian de IA"}
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuardianAISection;
