
import React from "react";
import { Check, Shield, ArrowRight } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface GuardianAISectionProps {
  language: string;
}

const GuardianAISection: React.FC<GuardianAISectionProps> = ({ language }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-guardian-400/20 to-guardian-600/20 border border-guardian-400/30 text-guardian-600 text-sm font-medium mb-6 shadow-sm">
              <Shield size={16} className="mr-2" />
              <span>{language === 'en' ? "ADVANCED TECHNOLOGY" : "TECNOLOGÍA AVANZADA"}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent">
              {language === 'en' ? "Powered by Guardian AI" : "Impulsado por Guardian AI"}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              {language === 'en'
                ? "All our devices connect to our AI-powered monitoring system for continuous health analysis and rapid emergency response."
                : "Todos nuestros dispositivos se conectan a nuestro sistema de monitoreo impulsado por IA para análisis continuo de salud y respuesta rápida a emergencias."}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-ice-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8">
                <h3 className="text-xl font-semibold font-inter mb-4">
                  {language === 'en' ? "Intelligent Monitoring" : "Monitoreo Inteligente"}
                </h3>
                <p className="text-gray-600 mb-6 font-inter">
                  {language === 'en'
                    ? "Our AI system learns your normal patterns and can detect unusual changes that might indicate a health issue, often before you notice symptoms."
                    : "Nuestro sistema de IA aprende sus patrones normales y puede detectar cambios inusuales que podrían indicar un problema de salud, a menudo antes de que note los síntomas."}
                </p>
                <ul className="space-y-3">
                  {[
                    language === 'en' ? "24/7 health data analysis" : "Análisis de datos de salud 24/7",
                    language === 'en' ? "Automatic alerts for concerning patterns" : "Alertas automáticas para patrones preocupantes",
                    language === 'en' ? "Personalized health insights" : "Información personalizada de salud",
                    language === 'en' ? "Emergency response coordination" : "Coordinación de respuesta de emergencia"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-inter">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Link to="/join">
                    <ButtonCustom size="lg" className="group">
                      {language === 'en' ? "Experience Guardian AI" : "Experimente Guardian AI"}
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </ButtonCustom>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-ice-50 to-guardian-50 p-8 flex items-center justify-center">
                <div className="max-w-xs">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-ice-100 animate-pulse opacity-70"></div>
                    <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-guardian-400/30 animate-pulse opacity-70"></div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 relative z-10">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-ice-100 to-guardian-100 flex items-center justify-center">
                        <Shield size={32} className="text-guardian-600" />
                      </div>
                      
                      <h4 className="font-semibold text-lg text-center font-playfair">Guardian AI</h4>
                      <p className="text-sm text-gray-600 mt-2 text-center font-inter">
                        {language === 'en' 
                          ? "Intelligent health monitoring and emergency response system" 
                          : "Sistema inteligente de monitoreo de salud y respuesta de emergencia"}
                      </p>
                      
                      <div className="mt-6 space-y-2">
                        <div className="bg-ice-50 rounded-full h-2 w-full overflow-hidden">
                          <div className="bg-ice-500 h-full w-3/4 animate-pulse"></div>
                        </div>
                        <div className="bg-ice-50 rounded-full h-2 w-full overflow-hidden">
                          <div className="bg-guardian-400 h-full w-1/2 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                        </div>
                        <div className="bg-ice-50 rounded-full h-2 w-full overflow-hidden">
                          <div className="bg-ice-400 h-full w-2/3 animate-pulse" style={{ animationDelay: "1s" }}></div>
                        </div>
                      </div>
                    </div>
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
