
import { KnowledgeEntry } from './types';

export const deviceEntries: KnowledgeEntry[] = [
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
  }
];
