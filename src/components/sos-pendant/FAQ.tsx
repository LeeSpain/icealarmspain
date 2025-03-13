
import React from "react";
import { Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  
  const faqItems = [
    {
      question: language === 'en' ? "How does the fall detection work?" : "¿Cómo funciona la detección de caídas?",
      answer: language === 'en' 
        ? "The SOS Pendant uses advanced accelerometer technology to detect sudden movements consistent with falls. When a fall is detected, it initiates a 30-second countdown with an audible alert. If you're okay, you can cancel the alert. If not, it automatically contacts our monitoring center." 
        : "El Colgante SOS utiliza tecnología avanzada de acelerómetro para detectar movimientos repentinos consistentes con caídas. Cuando se detecta una caída, inicia una cuenta regresiva de 30 segundos con una alerta audible. Si estás bien, puedes cancelar la alerta. Si no, automáticamente contacta a nuestro centro de monitoreo."
    },
    {
      question: language === 'en' ? "Is the SOS Pendant waterproof?" : "¿El Colgante SOS es resistente al agua?",
      answer: language === 'en'
        ? "Yes, the SOS Pendant is rated IP67 water-resistant, which means it can be submerged in up to 1 meter of fresh water for up to 30 minutes. This makes it safe to wear while showering." 
        : "Sí, el Colgante SOS tiene clasificación IP67 resistente al agua, lo que significa que puede sumergirse en hasta 1 metro de agua dulce por hasta 30 minutos. Esto lo hace seguro para usar mientras te duchas."
    },
    {
      question: language === 'en' ? "How long does the battery last?" : "¿Cuánto dura la batería?",
      answer: language === 'en'
        ? "The SOS Pendant's battery lasts up to 7 days on a single charge with normal use. The device will alert you when the battery is running low, and recharging takes approximately 2 hours." 
        : "La batería del Colgante SOS dura hasta 7 días con una sola carga con uso normal. El dispositivo te alertará cuando la batería esté baja, y la recarga toma aproximadamente 2 horas."
    },
    {
      question: language === 'en' ? "How far can I go from my home with the SOS Pendant?" : "¿Qué tan lejos puedo ir de mi casa con el Colgante SOS?",
      answer: language === 'en'
        ? "The SOS Pendant works anywhere with cellular coverage. It uses 4G LTE networks to communicate with our monitoring center, so you can use it at home, in your garden, while shopping, or traveling." 
        : "El Colgante SOS funciona en cualquier lugar con cobertura celular. Utiliza redes 4G LTE para comunicarse con nuestro centro de monitoreo, por lo que puedes usarlo en casa, en tu jardín, mientras compras o viajas."
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-6">
        {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
      </h3>
      
      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
            <h4 className="font-medium mb-2 flex items-center">
              <span className="bg-orange-100 p-1 rounded-full mr-2">
                <Clock className="h-4 w-4 text-orange-500" />
              </span>
              {item.question}
            </h4>
            <p className="text-muted-foreground pl-8">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
