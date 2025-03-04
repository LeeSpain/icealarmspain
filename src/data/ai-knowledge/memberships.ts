
import { KnowledgeEntry } from './types';

export const membershipEntries: KnowledgeEntry[] = [
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
  }
];
