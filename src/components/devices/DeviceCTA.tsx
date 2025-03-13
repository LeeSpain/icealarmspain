
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface DeviceCTAProps {
  language: string;
}

const DeviceCTA: React.FC<DeviceCTAProps> = ({ language }) => {
  console.log("Rendering DeviceCTA component");
  
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-br from-ice-50 to-ice-100 rounded-2xl p-8 md:p-12 shadow-sm border border-ice-200 max-w-5xl mx-auto">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900">
              {language === 'en' 
                ? 'Ready to Experience Peace of Mind?' 
                : '¿Listo para Experimentar Tranquilidad?'}
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'en'
                ? 'Join ICE Alarm today and enjoy the security of our smart health monitoring devices and 24/7 support.'
                : 'Únase a ICE Alarm hoy y disfrute de la seguridad de nuestros dispositivos inteligentes de monitoreo de salud y soporte 24/7.'}
            </p>
            
            <div className="pt-4">
              <Link to="/join">
                <ButtonCustom size="lg" className="group">
                  <span className="flex items-center">
                    {language === 'en' ? 'Join Now' : 'Únase Ahora'}
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceCTA;
