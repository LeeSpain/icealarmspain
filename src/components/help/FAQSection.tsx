
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface FAQSectionProps {
  searchQuery: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ searchQuery }) => {
  const { language } = useLanguage();
  
  const faqs = {
    en: [
      {
        category: "Account Management",
        items: [
          {
            question: "How do I reset my password?",
            answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password."
          },
          {
            question: "How do I update my personal information?",
            answer: "You can update your personal information by going to the Profile page from the dashboard. Click on your name in the top-right corner and select 'Profile' from the dropdown menu."
          },
          {
            question: "Can I change my subscription plan?",
            answer: "Yes, you can change your subscription plan at any time. Go to the Settings page and select the 'Subscription' tab to see available options."
          }
        ]
      },
      {
        category: "Devices",
        items: [
          {
            question: "How do I set up my SOS Pendant?",
            answer: "To set up your SOS Pendant, press and hold the main button for 5 seconds until it flashes blue. Then follow the instructions in the device setup page accessible from your dashboard."
          },
          {
            question: "How often should I charge my devices?",
            answer: "We recommend charging your devices when they reach 30% battery to ensure they're always operational. Most devices have a battery life of 3-7 days depending on usage."
          },
          {
            question: "What should I do if my device isn't working?",
            answer: "First, try restarting the device by holding the power button for 10 seconds. If issues persist, check the troubleshooting guide in the Device Management section or contact our support team."
          }
        ]
      },
      {
        category: "Health Monitoring",
        items: [
          {
            question: "How accurate is the glucose monitoring?",
            answer: "Our glucose monitoring is clinically tested to be within 10% accuracy of laboratory tests. It should be calibrated every 14 days for optimal performance."
          },
          {
            question: "Can I share my health data with my doctor?",
            answer: "Yes, you can generate a health report from your dashboard and share it with your healthcare provider via email or print it for your next appointment."
          },
          {
            question: "How is my health data protected?",
            answer: "Your health data is encrypted both in transit and at rest. We comply with HIPAA standards and never share your information with third parties without your explicit consent."
          }
        ]
      },
      {
        category: "Billing and Payments",
        items: [
          {
            question: "How do I update my payment method?",
            answer: "You can update your payment method in the Settings page under the 'Billing' tab. We accept major credit cards and PayPal."
          },
          {
            question: "When am I charged for my subscription?",
            answer: "Subscriptions are billed at the beginning of each billing cycle, which depends on your selected plan (monthly or annual)."
          },
          {
            question: "What is your refund policy?",
            answer: "We offer a 30-day money-back guarantee for new subscribers. After that, refunds are handled on a case-by-case basis. Please contact support for assistance."
          }
        ]
      }
    ],
    es: [
      {
        category: "Gestión de Cuenta",
        items: [
          {
            question: "¿Cómo restablezco mi contraseña?",
            answer: "Puede restablecer su contraseña haciendo clic en el enlace 'Olvidé mi contraseña' en la página de inicio de sesión. Recibirá un correo electrónico con instrucciones para restablecer su contraseña."
          },
          {
            question: "¿Cómo actualizo mi información personal?",
            answer: "Puede actualizar su información personal yendo a la página de Perfil desde el panel. Haga clic en su nombre en la esquina superior derecha y seleccione 'Perfil' en el menú desplegable."
          },
          {
            question: "¿Puedo cambiar mi plan de suscripción?",
            answer: "Sí, puede cambiar su plan de suscripción en cualquier momento. Vaya a la página de Configuración y seleccione la pestaña 'Suscripción' para ver las opciones disponibles."
          }
        ]
      },
      {
        category: "Dispositivos",
        items: [
          {
            question: "¿Cómo configuro mi Colgante SOS?",
            answer: "Para configurar su Colgante SOS, mantenga presionado el botón principal durante 5 segundos hasta que parpadee en azul. Luego siga las instrucciones en la página de configuración del dispositivo accesible desde su panel."
          },
          {
            question: "¿Con qué frecuencia debo cargar mis dispositivos?",
            answer: "Recomendamos cargar sus dispositivos cuando alcancen el 30% de batería para asegurarse de que siempre estén operativos. La mayoría de los dispositivos tienen una duración de batería de 3-7 días según el uso."
          },
          {
            question: "¿Qué debo hacer si mi dispositivo no funciona?",
            answer: "Primero, intente reiniciar el dispositivo manteniendo presionado el botón de encendido durante 10 segundos. Si los problemas persisten, consulte la guía de solución de problemas en la sección de Gestión de Dispositivos o contacte a nuestro equipo de soporte."
          }
        ]
      },
      {
        category: "Monitoreo de Salud",
        items: [
          {
            question: "¿Qué tan preciso es el monitoreo de glucosa?",
            answer: "Nuestro monitoreo de glucosa está clínicamente probado para tener una precisión del 10% respecto a las pruebas de laboratorio. Debe calibrarse cada 14 días para un rendimiento óptimo."
          },
          {
            question: "¿Puedo compartir mis datos de salud con mi médico?",
            answer: "Sí, puede generar un informe de salud desde su panel y compartirlo con su proveedor de atención médica por correo electrónico o imprimirlo para su próxima cita."
          },
          {
            question: "¿Cómo se protegen mis datos de salud?",
            answer: "Sus datos de salud están encriptados tanto en tránsito como en reposo. Cumplimos con los estándares HIPAA y nunca compartimos su información con terceros sin su consentimiento explícito."
          }
        ]
      },
      {
        category: "Facturación y Pagos",
        items: [
          {
            question: "¿Cómo actualizo mi método de pago?",
            answer: "Puede actualizar su método de pago en la página de Configuración bajo la pestaña 'Facturación'. Aceptamos las principales tarjetas de crédito y PayPal."
          },
          {
            question: "¿Cuándo se me cobra por mi suscripción?",
            answer: "Las suscripciones se facturan al comienzo de cada ciclo de facturación, que depende del plan seleccionado (mensual o anual)."
          },
          {
            question: "¿Cuál es su política de reembolso?",
            answer: "Ofrecemos una garantía de devolución de dinero de 30 días para nuevos suscriptores. Después de eso, los reembolsos se manejan caso por caso. Por favor, contacte al soporte para obtener asistencia."
          }
        ]
      }
    ]
  };
  
  const currentFaqs = language === 'en' ? faqs.en : faqs.es;
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? currentFaqs.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : currentFaqs;
  
  return (
    <div className="space-y-6">
      {filteredFaqs.map((category, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
            <Accordion type="single" collapsible className="w-full">
              {category.items.map((item, idx) => (
                <AccordionItem key={idx} value={`${index}-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-2 pb-4 text-muted-foreground">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
      
      {filteredFaqs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'No FAQs match your search criteria. Try a different search term.' 
              : 'Ninguna pregunta frecuente coincide con su criterio de búsqueda. Intente con un término diferente.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQSection;
