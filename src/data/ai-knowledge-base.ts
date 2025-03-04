
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
  },
  {
    id: "about",
    topic: "About ICE Alár",
    keywords: ["about", "company", "history", "mission", "vision", "values", "sobre", "compañía", "historia", "misión", "visión", "valores"],
    responses: {
      en: [
        "ICE Alár was founded in 2018 with a mission to provide comprehensive health monitoring services for expatriates and locals in Spain, focusing on elderly care and peace of mind for family members.",
        "Our company was created by a team of healthcare professionals and technology experts who saw the need for better remote health monitoring solutions, especially for the international community in Spain.",
        "At ICE Alár, our core values include compassion, reliability, innovation, and cultural sensitivity. We believe everyone deserves access to quality healthcare monitoring regardless of language or cultural background."
      ],
      es: [
        "ICE Alár fue fundada en 2018 con la misión de proporcionar servicios integrales de monitoreo de salud para expatriados y locales en España, centrándose en el cuidado de personas mayores y la tranquilidad para los miembros de la familia.",
        "Nuestra empresa fue creada por un equipo de profesionales de la salud y expertos en tecnología que vieron la necesidad de mejores soluciones de monitoreo de salud remoto, especialmente para la comunidad internacional en España.",
        "En ICE Alár, nuestros valores fundamentales incluyen compasión, confiabilidad, innovación y sensibilidad cultural. Creemos que todos merecen acceso a un monitoreo de salud de calidad independientemente del idioma o antecedentes culturales."
      ]
    }
  },
  {
    id: "locations",
    topic: "ICE Alár Locations",
    keywords: ["location", "office", "address", "branch", "center", "ubicación", "oficina", "dirección", "sucursal", "centro"],
    responses: {
      en: [
        "ICE Alár's headquarters is located in Alicante, Spain, with regional offices in Madrid, Barcelona, Valencia, and Málaga to serve clients across the country.",
        "Our monitoring center operates 24/7 from our Alicante headquarters, where our multilingual support team responds to alerts and client inquiries.",
        "All our locations are staffed with multilingual teams to provide service in English, Spanish, German, French, and Dutch, making our services accessible to the diverse expatriate community."
      ],
      es: [
        "La sede central de ICE Alár está ubicada en Alicante, España, con oficinas regionales en Madrid, Barcelona, Valencia y Málaga para atender a clientes en todo el país.",
        "Nuestro centro de monitoreo opera 24/7 desde nuestra sede en Alicante, donde nuestro equipo de soporte multilingüe responde a alertas y consultas de clientes.",
        "Todas nuestras ubicaciones cuentan con equipos multilingües para proporcionar servicio en inglés, español, alemán, francés y holandés, haciendo que nuestros servicios sean accesibles para la diversa comunidad expatriada."
      ]
    }
  },
  {
    id: "sos-pendant",
    topic: "SOS Pendant Details",
    keywords: ["sos", "pendant", "emergency", "button", "fall", "detection", "emergencia", "botón", "caída", "detección"],
    responses: {
      en: [
        "The ICE Alár SOS Pendant features one-touch emergency calling, automatic fall detection, GPS location tracking, and water resistance - making it perfect for everyday wear and peace of mind.",
        "Our SOS Pendant has a battery life of up to 5 days on a single charge and connects directly to our monitoring center through built-in cellular technology - no smartphone required.",
        "When the SOS button is pressed, our monitoring center receives an immediate alert with your location and medical profile, allowing our team to dispatch appropriate help and notify your emergency contacts."
      ],
      es: [
        "El Colgante SOS de ICE Alár cuenta con llamada de emergencia con un solo toque, detección automática de caídas, seguimiento de ubicación GPS y resistencia al agua, haciéndolo perfecto para uso diario y tranquilidad.",
        "Nuestro Colgante SOS tiene una duración de batería de hasta 5 días con una sola carga y se conecta directamente a nuestro centro de monitoreo a través de tecnología celular incorporada - no se requiere smartphone.",
        "Cuando se presiona el botón SOS, nuestro centro de monitoreo recibe una alerta inmediata con su ubicación y perfil médico, permitiendo a nuestro equipo enviar ayuda apropiada y notificar a sus contactos de emergencia."
      ]
    }
  },
  {
    id: "medical-dispenser",
    topic: "Medical Dispenser Details",
    keywords: ["dispenser", "medication", "medicine", "pills", "reminder", "medicamento", "medicina", "pastillas", "recordatorio"],
    responses: {
      en: [
        "The ICE Alár Medical Dispenser can manage up to 28 days of medications with multiple daily doses, automatically dispensing the right pills at the right time and sending alerts if doses are missed.",
        "Our smart dispenser features tamper protection, automated refill reminders, and detailed medication logs that can be shared with healthcare providers through our secure portal.",
        "Family members and caregivers can receive notifications about medication adherence through our mobile app, providing peace of mind and enabling remote support for medication management."
      ],
      es: [
        "El Dispensador Médico de ICE Alár puede gestionar hasta 28 días de medicamentos con múltiples dosis diarias, dispensando automáticamente las pastillas correctas en el momento adecuado y enviando alertas si se omiten dosis.",
        "Nuestro dispensador inteligente cuenta con protección contra manipulaciones, recordatorios automáticos de recarga y registros detallados de medicación que pueden compartirse con proveedores de atención médica a través de nuestro portal seguro.",
        "Los miembros de la familia y cuidadores pueden recibir notificaciones sobre la adherencia a la medicación a través de nuestra aplicación móvil, proporcionando tranquilidad y permitiendo apoyo remoto para la gestión de medicamentos."
      ]
    }
  },
  {
    id: "glucose-monitor",
    topic: "Glucose Monitor Details",
    keywords: ["glucose", "monitor", "diabetes", "sugar", "blood", "glucosa", "monitor", "diabetes", "azúcar", "sangre"],
    responses: {
      en: [
        "The ICE Alár Glucose Monitor provides continuous glucose monitoring through a small, comfortable sensor worn on the body, with readings automatically transmitted to our monitoring system every 5 minutes.",
        "Our smart monitoring system identifies concerning trends and can alert both the user and our monitoring center when glucose levels are outside the target range, allowing for timely intervention.",
        "The companion app displays real-time glucose levels, trends, and historical data that can be easily shared with healthcare providers, family members, or caregivers for collaborative health management."
      ],
      es: [
        "El Monitor de Glucosa de ICE Alár proporciona monitoreo continuo de glucosa a través de un sensor pequeño y cómodo que se usa en el cuerpo, con lecturas transmitidas automáticamente a nuestro sistema de monitoreo cada 5 minutos.",
        "Nuestro sistema de monitoreo inteligente identifica tendencias preocupantes y puede alertar tanto al usuario como a nuestro centro de monitoreo cuando los niveles de glucosa están fuera del rango objetivo, permitiendo una intervención oportuna.",
        "La aplicación complementaria muestra niveles de glucosa en tiempo real, tendencias y datos históricos que pueden compartirse fácilmente con proveedores de atención médica, miembros de la familia o cuidadores para una gestión colaborativa de la salud."
      ]
    }
  },
  {
    id: "expat-services",
    topic: "Expatriate Services",
    keywords: ["expat", "expatriate", "international", "foreign", "language", "expatriado", "internacional", "extranjero", "idioma"],
    responses: {
      en: [
        "ICE Alár specializes in serving the expatriate community in Spain with multilingual support in English, Spanish, German, French, and Dutch to overcome language barriers in healthcare.",
        "Our expatriate services include translation of medical documents, culturally sensitive care coordination, and assistance navigating the Spanish healthcare system for both public and private options.",
        "We understand the unique challenges faced by international residents and offer specialized support for seasonal residents, helping to maintain continuity of care even when you're traveling between countries."
      ],
      es: [
        "ICE Alár se especializa en atender a la comunidad expatriada en España con soporte multilingüe en inglés, español, alemán, francés y holandés para superar las barreras del idioma en la atención médica.",
        "Nuestros servicios para expatriados incluyen traducción de documentos médicos, coordinación de atención culturalmente sensible y asistencia para navegar por el sistema de salud español tanto para opciones públicas como privadas.",
        "Entendemos los desafíos únicos que enfrentan los residentes internacionales y ofrecemos apoyo especializado para residentes estacionales, ayudando a mantener la continuidad de la atención incluso cuando viaja entre países."
      ]
    }
  },
  {
    id: "family-access",
    topic: "Family Portal Access",
    keywords: ["family", "portal", "access", "app", "monitor", "familia", "portal", "acceso", "aplicación", "monitorear"],
    responses: {
      en: [
        "ICE Alár's Family Portal allows authorized family members and caregivers to remotely monitor the health and safety status of their loved ones through our secure web portal or mobile app.",
        "Family members can view device statuses, medication adherence, health metrics, alert history, and location information (when permitted), providing peace of mind even when living far away.",
        "Our multi-user access system lets you control exactly what information is shared with different family members or caregivers, respecting privacy while enabling necessary support."
      ],
      es: [
        "El Portal Familiar de ICE Alár permite a familiares autorizados y cuidadores monitorear remotamente el estado de salud y seguridad de sus seres queridos a través de nuestro portal web seguro o aplicación móvil.",
        "Los miembros de la familia pueden ver estados de dispositivos, adherencia a medicamentos, métricas de salud, historial de alertas e información de ubicación (cuando está permitido), proporcionando tranquilidad incluso cuando viven lejos.",
        "Nuestro sistema de acceso multi-usuario le permite controlar exactamente qué información se comparte con diferentes miembros de la familia o cuidadores, respetando la privacidad mientras se permite el apoyo necesario."
      ]
    }
  },
  {
    id: "installation",
    topic: "Device Installation",
    keywords: ["install", "setup", "configure", "technician", "visit", "instalar", "configurar", "técnico", "visita"],
    responses: {
      en: [
        "ICE Alár offers professional installation services for all our devices. A multilingual technician will visit your home to set up the equipment, test connections, and provide personalized training.",
        "Most of our devices feature simple plug-and-play setup designed for ease of use. The SOS Pendant arrives pre-charged and ready to use, while the Medical Dispenser and Glucose Monitor require minimal configuration.",
        "If you prefer to set up devices yourself, our support team provides step-by-step guidance via phone or video call, and our online help center offers detailed setup guides in multiple languages."
      ],
      es: [
        "ICE Alár ofrece servicios de instalación profesional para todos nuestros dispositivos. Un técnico multilingüe visitará su hogar para configurar el equipo, probar conexiones y proporcionar capacitación personalizada.",
        "La mayoría de nuestros dispositivos cuentan con una configuración simple plug-and-play diseñada para facilidad de uso. El Colgante SOS llega precargado y listo para usar, mientras que el Dispensador Médico y el Monitor de Glucosa requieren una configuración mínima.",
        "Si prefiere configurar los dispositivos usted mismo, nuestro equipo de soporte proporciona orientación paso a paso por teléfono o videollamada, y nuestro centro de ayuda en línea ofrece guías detalladas de configuración en múltiples idiomas."
      ]
    }
  },
  {
    id: "membership-types",
    topic: "Membership Types",
    keywords: ["membership", "individual", "couple", "family", "caregiver", "membresía", "individual", "pareja", "familia", "cuidador"],
    responses: {
      en: [
        "ICE Alár offers four membership types: Individual for single users, Couple for partners living together, Family for multiple related members, and Caregiver for professional care providers.",
        "Our Couple and Family plans offer discounted rates compared to individual memberships, making it more affordable to cover multiple people in the same household.",
        "The Caregiver membership provides special features for professional caregivers, including multi-client management, professional reporting tools, and priority support access."
      ],
      es: [
        "ICE Alár ofrece cuatro tipos de membresía: Individual para usuarios únicos, Pareja para parejas que viven juntas, Familia para múltiples miembros relacionados y Cuidador para proveedores de cuidado profesional.",
        "Nuestros planes de Pareja y Familia ofrecen tarifas con descuento en comparación con las membresías individuales, haciendo más asequible cubrir a múltiples personas en el mismo hogar.",
        "La membresía de Cuidador proporciona características especiales para cuidadores profesionales, incluyendo gestión de múltiples clientes, herramientas de informes profesionales y acceso prioritario al soporte."
      ]
    }
  },
  {
    id: "data-privacy",
    topic: "Data Privacy and Security",
    keywords: ["privacy", "security", "data", "protection", "GDPR", "privacidad", "seguridad", "datos", "protección"],
    responses: {
      en: [
        "ICE Alár takes data privacy extremely seriously. We are fully GDPR compliant and implement end-to-end encryption for all personal and health data transmitted through our systems.",
        "Our data security measures include multi-factor authentication, regular security audits by independent experts, and strict access controls to ensure your information is protected.",
        "You always maintain control of your data - our clear privacy settings allow you to decide exactly what information is collected and who can access it, with complete transparency about how data is used."
      ],
      es: [
        "ICE Alár toma la privacidad de datos extremadamente en serio. Cumplimos completamente con el GDPR e implementamos cifrado de extremo a extremo para todos los datos personales y de salud transmitidos a través de nuestros sistemas.",
        "Nuestras medidas de seguridad de datos incluyen autenticación multifactor, auditorías de seguridad regulares por expertos independientes y controles de acceso estrictos para garantizar que su información esté protegida.",
        "Usted siempre mantiene el control de sus datos - nuestras configuraciones claras de privacidad le permiten decidir exactamente qué información se recopila y quién puede acceder a ella, con total transparencia sobre cómo se utilizan los datos."
      ]
    }
  },
  {
    id: "technical-support",
    topic: "Technical Support",
    keywords: ["technical", "support", "troubleshoot", "repair", "replace", "técnico", "soporte", "solucionar", "reparar", "reemplazar"],
    responses: {
      en: [
        "ICE Alár provides 24/7 technical support for all devices and services. Our multilingual support team can diagnose most issues remotely and guide you through simple troubleshooting steps.",
        "For hardware issues that cannot be resolved remotely, we offer expedited device replacement with next-day delivery in most areas of Spain to minimize disruption to your service.",
        "All devices come with a comprehensive warranty that covers manufacturing defects and normal wear and tear. Our technicians can also perform in-home maintenance visits for complex issues."
      ],
      es: [
        "ICE Alár proporciona soporte técnico 24/7 para todos los dispositivos y servicios. Nuestro equipo de soporte multilingüe puede diagnosticar la mayoría de los problemas de forma remota y guiarle a través de simples pasos de solución de problemas.",
        "Para problemas de hardware que no pueden resolverse de forma remota, ofrecemos reemplazo acelerado de dispositivos con entrega al día siguiente en la mayoría de las áreas de España para minimizar la interrupción de su servicio.",
        "Todos los dispositivos vienen con una garantía integral que cubre defectos de fabricación y desgaste normal. Nuestros técnicos también pueden realizar visitas de mantenimiento a domicilio para problemas complejos."
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
