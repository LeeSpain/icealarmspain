
export interface KnowledgeEntry {
  id: string;
  topic: string;
  keywords: string[];
  responses: {
    en: string[];
    es: string[];
  };
}

// Company knowledge base with structured information for AI responses
export const COMPANY_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "services",
    topic: "ICE Alár Services",
    keywords: ["service", "services", "offering", "provide", "help", "health", "monitoring", "servicio", "servicios", "salud", "monitoreo"],
    responses: {
      en: [
        "ICE Alár offers comprehensive health monitoring services for elderly and vulnerable individuals, including 24/7 emergency response, medication management, and health metrics tracking.",
        "Our services include SOS Pendant for emergency alerts, Medical Dispenser for medication management, and Glucose Monitor for health tracking - all integrated into one comprehensive system.",
        "ICE Alár provides both hardware devices and monitoring services with multilingual support specifically designed for expatriates and locals in Spain."
      ],
      es: [
        "ICE Alár ofrece servicios completos de monitoreo de salud para personas mayores y vulnerables, incluida respuesta de emergencia 24/7, gestión de medicamentos y seguimiento de métricas de salud.",
        "Nuestros servicios incluyen Colgante SOS para alertas de emergencia, Dispensador Médico para gestión de medicamentos y Monitor de Glucosa para seguimiento de salud - todo integrado en un sistema integral.",
        "ICE Alár proporciona tanto dispositivos de hardware como servicios de monitoreo con soporte multilingüe específicamente diseñados para expatriados y locales en España."
      ]
    }
  },
  {
    id: "devices",
    topic: "ICE Alár Devices",
    keywords: ["device", "devices", "pendant", "dispenser", "monitor", "hardware", "setup", "dispositivo", "dispositivos", "colgante", "dispensador", "monitor", "configuración"],
    responses: {
      en: [
        "ICE Alár offers three main devices: the SOS Pendant for emergency alerts, the Medical Dispenser for automated medication management, and the Glucose Monitor for health tracking.",
        "All our devices connect to our central monitoring system through secure wireless technology, ensuring 24/7 protection for our members.",
        "Our devices are designed for ease of use with large buttons, clear displays, and simple setup processes - perfect for elderly users."
      ],
      es: [
        "ICE Alár ofrece tres dispositivos principales: el Colgante SOS para alertas de emergencia, el Dispensador Médico para gestión automatizada de medicamentos y el Monitor de Glucosa para seguimiento de salud.",
        "Todos nuestros dispositivos se conectan a nuestro sistema central de monitoreo a través de tecnología inalámbrica segura, garantizando protección 24/7 para nuestros miembros.",
        "Nuestros dispositivos están diseñados para facilidad de uso con botones grandes, pantallas claras y procesos de configuración simples - perfectos para usuarios mayores."
      ]
    }
  },
  {
    id: "pricing",
    topic: "ICE Alár Pricing",
    keywords: ["price", "pricing", "cost", "subscription", "plan", "precio", "costo", "suscripción", "plan"],
    responses: {
      en: [
        "ICE Alár offers flexible pricing plans starting from €29.99 monthly for our basic monitoring service, with premium plans that include device rental and additional services.",
        "Our pricing is transparent with no hidden fees. The basic plan includes 24/7 monitoring, while premium plans add device rental and additional services like medication reminders.",
        "We offer special discounts for annual subscriptions, and all our plans include our 24/7 multilingual support service."
      ],
      es: [
        "ICE Alár ofrece planes de precios flexibles desde €29.99 mensuales para nuestro servicio básico de monitoreo, con planes premium que incluyen alquiler de dispositivos y servicios adicionales.",
        "Nuestros precios son transparentes sin cargos ocultos. El plan básico incluye monitoreo 24/7, mientras que los planes premium añaden alquiler de dispositivos y servicios adicionales como recordatorios de medicación.",
        "Ofrecemos descuentos especiales para suscripciones anuales, y todos nuestros planes incluyen nuestro servicio de soporte multilingüe 24/7."
      ]
    }
  },
  {
    id: "support",
    topic: "ICE Alár Support",
    keywords: ["help", "support", "contact", "assistance", "issue", "problem", "ayuda", "soporte", "contacto", "asistencia", "problema"],
    responses: {
      en: [
        "Our support team is available 24/7 through this AI assistant. For urgent matters, you can create a support ticket and one of our human representatives will contact you within 24 hours.",
        "ICE Alár provides multilingual support in English, Spanish, German, French, and Dutch to serve our diverse expatriate community in Spain.",
        "For technical issues with your devices, our AI can guide you through basic troubleshooting steps, or connect you with our technical support team for more complex problems."
      ],
      es: [
        "Nuestro equipo de soporte está disponible 24/7 a través de este asistente de IA. Para asuntos urgentes, puede crear un ticket de soporte y uno de nuestros representantes humanos se pondrá en contacto con usted dentro de las 24 horas.",
        "ICE Alár proporciona soporte multilingüe en inglés, español, alemán, francés y holandés para servir a nuestra diversa comunidad de expatriados en España.",
        "Para problemas técnicos con sus dispositivos, nuestra IA puede guiarle a través de pasos básicos de solución de problemas, o conectarle con nuestro equipo de soporte técnico para problemas más complejos."
      ]
    }
  },
  {
    id: "subscription",
    topic: "ICE Alár Subscription",
    keywords: ["subscribe", "subscription", "join", "member", "membership", "suscribir", "suscripción", "unirse", "miembro", "membresía"],
    responses: {
      en: [
        "Joining ICE Alár is simple - you can sign up online through our website or have one of our representatives guide you through the process over the phone.",
        "Our subscription process includes a brief health questionnaire to help us understand your needs better and customize our services accordingly.",
        "New members receive a welcome kit with detailed guides on how to use our services and devices, and our support team will schedule a personalized onboarding session."
      ],
      es: [
        "Unirse a ICE Alár es simple - puede registrarse en línea a través de nuestro sitio web o hacer que uno de nuestros representantes le guíe a través del proceso por teléfono.",
        "Nuestro proceso de suscripción incluye un breve cuestionario de salud para ayudarnos a comprender mejor sus necesidades y personalizar nuestros servicios en consecuencia.",
        "Los nuevos miembros reciben un kit de bienvenida con guías detalladas sobre cómo usar nuestros servicios y dispositivos, y nuestro equipo de soporte programará una sesión de incorporación personalizada."
      ]
    }
  }
];

// Function to find the most relevant knowledge entry based on user query
export const findRelevantKnowledge = (query: string, language: 'en' | 'es'): string => {
  const lowercaseQuery = query.toLowerCase();
  
  // Find relevant entries by checking for keyword matches
  const relevantEntries = COMPANY_KNOWLEDGE_BASE.filter(entry => 
    entry.keywords.some(keyword => lowercaseQuery.includes(keyword))
  );
  
  if (relevantEntries.length === 0) {
    // Return default response if no matches
    return language === 'en' 
      ? "I'm ICE AI Guardian, your dedicated assistant. I can help with information about our services, devices, pricing, or support. How can I assist you today?"
      : "Soy ICE AI Guardian, su asistente dedicado. Puedo ayudar con información sobre nuestros servicios, dispositivos, precios o soporte. ¿Cómo puedo ayudarle hoy?";
  }
  
  // Get a random response from the most relevant entry
  const mostRelevant = relevantEntries[0];
  const responses = mostRelevant.responses[language];
  return responses[Math.floor(Math.random() * responses.length)];
};
