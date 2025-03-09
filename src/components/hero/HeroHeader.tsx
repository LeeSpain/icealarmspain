
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroHeaderProps {
  language: string;
  handleClick: () => void;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ language, handleClick }) => {
  return (
    <div className="text-center space-y-6 animate-slide-down">
      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
        <Shield size={16} className="mr-2" />
        <span className="relative">
          {language === 'en' ? 'AI-Powered Health Protection' : 'Protección de Salud con IA'}
          <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
        </span>
      </div>
      
      <div className="relative mb-12">
        {/* Decorative elements behind the headline */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mx-auto max-w-4xl relative">
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
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6">
        {language === 'en' 
          ? 'Our AI Guardian provides 24/7 monitoring and emergency support, integrating smart devices for real-time health tracking and instant response.' 
          : 'Nuestro Guardián de IA proporciona monitoreo 24/7 y soporte de emergencia, integrando dispositivos inteligentes para seguimiento de salud en tiempo real.'}
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
        <Link to="/products" onClick={handleClick}>
          <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
            <span className="relative z-10 flex items-center">
              {language === 'en' ? 'Explore Solutions' : 'Explorar Soluciones'}
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-ice-500 to-ice-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default HeroHeader;
