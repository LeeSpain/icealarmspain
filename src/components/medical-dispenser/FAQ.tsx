
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Clock } from "lucide-react";

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  
  const faqItems = [
    {
      question: language === 'en' ? "How many medications can the dispenser hold?" : "¿Cuántos medicamentos puede contener el dispensador?",
      answer: language === 'en' 
        ? "Our Medical Dispenser features 28 compartments that can be configured for different medications. Depending on your medication schedule, it can manage multiple medications for up to 4 weeks." 
        : "Nuestro Dispensador Médico cuenta con 28 compartimentos que se pueden configurar para diferentes medicamentos. Dependiendo de su horario de medicación, puede gestionar múltiples medicamentos por hasta 4 semanas."
    },
    {
      question: language === 'en' ? "What happens if the power goes out?" : "¿Qué sucede si se corta la energía?",
      answer: language === 'en'
        ? "The Medical Dispenser comes with a built-in battery backup that can operate for up to 48 hours during a power outage, ensuring you never miss a dose even during unexpected interruptions." 
        : "El Dispensador Médico viene con una batería de respaldo incorporada que puede funcionar hasta 48 horas durante un corte de energía, asegurando que nunca se pierda una dosis incluso durante interrupciones inesperadas."
    },
    {
      question: language === 'en' ? "Can family members get notifications if I miss a dose?" : "¿Pueden los miembros de la familia recibir notificaciones si me pierdo una dosis?",
      answer: language === 'en'
        ? "Yes, you can set up to 5 emergency contacts who will receive notifications if you miss a medication dose. These alerts can be sent via text message, email, or through our mobile app." 
        : "Sí, puede configurar hasta 5 contactos de emergencia que recibirán notificaciones si se pierde una dosis de medicación. Estas alertas se pueden enviar por mensaje de texto, correo electrónico o a través de nuestra aplicación móvil."
    },
    {
      question: language === 'en' ? "How do I set up the medication schedule?" : "¿Cómo configuro el horario de medicación?",
      answer: language === 'en'
        ? "You can easily program the medication schedule through our mobile app or web interface. The system allows for complex schedules including multiple medications at different times and frequencies." 
        : "Puede programar fácilmente el horario de medicación a través de nuestra aplicación móvil o interfaz web. El sistema permite horarios complejos que incluyen múltiples medicamentos en diferentes momentos y frecuencias."
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
              <span className="bg-green-100 p-1 rounded-full mr-2">
                <Clock className="h-4 w-4 text-green-500" />
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
