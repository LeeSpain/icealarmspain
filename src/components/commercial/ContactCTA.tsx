
import React from "react";
import { Mail } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface ContactCTAProps {
  language: string;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ language }) => {
  // Function to handle click and scroll to top
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <section className="py-16 bg-ice-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {language === 'en' 
                  ? 'Ready to explore a partnership?' 
                  : '¿Listo para explorar una colaboración?'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'en'
                  ? 'Our team is ready to discuss how ICE Alarm España can benefit your business and customers.'
                  : 'Nuestro equipo está listo para discutir cómo ICE Alarm España puede beneficiar a su negocio y clientes.'}
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/contact" onClick={handleClick}>
                <ButtonCustom size="lg" className="bg-ice-600 hover:bg-ice-700 text-white">
                  <Mail className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Contact Support' : 'Contactar Soporte'}
                </ButtonCustom>
              </Link>
              <p className="text-sm text-muted-foreground mt-2 md:mt-0 md:ml-4">
                {language === 'en'
                  ? 'For partnership inquiries, please allow 1-2 business days for a response.'
                  : 'Para consultas de colaboración, por favor permita 1-2 días hábiles para una respuesta.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
