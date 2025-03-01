
import React from "react";
import { ButtonCustom } from "./ui/button-custom";
import { ArrowRight, Shield, HeartPulse, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Hero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-ice-100 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-guardian-100 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
              <Shield size={16} className="mr-2" />
              {language === 'en' ? 'AI-Powered Health Protection' : 'Protección de Salud con IA'}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight bg-gradient-to-r from-gray-900 via-ice-950 to-guardian-900 bg-clip-text text-transparent">
              {language === 'en' 
                ? 'Intelligent Health Monitoring & Emergency Response' 
                : 'Monitoreo Inteligente de Salud y Respuesta de Emergencia'}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              {language === 'en' 
                ? 'Our AI Guardian provides 24/7 monitoring and emergency support, integrating smart devices for real-time health tracking and instant response.' 
                : 'Nuestro Guardián de IA proporciona monitoreo 24/7 y soporte de emergencia, integrando dispositivos inteligentes para seguimiento de salud en tiempo real.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/products">
                <ButtonCustom size="lg" className="group">
                  {language === 'en' ? 'Explore Solutions' : 'Explorar Soluciones'}
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </ButtonCustom>
              </Link>
              <Link to="/demo">
                <ButtonCustom variant="outline" size="lg">
                  {language === 'en' ? 'Learn More' : 'Más Información'}
                </ButtonCustom>
              </Link>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: <Shield className="w-10 h-10 text-ice-600" />,
                title: language === 'en' ? "24/7 Protection" : "Protección 24/7",
                description: language === 'en' 
                  ? "Continuous monitoring with instant emergency response when you need it most."
                  : "Monitoreo continuo con respuesta de emergencia instantánea cuando más lo necesita.",
                delay: "animate-delay-100"
              },
              {
                icon: <HeartPulse className="w-10 h-10 text-guardian-600" />,
                title: language === 'en' ? "Health Insights" : "Información de Salud",
                description: language === 'en'
                  ? "AI-powered analysis of your health data for personalized recommendations."
                  : "Análisis impulsado por IA de sus datos de salud para recomendaciones personalizadas.",
                delay: "animate-delay-200"
              },
              {
                icon: <Clock className="w-10 h-10 text-ice-600" />,
                title: language === 'en' ? "Rapid Response" : "Respuesta Rápida",
                description: language === 'en'
                  ? "Immediate assistance through our professional call center and AI Guardian."
                  : "Asistencia inmediata a través de nuestro centro de llamadas profesional y Guardián de IA.",
                delay: "animate-delay-300"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`glass-panel p-6 flex flex-col items-center text-center animate-slide-up ${feature.delay}`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
