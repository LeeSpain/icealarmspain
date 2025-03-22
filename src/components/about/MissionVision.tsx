
import React from "react";
import { Award, HeartHandshake } from "lucide-react";

interface MissionVisionProps {
  language: string;
}

const MissionVision: React.FC<MissionVisionProps> = ({ language }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass-panel p-8 transform transition-all duration-300 hover:translate-y-[-5px]">
              <div className="mb-4 text-ice-500 flex items-center">
                <Award size={24} className="mr-2" />
                <h2 className="text-2xl md:text-3xl font-semibold text-ice-700">
                  {language === 'en' ? 'Our Mission' : 'Nuestra Misión'}
                </h2>
              </div>
              <p className="mb-6">
                {language === 'en' 
                  ? 'At ICE Alarm, our mission is to empower everyone in Spain with innovative technology that enhances safety, improves health management, and provides peace of mind to both users and their families.'
                  : 'En ICE Alarm, nuestra misión es empoderar a todos en España con tecnología innovadora que mejora la seguridad, facilita la gestión de la salud y proporciona tranquilidad tanto a los usuarios como a sus familias.'}
              </p>
              <p>
                {language === 'en'
                  ? 'We believe that advanced health monitoring should be accessible, user-friendly, and tailored to meet the unique needs of our diverse community.'
                  : 'Creemos que el monitoreo avanzado de salud debe ser accesible, fácil de usar y adaptado para satisfacer las necesidades únicas de nuestra diversa comunidad.'}
              </p>
            </div>
            
            <div className="glass-panel p-8 transform transition-all duration-300 hover:translate-y-[-5px]">
              <div className="mb-4 text-guardian-500 flex items-center">
                <HeartHandshake size={24} className="mr-2" />
                <h2 className="text-2xl md:text-3xl font-semibold text-guardian-700">
                  {language === 'en' ? 'Our Vision' : 'Nuestra Visión'}
                </h2>
              </div>
              <p className="mb-6">
                {language === 'en'
                  ? 'We envision a future where technology bridges the gap between traditional healthcare and daily life, creating safer environments for all people regardless of age, language, or background.'
                  : 'Visualizamos un futuro donde la tecnología reduce la brecha entre la atención médica tradicional y la vida diaria, creando entornos más seguros para todas las personas sin importar su edad, idioma o procedencia.'}
              </p>
              <p>
                {language === 'en'
                  ? 'Our goal is to become the leading provider of intelligent health monitoring solutions across Spain, known for reliability, innovation, and compassionate service.'
                  : 'Nuestro objetivo es convertirnos en el principal proveedor de soluciones inteligentes de monitoreo de salud en toda España, conocidos por nuestra fiabilidad, innovación y servicio compasivo.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
