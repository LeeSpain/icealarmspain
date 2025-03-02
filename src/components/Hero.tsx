
import React from "react";
import { ButtonCustom } from "./ui/button-custom";
import { ArrowRight, Shield, HeartPulse, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  console.log("Hero component rendering with language:", language);

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-24 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full border border-guardian-200/50 -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
      
      {/* Decorative accent lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/50 to-transparent -z-10"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/30 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'AI-Powered Health Protection' : 'Protección de Salud con IA'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            {/* Enhanced headline with professional styling */}
            <div className="relative mb-8">
              {/* Decorative elements behind the headline */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair mx-auto max-w-4xl relative">
                <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                  {language === 'en' 
                    ? 'Intelligent Health Monitoring & Emergency Response' 
                    : 'Monitoreo Inteligente de Salud y Respuesta de Emergencia'}
                </span>
                
                {/* Accent decorations */}
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
              </h1>
              
              {/* Decorative elements after the headline */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-4">
              {language === 'en' 
                ? 'Our AI Guardian provides 24/7 monitoring and emergency support, integrating smart devices for real-time health tracking and instant response.' 
                : 'Nuestro Guardián de IA proporciona monitoreo 24/7 y soporte de emergencia, integrando dispositivos inteligentes para seguimiento de salud en tiempo real.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/products">
                <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
                  <span className="relative z-10 flex items-center">
                    {language === 'en' ? 'Explore Solutions' : 'Explorar Soluciones'}
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-ice-500 to-ice-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                </ButtonCustom>
              </Link>
              <Link to="/demo">
                <ButtonCustom variant="outline" size="lg" className="border-ice-200 hover:border-ice-300 shadow-sm">
                  {language === 'en' ? 'Learn More' : 'Más Información'}
                </ButtonCustom>
              </Link>
            </div>
          </div>
          
          {/* Feature Highlights with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              {
                icon: <Shield className="w-10 h-10 text-ice-600" />,
                title: language === 'en' ? "24/7 Protection" : "Protección 24/7",
                description: language === 'en' 
                  ? "Continuous monitoring with instant emergency response when you need it most."
                  : "Monitoreo continuo con respuesta de emergencia instantánea cuando más lo necesita.",
                delay: "animate-delay-100",
                gradient: "from-ice-50 to-white"
              },
              {
                icon: <HeartPulse className="w-10 h-10 text-guardian-600" />,
                title: language === 'en' ? "Health Insights" : "Información de Salud",
                description: language === 'en'
                  ? "AI-powered analysis of your health data for personalized recommendations."
                  : "Análisis impulsado por IA de sus datos de salud para recomendaciones personalizadas.",
                delay: "animate-delay-200",
                gradient: "from-guardian-50 to-white"
              },
              {
                icon: <Clock className="w-10 h-10 text-ice-600" />,
                title: language === 'en' ? "Rapid Response" : "Respuesta Rápida",
                description: language === 'en'
                  ? "Immediate assistance through our professional call center and AI Guardian."
                  : "Asistencia inmediata a través de nuestro centro de llamadas profesional y Guardián de IA.",
                delay: "animate-delay-300",
                gradient: "from-ice-50 to-white"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`glass-panel p-6 flex flex-col items-center text-center animate-slide-up ${feature.delay} hover:translate-y-[-5px] transition-transform duration-300 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-b ${feature.gradient} opacity-50 -z-10"></div>
                <div className="mb-4 p-3 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-subtle">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
