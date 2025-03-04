
import React from "react";
import { Briefcase, Users, DollarSign } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface CommercialHeroProps {
  language: string;
}

const CommercialHero: React.FC<CommercialHeroProps> = ({ language }) => {
  // Function to handle click and scroll to top
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-ice-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
            <Briefcase size={16} className="mr-2" />
            <span>
              {language === 'en' ? 'Commercial Partnerships' : 'Colaboraciones Comerciales'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {language === 'en' 
              ? 'Partner with ICE Alarm España' 
              : 'Colabore con ICE Alarm España'}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Explore opportunities to integrate our AI-powered health monitoring solutions into your business offerings and provide enhanced care for your customers.'
              : 'Explore oportunidades para integrar nuestras soluciones de monitoreo de salud con IA en sus ofertas comerciales y proporcione una atención mejorada a sus clientes.'}
          </p>
          
          <Link to="/contact" onClick={handleClick}>
            <ButtonCustom size="lg" className="bg-ice-600 hover:bg-ice-700 text-white">
              {language === 'en' ? 'Contact Our Team' : 'Contacte a Nuestro Equipo'}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommercialHero;
