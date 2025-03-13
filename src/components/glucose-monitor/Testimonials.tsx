
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      name: language === 'en' ? "Robert Johnson" : "Roberto Johnson",
      age: "65",
      quote: language === 'en' 
        ? "The glucose monitor has transformed how I manage my diabetes. I can see in real-time how my food choices affect my glucose levels, and the predictive alerts have prevented several episodes of hypoglycemia." 
        : "El monitor de glucosa ha transformado la forma en que manejo mi diabetes. Puedo ver en tiempo real cómo mis elecciones de alimentos afectan mis niveles de glucosa, y las alertas predictivas han evitado varios episodios de hipoglucemia.",
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      name: language === 'en' ? "Patricia Martinez" : "Patricia Martínez",
      age: "58",
      quote: language === 'en'
        ? "As someone recently diagnosed with Type 2 diabetes, this monitor has been instrumental in helping me understand my condition. The app makes it easy to see patterns and share reports with my doctor."
        : "Como alguien recientemente diagnosticado con diabetes Tipo 2, este monitor ha sido fundamental para ayudarme a entender mi condición. La aplicación facilita ver patrones y compartir informes con mi médico.",
      image: "https://randomuser.me/api/portraits/women/48.jpg"
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
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1 rounded-full">
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
