import React from "react";
import { Shield, ArrowRight, Sparkles } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import HeroBackground from "../hero/HeroBackground";

interface DeviceHeroProps {
  language: string;
}

const DeviceHero: React.FC<DeviceHeroProps> = ({ language }) => {
  return (
    <section id="devices-hero" className="relative pt-32 pb-24 overflow-hidden">
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'SMART HEALTH DEVICES' : 'DISPOSITIVOS INTELIGENTES DE SALUD'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            <div className="relative mb-12">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight mx-auto max-w-4xl relative">
                <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                  {language === 'en' 
                    ? 'Smart Devices For Health & Safety' 
                    : 'Dispositivos Inteligentes Para Salud y Seguridad'}
                </span>
                
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
              </h1>
              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6 font-inter">
              {language === 'en' 
                ? 'Explore our range of connected health devices designed for travelers and expats, with 24/7 monitoring and emergency support in multiple languages.' 
                : 'Explore nuestra gama de dispositivos de salud conectados diseñados para viajeros y expatriados, con monitoreo 24/7 y soporte de emergencia en múltiples idiomas.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/join">
                <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
                  <span className="relative z-10 flex items-center">
                    {language === 'en' ? 'View All Devices' : 'Ver Todos los Dispositivos'}
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-ice-500 to-ice-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                </ButtonCustom>
              </Link>
              <Link to="/contact">
                <ButtonCustom variant="outline" size="lg" className="border-ice-200 hover:border-ice-300 shadow-sm">
                  {language === 'en' ? 'Contact Sales' : 'Contactar Ventas'}
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default DeviceHero;
