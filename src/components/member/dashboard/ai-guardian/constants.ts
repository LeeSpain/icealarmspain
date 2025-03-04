
import { Activity, BellRing, PlusSquare } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface AITopic {
  id: string;
  label: string;
  icon: LucideIcon;
}

// Topics the AI can help with
export const AI_TOPICS: Record<string, AITopic[]> = {
  en: [
    { id: 'health', label: 'Health Data', icon: Activity },
    { id: 'devices', label: 'Device Setup', icon: BellRing },
    { id: 'medications', label: 'Medications', icon: PlusSquare },
  ],
  es: [
    { id: 'health', label: 'Datos de Salud', icon: Activity },
    { id: 'devices', label: 'Configuración de Dispositivos', icon: BellRing },
    { id: 'medications', label: 'Medicamentos', icon: PlusSquare },
  ]
};

// Knowledge base for the AI to reference
export const KNOWLEDGE_BASE: Record<string, Record<string, string[]>> = {
  health: {
    en: [
      "Your blood pressure readings show a stable trend over the past month.",
      "Your glucose levels have been within the normal range during the last week.",
      "Remember to keep track of your daily water intake.",
      "Regular physical activity can help maintain healthy blood pressure."
    ],
    es: [
      "Sus lecturas de presión arterial muestran una tendencia estable durante el último mes.",
      "Sus niveles de glucosa han estado dentro del rango normal durante la última semana.",
      "Recuerde llevar un registro de su consumo diario de agua.",
      "La actividad física regular puede ayudar a mantener una presión arterial saludable."
    ]
  },
  devices: {
    en: [
      "To set up your SOS Pendant, press and hold the main button for 5 seconds until it flashes blue.",
      "The Glucose Monitor needs to be calibrated once every 14 days for accurate readings.",
      "For optimal performance, charge your devices overnight when battery is below 30%.",
      "Place the Medical Dispenser on a flat, stable surface away from direct sunlight."
    ],
    es: [
      "Para configurar su Colgante SOS, mantenga presionado el botón principal durante 5 segundos hasta que parpadee en azul.",
      "El Monitor de Glucosa debe calibrarse una vez cada 14 días para lecturas precisas.",
      "Para un rendimiento óptimo, cargue sus dispositivos durante la noche cuando la batería esté por debajo del 30%.",
      "Coloque el Dispensador Médico en una superficie plana y estable, alejada de la luz solar directa."
    ]
  },
  medications: {
    en: [
      "Your medication schedule has been updated based on your doctor's recent recommendations.",
      "It's important to take your medications at the same time each day for optimal effectiveness.",
      "Store your medications in a cool, dry place away from direct sunlight.",
      "If you experience any side effects, contact your healthcare provider immediately."
    ],
    es: [
      "Su horario de medicación ha sido actualizado según las recomendaciones recientes de su médico.",
      "Es importante tomar sus medicamentos a la misma hora cada día para una efectividad óptima.",
      "Guarde sus medicamentos en un lugar fresco y seco, alejado de la luz solar directa.",
      "Si experimenta algún efecto secundario, contacte a su proveedor de salud inmediatamente."
    ]
  }
};
