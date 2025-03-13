
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Clock } from "lucide-react";

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  
  const faqItems = [
    {
      question: language === 'en' ? "Is the sensor painful to apply?" : "¿Es doloroso aplicar el sensor?",
      answer: language === 'en' 
        ? "No, most users report minimal discomfort during application. The sensor is applied using a simple applicator that quickly and easily places the small, flexible sensor just under the skin. Most users forget they're wearing it after a short time." 
        : "No, la mayoría de los usuarios reportan molestias mínimas durante la aplicación. El sensor se aplica usando un aplicador simple que coloca rápida y fácilmente el sensor pequeño y flexible justo debajo de la piel. La mayoría de los usuarios olvidan que lo llevan puesto después de un corto tiempo."
    },
    {
      question: language === 'en' ? "How accurate is the Glucose Monitor compared to fingerstick tests?" : "¿Qué tan preciso es el Monitor de Glucosa en comparación con las pruebas de pinchazo en el dedo?",
      answer: language === 'en'
        ? "Our Glucose Monitor is highly accurate, with readings typically within 10% of laboratory reference values. While it doesn't completely replace all fingerstick tests (especially in certain situations like rapid glucose changes), it significantly reduces the need for them." 
        : "Nuestro Monitor de Glucosa es altamente preciso, con lecturas típicamente dentro del 10% de los valores de referencia de laboratorio. Si bien no reemplaza completamente todas las pruebas de pinchazo en el dedo (especialmente en ciertas situaciones como cambios rápidos de glucosa), reduce significativamente la necesidad de ellas."
    },
    {
      question: language === 'en' ? "Can I shower or swim with the sensor?" : "¿Puedo ducharme o nadar con el sensor?",
      answer: language === 'en'
        ? "Yes, the sensor is water-resistant with an IP27 rating, meaning it can be submerged in up to 1 meter of water for up to 30 minutes. You can shower, bathe, or swim without removing the sensor." 
        : "Sí, el sensor es resistente al agua con una clasificación IP27, lo que significa que puede sumergirse en hasta 1 metro de agua por hasta 30 minutos. Puede ducharse, bañarse o nadar sin quitar el sensor."
    },
    {
      question: language === 'en' ? "Will I receive alerts if my glucose levels become dangerous?" : "¿Recibiré alertas si mis niveles de glucosa se vuelven peligrosos?",
      answer: language === 'en'
        ? "Yes, our system provides real-time alerts for both high and low glucose levels. You can customize the threshold levels for these alerts based on your doctor's recommendations. The alerts can be sent to your smartphone and optionally to designated family members or caregivers." 
        : "Sí, nuestro sistema proporciona alertas en tiempo real para niveles de glucosa altos y bajos. Puede personalizar los niveles de umbral para estas alertas según las recomendaciones de su médico. Las alertas pueden enviarse a su smartphone y opcionalmente a familiares o cuidadores designados."
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
              <span className="bg-blue-100 p-1 rounded-full mr-2">
                <Clock className="h-4 w-4 text-blue-500" />
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
