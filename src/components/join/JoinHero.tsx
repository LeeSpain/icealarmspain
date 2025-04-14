
import React from "react";
import { Shield, Sparkles } from "lucide-react";
import HeroBackground from "../hero/HeroBackground";

interface JoinHeroProps {
  language: string;
}

const JoinHero: React.FC<JoinHeroProps> = ({ language }) => {
  return (
    <section id="join-hero" className="relative pt-16 pb-24 overflow-hidden bg-white">
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-guardian-400/10 border border-guardian-400/30 text-guardian-600 text-sm font-medium mb-6 shadow-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'JOIN OUR SERVICE' : 'ÚNASE A NUESTRO SERVICIO'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {language === 'en' 
                ? 'Join ICE Alarm Today' 
                : 'Únase a ICE Alarm Hoy'}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {language === 'en' 
                ? 'Choose your devices and create a personalized health monitoring package for you and your loved ones.' 
                : 'Elija sus dispositivos y cree un paquete de monitoreo de salud personalizado para usted y sus seres queridos.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinHero;

