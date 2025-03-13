
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      name: language === 'en' ? "David Miller" : "David Miller",
      age: "72",
      quote: language === 'en' 
        ? "The medical dispenser has been a game-changer for me. I take 5 different medications daily, and before getting this device, I would sometimes forget or mix up my doses. Now I never miss a dose." 
        : "El dispensador médico ha sido revolucionario para mí. Tomo 5 medicamentos diferentes diariamente, y antes de obtener este dispositivo, a veces olvidaba o confundía mis dosis. Ahora nunca me pierdo una dosis.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: language === 'en' ? "Susan Thompson" : "Susan Thompson",
      age: "68",
      quote: language === 'en'
        ? "My daughter was constantly worried about my medication adherence. This dispenser gives her peace of mind because she gets notified if I miss a dose, and she can check my adherence through the app."
        : "Mi hija estaba constantemente preocupada por mi adherencia a la medicación. Este dispensador le da tranquilidad porque recibe notificaciones si me pierdo una dosis, y puede verificar mi adherencia a través de la aplicación.",
      image: "https://randomuser.me/api/portraits/women/42.jpg"
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
