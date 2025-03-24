
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
    <div className="text-center space-y-6 animate-slide-down relative z-10">
      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-guardian-400/20 to-guardian-600/20 border border-guardian-400/30 text-guardian-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
        <Shield size={16} className="mr-2" />
        <span className="relative">
          {language === 'en' ? 'AI-Powered Health Protection' : 'Protección de Salud con IA'}
          <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent mb-4 relative z-10">
        ICE Alarm
        <span className="block">
          {language === 'en' 
            ? 'Intelligent Health Monitoring' 
            : 'Monitoreo Inteligente de Salud'}
        </span>
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 relative z-10">
        {language === 'en' 
          ? 'Join us in revolutionizing emergency response and health monitoring through AI-powered technology.' 
          : 'Únase a nosotros para revolucionar la respuesta de emergencia y el monitoreo de salud a través de tecnología impulsada por IA.'}
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 relative z-10">
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
