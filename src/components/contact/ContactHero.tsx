
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Sparkles } from "lucide-react";
import HeroBackground from "../hero/HeroBackground";

const ContactHero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="contact-hero" className="relative pt-16 pb-24 overflow-hidden bg-white">
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-guardian-400/10 border border-guardian-400/30 text-guardian-600 text-sm font-medium mb-6 shadow-sm">
              <Shield size={16} className="mr-2" />
              <span className="relative">
                {language === 'en' ? 'GET IN TOUCH' : 'CONTÁCTENOS'}
                <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              ICE Alarm
              <span className="block">
                {language === 'en' 
                  ? 'Contact Us' 
                  : 'Contáctenos'}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {language === 'en' 
                ? 'We\'re here to answer your questions about our services and how we can help protect you and your loved ones.' 
                : 'Estamos aquí para responder sus preguntas sobre nuestros servicios y cómo podemos ayudar a protegerlo a usted y a sus seres queridos.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
