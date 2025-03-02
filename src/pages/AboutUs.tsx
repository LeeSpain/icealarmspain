
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const AboutUs: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-gradient-to-b from-white to-ice-50/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                {language === 'en' ? 'About Us' : 'Sobre Nosotros'}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ice-400 to-guardian-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="glass-panel mb-10 transform transition-all duration-300 hover:translate-y-[-5px]">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-ice-700 font-playfair">
                  {language === 'en' ? 'Our Mission' : 'Nuestra Misión'}
                </h2>
                <p className="mb-6">
                  {language === 'en' 
                    ? 'At ICE Alarm España, our mission is to empower older adults and expatriates in Spain with innovative technology that enhances safety, improves health management, and provides peace of mind to both users and their families.'
                    : 'En ICE Alarm España, nuestra misión es empoderar a adultos mayores y expatriados en España con tecnología innovadora que mejora la seguridad, facilita la gestión de la salud y proporciona tranquilidad tanto a los usuarios como a sus familias.'}
                </p>
                <p>
                  {language === 'en'
                    ? 'We believe that advanced health monitoring should be accessible, user-friendly, and tailored to meet the unique needs of our diverse community. Through AI-powered solutions and human-centered design, we aim to bridge the gap between technology and compassionate care.'
                    : 'Creemos que el monitoreo avanzado de salud debe ser accesible, fácil de usar y adaptado para satisfacer las necesidades únicas de nuestra diversa comunidad. A través de soluciones impulsadas por IA y diseño centrado en el humano, buscamos cerrar la brecha entre la tecnología y el cuidado compasivo.'}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="glass-panel flex-1 transform transition-all duration-300 hover:translate-y-[-5px]">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-guardian-700 font-playfair">
                    {language === 'en' ? 'Our Story' : 'Nuestra Historia'}
                  </h2>
                  <p className="mb-6">
                    {language === 'en'
                      ? 'Founded in 2018, ICE Alarm España emerged from a personal experience when our founder struggled to find reliable health monitoring services for their elderly parent who had relocated to southern Spain. Recognizing the challenges faced by expatriates and older adults in accessing appropriate healthcare support, we set out to create a solution that combines cutting-edge technology with compassionate human service.'
                      : 'Fundada en 2018, ICE Alarm España surgió de una experiencia personal cuando nuestro fundador tuvo dificultades para encontrar servicios confiables de monitoreo de salud para su padre mayor que se había mudado al sur de España. Reconociendo los desafíos que enfrentan los expatriados y adultos mayores para acceder a un apoyo sanitario adecuado, nos propusimos crear una solución que combine tecnología de vanguardia con servicio humano compasivo.'}
                  </p>
                </div>
                
                <div className="glass-panel flex-1 transform transition-all duration-300 hover:translate-y-[-5px]">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-guardian-700 font-playfair">
                    {language === 'en' ? 'Our Growth' : 'Nuestro Crecimiento'}
                  </h2>
                  <p>
                    {language === 'en'
                      ? 'Since then, we have grown to serve thousands of clients across Spain, continuously innovating our offerings based on user feedback and technological advancements. Today, ICE Alarm España is recognized as a leader in AI-powered health monitoring and emergency response services.'
                      : 'Desde entonces, hemos crecido para servir a miles de clientes en toda España, innovando continuamente nuestras ofertas basadas en los comentarios de los usuarios y los avances tecnológicos. Hoy, ICE Alarm España es reconocida como líder en servicios de monitoreo de salud y respuesta de emergencia impulsados por IA.'}
                  </p>
                </div>
              </div>
              
              <div className="glass-panel mb-10 transform transition-all duration-300 hover:translate-y-[-5px]">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-ice-700 font-playfair">
                  {language === 'en' ? 'Our Team' : 'Nuestro Equipo'}
                </h2>
                <p className="mb-6">
                  {language === 'en'
                    ? 'Our diverse team brings together expertise in healthcare, technology, customer service, and expatriate support. We employ professionals who are not only skilled in their respective fields but also deeply committed to our mission of enhancing lives through thoughtful innovation.'
                    : 'Nuestro diverso equipo reúne experiencia en atención médica, tecnología, servicio al cliente y apoyo a expatriados. Empleamos a profesionales que no solo son expertos en sus respectivos campos, sino que también están profundamente comprometidos con nuestra misión de mejorar vidas a través de la innovación reflexiva.'}
                </p>
                <p>
                  {language === 'en'
                    ? 'Our call center agents are multilingual and trained to handle emergencies with empathy and efficiency. Our technical team continuously works to improve our devices and AI systems, ensuring they remain at the cutting edge of health monitoring technology.'
                    : 'Nuestros agentes de centro de llamadas son multilingües y están capacitados para manejar emergencias con empatía y eficiencia. Nuestro equipo técnico trabaja continuamente para mejorar nuestros dispositivos y sistemas de IA, asegurando que permanezcan a la vanguardia de la tecnología de monitoreo de salud.'}
                </p>
              </div>
              
              <div className="glass-panel relative overflow-hidden transform transition-all duration-300 hover:translate-y-[-5px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-guardian-100 rounded-full -mr-16 -mt-16 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-ice-100 rounded-full -ml-12 -mb-12 opacity-60"></div>
                
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-guardian-700 font-playfair relative z-10">
                  {language === 'en' ? 'Our Community' : 'Nuestra Comunidad'}
                </h2>
                <p className="mb-6 relative z-10">
                  {language === 'en'
                    ? 'We are proud to serve both the local Spanish community and the expatriate population throughout Spain. Our services are fully bilingual, with all interfaces, support, and emergency response available in both Spanish and English.'
                    : 'Estamos orgullosos de servir tanto a la comunidad española local como a la población expatriada en toda España. Nuestros servicios son completamente bilingües, con todas las interfaces, soporte y respuesta de emergencia disponibles tanto en español como en inglés.'}
                </p>
                <p className="relative z-10">
                  {language === 'en'
                    ? 'Our marketing and outreach efforts are tailored to meet the needs of both demographics, with Spanish-language advertising campaigns running alongside our English language initiatives. We believe in creating an inclusive environment where everyone can access life-saving technology, regardless of their primary language.'
                    : 'Nuestros esfuerzos de marketing y divulgación están adaptados para satisfacer las necesidades de ambos grupos demográficos, con campañas publicitarias en español que se ejecutan junto con nuestras iniciativas en inglés. Creemos en crear un entorno inclusivo donde todos puedan acceder a tecnología que salva vidas, independientemente de su idioma principal.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
