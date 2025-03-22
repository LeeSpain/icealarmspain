
import React from "react";
import { Users, Globe, Clock } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface TeamCommunityProps {
  language: string;
}

const TeamCommunity: React.FC<TeamCommunityProps> = ({ language }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 mb-16 transform transition-all duration-300 hover:translate-y-[-5px]">
            <div className="mb-4 text-ice-500 flex items-center">
              <Users size={24} className="mr-2" />
              <h2 className="text-2xl md:text-3xl font-semibold text-ice-700">
                {language === 'en' ? 'Our Team' : 'Nuestro Equipo'}
              </h2>
            </div>
            <p className="mb-6">
              {language === 'en'
                ? 'Our diverse team brings together Spanish professionals and international experts in healthcare, technology, and customer service. We employ people who are not only skilled in their respective fields but also deeply committed to our mission of enhancing lives through thoughtful innovation.'
                : 'Nuestro diverso equipo reúne a profesionales españoles y expertos internacionales en atención médica, tecnología y servicio al cliente. Empleamos a personas que no solo son expertas en sus respectivos campos, sino que también están profundamente comprometidas con nuestra misión de mejorar vidas a través de la innovación reflexiva.'}
            </p>
            <p>
              {language === 'en'
                ? 'Our multilingual staff represents the communities we serve, ensuring cultural sensitivity and understanding in every interaction. From our developers to our care coordinators, everyone at ICE Alarm shares a common goal: creating technology that cares.'
                : 'Nuestro personal multilingüe representa a las comunidades a las que servimos, garantizando sensibilidad cultural y comprensión en cada interacción. Desde nuestros desarrolladores hasta nuestros coordinadores de atención, todos en ICE Alarm comparten un objetivo común: crear tecnología que cuida.'}
            </p>
          </div>
          
          <div className="glass-panel p-8 relative overflow-hidden transform transition-all duration-300 hover:translate-y-[-5px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-guardian-100 rounded-full -mr-16 -mt-16 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-ice-100 rounded-full -ml-12 -mb-12 opacity-60"></div>
            
            <div className="mb-4 text-guardian-500 flex items-center relative z-10">
              <Globe size={24} className="mr-2" />
              <h2 className="text-2xl md:text-3xl font-semibold text-guardian-700">
                {language === 'en' ? 'Our Community' : 'Nuestra Comunidad'}
              </h2>
            </div>
            <p className="mb-6 relative z-10">
              {language === 'en'
                ? 'For over five years, we have been honored to serve Spanish local communities alongside the diverse expatriate population throughout Spain. Our deep roots in the Spanish healthcare landscape combined with international expertise allow us to offer uniquely comprehensive services.'
                : 'Durante más de cinco años, hemos tenido el honor de servir a las comunidades locales españolas junto con la diversa población expatriada en toda España. Nuestras profundas raíces en el panorama sanitario español combinadas con experiencia internacional nos permiten ofrecer servicios excepcionalmente completos.'}
            </p>
            <p className="relative z-10 mb-8">
              {language === 'en'
                ? 'We embrace the rich cultural diversity of Spain by ensuring all our services, support, and resources are fully accessible in both Spanish and English, with additional language options available when needed.'
                : 'Abrazamos la rica diversidad cultural de España asegurando que todos nuestros servicios, soporte y recursos sean completamente accesibles tanto en español como en inglés, con opciones de idiomas adicionales disponibles cuando sea necesario.'}
            </p>

            <div className="flex justify-center mt-4 relative z-10">
              <ButtonCustom>
                <Clock size={16} className="mr-2" />
                {language === 'en' ? 'Contact Us Today' : 'Contáctenos Hoy'}
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCommunity;
