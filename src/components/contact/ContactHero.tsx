import React from "react";
import { Shield, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const ContactHero: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section 
      id="contact-hero" 
      className="relative pt-32 pb-24 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
      
      {/* Decorative accent lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ice-200/50 to-transparent -z-10"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-guardian-200/30 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 space-y-6 animate-slide-down">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-50/80 to-ice-100/80 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
                <Shield size={16} className="mr-2" />
                <span className="relative">
                  {language === 'en' ? 'GET IN TOUCH WITH US' : 'CONTÁCTENOS'}
                  <Sparkles size={14} className="absolute -top-1 -right-4 text-ice-500 animate-pulse-gentle" />
                </span>
              </div>
              
              {/* Enhanced headline with professional styling */}
              <div className="relative mb-8">
                {/* Decorative elements behind the headline */}
                <div className="absolute -top-10 left-0 w-32 h-1 bg-gradient-to-r from-ice-400 via-transparent to-transparent rounded-full opacity-70"></div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair relative">
                  <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                    {language === 'en' 
                      ? 'We\'re Here to Help You' 
                      : 'Estamos Aquí Para Ayudarte'}
                  </span>
                  
                  {/* Accent decorations */}
                  <span className="absolute -bottom-3 left-0 w-48 h-1 bg-gradient-to-r from-ice-400 to-guardian-600 rounded-full"></span>
                </h1>
                
                {/* Decorative elements after the headline */}
                <div className="absolute -bottom-8 left-0 w-24 h-0.5 bg-gradient-to-r from-guardian-300 via-transparent to-transparent rounded-full opacity-60"></div>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl backdrop-blur-sm bg-white/5 py-2 rounded-lg">
                {language === 'en' 
                  ? 'Our multilingual team is ready to assist you with any questions about our services, devices, or support needs.' 
                  : 'Nuestro equipo multilingüe está listo para ayudarte con cualquier pregunta sobre nuestros servicios, dispositivos o necesidades de soporte.'}
              </p>
              
              {/* Contact methods section */}
              <div className="grid grid-cols-1 gap-4 mt-8">
                <div className="flex items-center text-muted-foreground hover:text-ice-600 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-ice-50 flex items-center justify-center mr-3">
                    <Phone size={18} className="text-ice-600" />
                  </div>
                  <span>+34 951 123 456</span>
                </div>
                
                <div className="flex items-center text-muted-foreground hover:text-ice-600 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-ice-50 flex items-center justify-center mr-3">
                    <Mail size={18} className="text-ice-600" />
                  </div>
                  <span>info@icealarespana.com</span>
                </div>
                
                <div className="flex items-center text-muted-foreground hover:text-ice-600 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-ice-50 flex items-center justify-center mr-3">
                    <MapPin size={18} className="text-ice-600" />
                  </div>
                  <span>{language === 'en' ? 'Marbella, Málaga, Spain' : 'Marbella, Málaga, España'}</span>
                </div>
              </div>
              
              <Button className="mt-4 bg-gradient-to-r from-ice-500 to-guardian-600 hover:from-ice-600 hover:to-guardian-700 text-white border-none shadow-md hover:shadow-lg transition-all">
                {language === 'en' ? 'Schedule a Consultation' : 'Programar una Consulta'}
              </Button>
            </div>
            
            {/* Visual element - contact illustration */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-ice-100/50 to-guardian-100/50 rounded-lg -rotate-3 scale-[1.03] z-0"></div>
                <div className="glass-panel p-1 rounded-lg shadow-xl relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                    alt={language === 'en' ? "Customer support" : "Servicio al cliente"}
                    className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-ice-100 rounded-full z-0 opacity-80"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-guardian-100 rounded-full z-0 opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default ContactHero;
