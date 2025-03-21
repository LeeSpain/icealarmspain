
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Quote } from "lucide-react";

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      id: 1,
      name: language === 'en' ? "Maria Thompson" : "Maria Thompson",
      location: language === 'en' ? "Valencia, Spain" : "Valencia, España",
      text: language === 'en' 
        ? "The ICE Alarm system has been a lifesaver for me living alone in Spain. The translation service helped me communicate with local emergency services when I needed help."
        : "El sistema ICE Alarm ha sido un salvavidas para mí viviendo sola en España. El servicio de traducción me ayudó a comunicarme con los servicios de emergencia locales cuando necesité ayuda.",
      rating: 5,
      role: language === 'en' ? "Retired Expat" : "Expatriada Jubilada"
    },
    {
      id: 2,
      name: language === 'en' ? "John Davies" : "John Davies",
      location: language === 'en' ? "Costa del Sol, Spain" : "Costa del Sol, España",
      text: language === 'en'
        ? "The SOS pendant's location tracking feature gave my family peace of mind. When I had a fall hiking, emergency services found me quickly thanks to the ICE Alarm system."
        : "La función de seguimiento de ubicación del colgante SOS le dio tranquilidad a mi familia. Cuando sufrí una caída haciendo senderismo, los servicios de emergencia me encontraron rápidamente gracias al sistema ICE Alarm.",
      rating: 5,
      role: language === 'en' ? "Active Senior" : "Senior Activo"
    },
    {
      id: 3,
      name: language === 'en' ? "Susan Miller" : "Susan Miller",
      location: language === 'en' ? "Barcelona, Spain" : "Barcelona, España",
      text: language === 'en'
        ? "As a caregiver for my husband, the medication dispenser has been invaluable. The bilingual support team is always responsive and helpful whenever we have questions."
        : "Como cuidadora de mi esposo, el dispensador de medicamentos ha sido invaluable. El equipo de soporte bilingüe siempre responde y ayuda cuando tenemos preguntas.",
      rating: 5,
      role: language === 'en' ? "Caregiver" : "Cuidadora"
    }
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-ice-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-guardian-400/20 to-guardian-600/20 border border-guardian-400/30 text-guardian-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              <Quote size={16} className="mr-2" />
              <span className="font-playfair">{language === 'en' ? "Customer Stories" : "Historias de Clientes"}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent font-playfair">
              {language === 'en' ? "What Our Members Say" : "Lo Que Dicen Nuestros Miembros"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-playfair">
              {language === 'en'
                ? "Hear from our community of expats and seniors about how ICE Alarm has enhanced their independence and safety."
                : "Escuche de nuestra comunidad de expatriados y personas mayores sobre cómo ICE Alarm ha mejorado su independencia y seguridad."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg border border-ice-100 flex flex-col"
              >
                <div className="flex-grow">
                  <div className="flex space-x-1 mb-3 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic font-playfair">"{testimonial.text}"</p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="font-semibold font-playfair">{testimonial.name}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground font-playfair">{testimonial.location}</p>
                    <span className="inline-block px-2.5 py-0.5 bg-ice-100 text-ice-800 rounded-full text-xs font-medium font-playfair">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
