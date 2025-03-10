
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Sparkles, Users, Globe, Award, HeartHandshake, Clock, FileBadge } from "lucide-react";
import SectionDivider from "@/components/layout/SectionDivider";
import { ButtonCustom } from "@/components/ui/button-custom";

const AboutUs: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section - Aligned with Home page hero structure */}
        <section 
          id="about-hero" 
          className="relative pt-32 pb-24 overflow-hidden"
        >
          {/* Enhanced Background Elements - matching other hero sections */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
          <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full border border-guardian-200/50 -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
          
          {/* Decorative accent lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/50 to-transparent -z-10"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/30 to-transparent -z-10"></div>
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-6 animate-slide-down">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
                  <Shield size={16} className="mr-2" />
                  <span className="relative">
                    {language === 'en' ? 'Our Story' : 'Nuestra Historia'}
                    <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
                  </span>
                </div>
                
                {/* Enhanced headline with professional styling */}
                <div className="relative mb-12">
                  {/* Decorative elements behind the headline */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-ice-400 to-transparent rounded-full opacity-70"></div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair mx-auto max-w-4xl relative">
                    <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                      {language === 'en' 
                        ? 'About ICE Alarm' 
                        : 'Acerca de ICE Alarm'}
                    </span>
                    
                    {/* Accent decorations */}
                    <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
                  </h1>
                  
                  {/* Decorative elements after the headline */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-guardian-300 to-transparent rounded-full opacity-60"></div>
                </div>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm bg-white/5 py-2 rounded-lg mt-6">
                  {language === 'en' 
                    ? 'Serving all communities across Spain with innovative health monitoring solutions since 2018.' 
                    : 'Sirviendo a todas las comunidades en España con soluciones innovadoras de monitoreo de salud desde 2018.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Bottom Decorative Wave - like other pages */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
              <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="glass-panel p-8 transform transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="mb-4 text-ice-500 flex items-center">
                    <Award size={24} className="mr-2" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-ice-700 font-playfair">
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
                    <h2 className="text-2xl md:text-3xl font-semibold text-guardian-700 font-playfair">
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

        <SectionDivider />

        {/* Our Story & Growth Section */}
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
                {/* Timeline line */}
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

        <SectionDivider />

        {/* Team & Communities Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="glass-panel p-8 mb-16 transform transition-all duration-300 hover:translate-y-[-5px]">
                <div className="mb-4 text-ice-500 flex items-center">
                  <Users size={24} className="mr-2" />
                  <h2 className="text-2xl md:text-3xl font-semibold text-ice-700 font-playfair">
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
                  <h2 className="text-2xl md:text-3xl font-semibold text-guardian-700 font-playfair">
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
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
