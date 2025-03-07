
import { Brain, Pill, Monitor, Activity } from "lucide-react";

export const KNOWLEDGE_BASE = {
  health: {
    en: [
      "Your latest blood glucose reading shows stable levels. Remember to continue monitoring and log your readings regularly.",
      "Based on your health data, I recommend scheduling your next check-up in about 4 weeks.",
      "Your vitals look good! Keep up with your regular exercise and balanced diet for optimal health maintenance."
    ],
    es: [
      "Tu última lectura de glucosa en sangre muestra niveles estables. Recuerda seguir monitoreando y registrar tus lecturas regularmente.",
      "Según tus datos de salud, te recomiendo programar tu próximo chequeo en aproximadamente 4 semanas.",
      "¡Tus signos vitales se ven bien! Continúa con tu ejercicio regular y dieta equilibrada para un mantenimiento óptimo de la salud."
    ]
  },
  devices: {
    en: [
      "To set up your SOS pendant, press and hold the button for 5 seconds until the LED flashes blue, then follow the pairing instructions in the mobile app.",
      "For optimal performance, keep your glucose monitor within 30 feet of your mobile device when syncing data.",
      "Remember to charge your devices at least once every 3 days for continuous monitoring and emergency protection."
    ],
    es: [
      "Para configurar tu colgante SOS, mantén presionado el botón durante 5 segundos hasta que el LED parpadee en azul, luego sigue las instrucciones de emparejamiento en la aplicación móvil.",
      "Para un rendimiento óptimo, mantén tu monitor de glucosa a menos de 10 metros de tu dispositivo móvil al sincronizar datos.",
      "Recuerda cargar tus dispositivos al menos una vez cada 3 días para monitoreo continuo y protección de emergencia."
    ]
  },
  medications: {
    en: [
      "Based on your schedule, you should take your blood pressure medication within the next hour.",
      "I notice you've been consistent with your medication routine. Great job! Consistency is key for medication effectiveness.",
      "Your medication dispenser is set up to remind you at 9am and 9pm daily. Would you like to adjust these times?"
    ],
    es: [
      "Según tu horario, debes tomar tu medicamento para la presión arterial dentro de la próxima hora.",
      "Noto que has sido constante con tu rutina de medicación. ¡Buen trabajo! La consistencia es clave para la efectividad de la medicación.",
      "Tu dispensador de medicamentos está configurado para recordarte a las 9am y 9pm diariamente. ¿Te gustaría ajustar estos horarios?"
    ]
  }
};

export const AI_TOPICS = {
  en: [
    {
      id: 'health',
      label: 'Health Monitoring',
      icon: Activity
    },
    {
      id: 'devices',
      label: 'Device Setup',
      icon: Monitor
    },
    {
      id: 'medications',
      label: 'Medications',
      icon: Pill
    }
  ],
  es: [
    {
      id: 'health',
      label: 'Monitoreo de Salud',
      icon: Activity
    },
    {
      id: 'devices',
      label: 'Configuración de Dispositivos',
      icon: Monitor
    },
    {
      id: 'medications',
      label: 'Medicamentos',
      icon: Pill
    }
  ]
};
