
import React from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import HeroBackground from "../hero/HeroBackground";

interface DeviceHeroProps {
  language: string;
}

const DeviceHero: React.FC<DeviceHeroProps> = ({ language }) => {
  return (
    <section 
      id="devices-hero" 
      className="relative pt-24 pb-12 overflow-hidden bg-white"
    >
      {/* Using the shared HeroBackground component */}
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-guardian-400/20 to-guardian-600/20 border border-guardian-400/30 text-guardian-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'HEALTH MONITORING DEVICES' : 'DISPOSITIVOS DE MONITOREO DE SALUD'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent mb-4 relative z-10">
              <span className="block">
                {language === 'en' 
                  ? 'Our Health Monitoring Devices' 
                  : 'Nuestros Dispositivos de Monitoreo de Salud'}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 relative z-10">
              {language === 'en' 
                ? 'Advanced health and safety solutions designed for travelers, expats, and seniors living in Spain.' 
                : 'Soluciones avanzadas de salud y seguridad diseñadas para viajeros, expatriados y personas mayores que viven en España.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 relative z-10">
              <Link to="/join">
                <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
                  <span className="relative z-10 flex items-center">
                    {language === 'en' ? 'Explore our devices' : 'Explorar nuestros dispositivos'}
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-ice-500 to-ice-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceHero;
