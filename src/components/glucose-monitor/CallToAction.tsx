
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Video } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";

const CallToAction: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        {language === 'en' ? 'Take Control of Your Health Today' : 'Tome el Control de Su Salud Hoy'}
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        {language === 'en' 
          ? 'Join thousands of satisfied customers who rely on our Glucose Monitor for real-time insights and better health management.' 
          : 'Únase a miles de clientes satisfechos que confían en nuestro Monitor de Glucosa para obtener información en tiempo real y una mejor gestión de la salud.'}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/join">
          <ButtonCustom size="lg">
            {language === 'en' ? 'Subscribe Now' : 'Suscribirse Ahora'}
          </ButtonCustom>
        </Link>
        <Link to="/contact">
          <ButtonCustom variant="outline" size="lg" className="flex items-center">
            <Phone className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Schedule a Demo' : 'Programar una Demostración'}
          </ButtonCustom>
        </Link>
        <Link to="/devices">
          <ButtonCustom variant="ghost" size="lg" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            {language === 'en' ? 'View Tutorial' : 'Ver Tutorial'}
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
