
import React from "react";
import { Headphones, Clock, Phone, Users } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface CallCenterServicesProps {
  language: string;
}

const CallCenterServices: React.FC<CallCenterServicesProps> = ({ language }) => {
  return (
    <section className="py-4 bg-white overflow-hidden relative h-full">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ice-50/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-ice-50/30 -ml-12 -mb-12"></div>
      <div className="absolute top-20 right-10 w-48 h-48 rounded-full border border-ice-100"></div>
      
      <div className="relative z-10 h-full">
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-2">
            <Headphones size={16} className="mr-2" />
            <span>{language === 'en' ? '24/7 SUPPORT CENTER' : 'CENTRO DE SOPORTE 24/7'}</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair">
            {language === 'en' 
              ? "Always There When You Need Us" 
              : "Siempre Ahí Cuando Nos Necesita"}
          </h2>
          
          <p className="text-base text-muted-foreground">
            {language === 'en'
              ? "Our multilingual call center operates 24/7 to provide immediate assistance, emergency response, and personalized support."
              : "Nuestro centro de llamadas multilingüe opera 24/7 para brindar asistencia inmediata, respuesta de emergencia y soporte personalizado."}
          </p>
          
          <div className="space-y-4 pt-3">
            <div className="flex items-start">
              <div className="bg-ice-50 p-2 rounded-full mr-3">
                <Clock size={18} className="text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium font-playfair">
                  {language === 'en' ? "24/7 Availability" : "Disponibilidad 24/7"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'en'
                    ? "Our support team is available around the clock, every day of the year."
                    : "Nuestro equipo de soporte está disponible las 24 horas, todos los días del año."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-ice-50 p-2 rounded-full mr-3">
                <Users size={18} className="text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium font-playfair">
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
          
          <div className="pt-4">
            <Link to="/contact">
              <ButtonCustom size="sm">
                {language === 'en' ? "Contact Our Support Team" : "Contacte a Nuestro Equipo de Soporte"}
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallCenterServices;
