
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "./ContactForm";
import ContactCards from "./ContactCards";
import AIGuardianSection from "./AIGuardianSection";
import VisitUsSection from "./VisitUsSection";

const ContactContent: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-gradient-to-b from-white to-ice-50/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 pt-12">
            <div className="w-24 h-1 bg-gradient-to-r from-ice-400 to-guardian-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Contact cards section */}
          <ContactCards />
          
          {/* AI Guardian section */}
          <AIGuardianSection />

          {/* Visit Us section */}
          <VisitUsSection />
          
          {/* Form section with enhanced styling */}
          <div className="bg-gradient-to-br from-white to-ice-50/50 rounded-2xl shadow-lg p-8 mb-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-ice-100/30 rounded-full translate-x-1/2 -translate-y-1/2 filter blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-guardian-100/20 rounded-full -translate-x-1/2 translate-y-1/2 filter blur-xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent">
                  {language === 'en' ? 'Send Us a Message' : 'Envíenos un Mensaje'}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {language === 'en' 
                    ? 'Fill out the form below and our team will get back to you within 24 hours.' 
                    : 'Complete el formulario a continuación y nuestro equipo se pondrá en contacto con usted dentro de las 24 horas.'}
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
