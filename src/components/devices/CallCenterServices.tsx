
import React from "react";
import { Headphones, Clock, Phone, Users, Shield, MessageCircle } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface CallCenterServicesProps {
  language: string;
}

const CallCenterServices: React.FC<CallCenterServicesProps> = ({ language }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-glass overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ice-50/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-ice-50/30 -ml-12 -mb-12"></div>
      <div className="absolute top-20 right-10 w-48 h-48 rounded-full border border-ice-100"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
            <Headphones size={18} className="mr-2" />
            <span>{language === 'en' ? '24/7 SUPPORT CENTER' : 'CENTRO DE SOPORTE 24/7'}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            {language === 'en' 
              ? "Always There When You Need Us" 
              : "Siempre Ahí Cuando Nos Necesita"}
          </h2>
          
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {language === 'en'
              ? "Our multilingual call center operates 24/7 to provide immediate assistance, emergency response, and personalized support."
              : "Nuestro centro de llamadas multilingüe opera 24/7 para brindar asistencia inmediata, respuesta de emergencia y soporte personalizado."}
          </p>
        </div>
        
        {/* Visual illustration */}
        <div className="relative h-48 mb-8 overflow-hidden rounded-xl bg-ice-50/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-6 w-full max-w-3xl px-6">
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-subtle animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <Phone size={28} className="text-ice-500 mb-2" />
                <span className="text-xs font-medium text-center">24/7 Support</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-subtle animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <MessageCircle size={28} className="text-ice-500 mb-2" />
                <span className="text-xs font-medium text-center">Multilingual</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-subtle animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Shield size={28} className="text-ice-500 mb-2" />
                <span className="text-xs font-medium text-center">Emergency Response</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start bg-white p-5 rounded-xl shadow-subtle">
            <div className="bg-ice-50 p-3 rounded-full mr-4">
              <Clock size={22} className="text-ice-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg font-playfair">
                {language === 'en' ? "24/7 Availability" : "Disponibilidad 24/7"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "Our support team is available around the clock, every day of the year."
                  : "Nuestro equipo de soporte está disponible las 24 horas, todos los días del año."}
              </p>
            </div>
          </div>
          
          <div className="flex items-start bg-white p-5 rounded-xl shadow-subtle">
            <div className="bg-ice-50 p-3 rounded-full mr-4">
              <Users size={22} className="text-ice-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg font-playfair">
                {language === 'en' ? "Multilingual Support" : "Soporte Multilingüe"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "Support available in English, Spanish, German, and more."
                  : "Soporte disponible en inglés, español, alemán y más."}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link to="/contact">
            <ButtonCustom size="lg">
              {language === 'en' ? "Contact Our Support Team" : "Contacte a Nuestro Equipo de Soporte"}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallCenterServices;
