
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      name: language === 'en' ? "Maria Garcia" : "María García",
      age: "78",
      quote: language === 'en' 
        ? "The SOS pendant has given me back my independence. My children were worried about me living alone, but now they know I can get help if I need it." 
        : "El colgante SOS me ha devuelto mi independencia. Mis hijos estaban preocupados por mí viviendo sola, pero ahora saben que puedo obtener ayuda si la necesito.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: language === 'en' ? "John Roberts" : "Juan Roberto",
      age: "82",
      quote: language === 'en'
        ? "After my fall last year, my daughter insisted I get the SOS pendant. It detected my fall when I slipped in the bathroom and called for help immediately."
        : "Después de mi caída el año pasado, mi hija insistió en que obtuviera el colgante SOS. Detectó mi caída cuando resbalé en el baño y llamó para pedir ayuda de inmediato.",
      image: "https://randomuser.me/api/portraits/men/72.jpg"
    }
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-8">
        {language === 'en' ? 'What Our Customers Say' : 'Lo Que Dicen Nuestros Clientes'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start mb-4">
                <div className="relative mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? `Age: ${testimonial.age}` : `Edad: ${testimonial.age}`}
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
