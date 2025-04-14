
import React from "react";
import { Shield, Sparkles } from "lucide-react";
import HeroBackground from "../hero/HeroBackground";

interface AboutHeroProps {
  language: string;
}

const AboutHero: React.FC<AboutHeroProps> = ({ language }) => {
  return (
    <section id="about-hero" className="relative pt-16 pb-24 overflow-hidden bg-white">
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'Our Story' : 'Nuestra Historia'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'About ICE Alarm' : 'Acerca de ICE Alarm'}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {language === 'en' 
                ? 'Serving all communities across Spain with innovative health monitoring solutions since 2018.' 
                : 'Sirviendo a todas las comunidades en España con soluciones innovadoras de monitoreo de salud desde 2018.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
