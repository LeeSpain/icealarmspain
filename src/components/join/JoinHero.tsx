
import React from "react";
import { Shield, Sparkles } from "lucide-react";
import HeroBackground from "../hero/HeroBackground";

interface JoinHeroProps {
  language: string;
}

const JoinHero: React.FC<JoinHeroProps> = ({ language }) => {
  return (
    <section id="join-hero" className="relative pt-32 pb-24 overflow-hidden bg-white">
      {/* Using the updated HeroBackground component instead of inline elements */}
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'JOIN OUR SERVICE' : 'ÚNASE A NUESTRO SERVICIO'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            {/* Enhanced headline with professional styling */}
            <div className="relative mb-12">
              {/* Decorative elements behind the headline */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair mx-auto max-w-4xl relative">
                <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                  {language === 'en' 
                    ? 'Join ICE Alarm España Today' 
                    : 'Únase a ICE Alarm España Hoy'}
                </span>
                
                {/* Accent decorations */}
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
              </h1>
              
              {/* Decorative elements after the headline */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto py-2 rounded-lg mt-6">
              {language === 'en' 
                ? 'Choose your devices and create a personalized health monitoring package for you and your loved ones.' 
                : 'Elija sus dispositivos y cree un paquete de monitoreo de salud personalizado para usted y sus seres queridos.'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Removed the bottom wave entirely */}
    </section>
  );
};

export default JoinHero;
