
import React from "react";
import { FileBadge, Globe, Sparkles } from "lucide-react";

interface JourneyTimelineProps {
  language: string;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ language }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-ice-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-guardian-700 font-playfair mb-4">
              {language === 'en' ? 'Our Journey' : 'Nuestro Camino'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en'
                ? 'From humble beginnings to becoming a trusted leader in health monitoring technology.'
                : 'Desde humildes comienzos hasta convertirnos en un líder confiable en tecnología de monitoreo de salud.'}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-ice-300 to-guardian-300"></div>

            {/* 2018 - Foundation */}
            <div className="relative z-10 flex flex-col md:flex-row items-center mb-16">
              <div className="order-2 md:order-1 md:w-1/2 p-6 md:pr-12 text-right">
                <h3 className="text-xl font-semibold text-ice-700 mb-2 font-playfair">2018</h3>
                <h4 className="text-lg font-medium mb-3">
                  {language === 'en' ? 'Foundation' : 'Fundación'}
                </h4>
                <p className="text-muted-foreground">
                  {language === 'en'
                    ? 'ICE Alarm was founded to address the healthcare monitoring needs of both Spanish locals and the growing expatriate community.'
                    : 'ICE Alarm fue fundada para atender las necesidades de monitoreo de salud tanto de los españoles locales como de la creciente comunidad expatriada.'}
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0">
                <div className="h-12 w-12 rounded-full bg-ice-100 border-4 border-ice-500 flex items-center justify-center shadow-lg">
                  <FileBadge size={20} className="text-ice-600" />
                </div>
              </div>
              <div className="order-3 md:w-1/2"></div>
            </div>

            {/* 2020 - Expansion */}
            <div className="relative z-10 flex flex-col md:flex-row items-center mb-16">
              <div className="order-3 md:w-1/2 p-6 md:pl-12">
                <h3 className="text-xl font-semibold text-guardian-700 mb-2 font-playfair">2020</h3>
                <h4 className="text-lg font-medium mb-3">
                  {language === 'en' ? 'Technology Expansion' : 'Expansión Tecnológica'}
                </h4>
                <p className="text-muted-foreground">
                  {language === 'en'
                    ? 'We introduced our integrated monitoring devices and expanded services to 5 major Spanish cities, serving both local and international residents.'
                    : 'Introdujimos nuestros dispositivos de monitoreo integrados y expandimos los servicios a 5 ciudades importantes de España, atendiendo tanto a residentes locales como internacionales.'}
                </p>
              </div>
              <div className="order-1 mb-4 md:mb-0">
                <div className="h-12 w-12 rounded-full bg-guardian-100 border-4 border-guardian-500 flex items-center justify-center shadow-lg">
                  <Globe size={20} className="text-guardian-600" />
                </div>
              </div>
              <div className="order-2 md:w-1/2"></div>
            </div>

            {/* 2022 - Innovation */}
            <div className="relative z-10 flex flex-col md:flex-row items-center">
              <div className="order-2 md:order-1 md:w-1/2 p-6 md:pr-12 text-right">
                <h3 className="text-xl font-semibold text-ice-700 mb-2 font-playfair">2022</h3>
                <h4 className="text-lg font-medium mb-3">
                  {language === 'en' ? 'AI Integration' : 'Integración de IA'}
                </h4>
                <p className="text-muted-foreground">
                  {language === 'en'
                    ? 'Launched our AI Guardian system, offering multilingual support to all our users and establishing partnerships with local healthcare providers across Spain.'
                    : 'Lanzamos nuestro sistema AI Guardian, ofreciendo soporte multilingüe a todos nuestros usuarios y estableciendo asociaciones con proveedores de atención médica locales en toda España.'}
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0">
                <div className="h-12 w-12 rounded-full bg-ice-100 border-4 border-ice-500 flex items-center justify-center shadow-lg">
                  <Sparkles size={20} className="text-ice-600" />
                </div>
              </div>
              <div className="order-3 md:w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
