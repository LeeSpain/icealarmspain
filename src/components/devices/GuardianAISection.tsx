
import React from "react";
import { Shield, Bot, Zap } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface GuardianAISectionProps {
  language: string;
}

const GuardianAISection: React.FC<GuardianAISectionProps> = ({ language }) => {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ice-50/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-ice-50/30 -mr-16 -mb-16"></div>
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-ice-100"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
                <Bot size={16} className="mr-2" />
                <span>{language === 'en' ? 'AI GUARDIAN TECHNOLOGY' : 'TECNOLOGÍA GUARDIAN DE IA'}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                {language === 'en' 
                  ? "Intelligent Health Monitoring & Response" 
                  : "Monitoreo Inteligente y Respuesta de Salud"}
              </h2>
              
              <p className="text-lg text-muted-foreground">
                {language === 'en'
                  ? "Our AI Guardian system continuously monitors your health data from connected devices, providing smart alerts and emergency response when you need it most."
                  : "Nuestro sistema Guardian de IA monitorea continuamente sus datos de salud desde dispositivos conectados, proporcionando alertas inteligentes y respuesta de emergencia cuando más lo necesita."}
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <div className="bg-ice-50 p-2 rounded-full mr-4">
                    <Shield size={20} className="text-ice-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-playfair">
                      {language === 'en' ? "Predictive Analysis" : "Análisis Predictivo"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'en'
                        ? "Identifies potential health issues before they become emergencies."
                        : "Identifica posibles problemas de salud antes de que se conviertan en emergencias."}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-ice-50 p-2 rounded-full mr-4">
                    <Zap size={20} className="text-ice-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-playfair">
                      {language === 'en' ? "Instant Response" : "Respuesta Instantánea"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'en'
                        ? "Automatically alerts emergency services and contacts when critical situations are detected."
                        : "Alerta automáticamente a los servicios de emergencia y contactos cuando se detectan situaciones críticas."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <Link to="/about-ai-guardian">
                  <ButtonCustom>
                    {language === 'en' ? "Learn More About AI Guardian" : "Más Información Sobre Guardian de IA"}
                  </ButtonCustom>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="rounded-lg bg-gradient-to-br from-ice-50 to-white border border-ice-100 shadow-lg p-6 relative">
                <div className="absolute -top-3 -right-3 bg-ice-500 text-white text-xs px-2 py-1 rounded-full">
                  {language === 'en' ? "AI-Powered" : "Impulsado por IA"}
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-ice-100 flex items-center justify-center mr-3">
                      <Bot size={20} className="text-ice-600" />
                    </div>
                    <div>
                      <h4 className="font-medium font-playfair">AI Guardian</h4>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? "Active Monitoring" : "Monitoreo Activo"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-ice-50/50 rounded p-3 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Shield size={16} className="text-green-600" />
                      </div>
                      <div className="flex-grow">
                        <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-1/2 mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 bg-green-50 text-green-800 p-3 rounded-lg text-sm">
                  <div className="flex items-center">
                    <Shield size={16} className="mr-2" />
                    <span>
                      {language === 'en' 
                        ? "All systems functioning normally" 
                        : "Todos los sistemas funcionando normalmente"}
                    </span>
                  </div>
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
