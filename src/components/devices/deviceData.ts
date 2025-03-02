
import React from "react";
import { BellRing, PlusSquare, ActivitySquare } from "lucide-react";

export interface DeviceSpecification {
  batteryLife?: string;
  waterResistance?: string;
  connectivity?: string;
  dimensions?: string;
  weight?: string;
  capacity?: string;
  powerSource?: string;
  sensorLife?: string;
  readingRange?: string;
  accuracy?: string;
}

export interface DeviceData {
  id: string;
  name: string;
  icon: JSX.Element;
  image: string;
  price: number;
  monthlyService: number;
  description: string;
  features: string[];
  specs: DeviceSpecification;
  path: string;
}

export const getDevices = (language: string): DeviceData[] => {
  return [
    {
      id: "sos",
      name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
      icon: <BellRing className="w-16 h-16 text-orange-500" />,
      image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png",
      price: 110.00,
      monthlyService: 24.99,
      description: language === 'en' 
        ? "Our most popular device, the SOS Pendant provides immediate emergency response with just one touch. Advanced fall detection automatically alerts our monitoring center when a fall is detected."
        : "Nuestro dispositivo más popular, el Colgante SOS proporciona respuesta inmediata a emergencias con un solo toque. La detección avanzada de caídas alerta automáticamente a nuestro centro de monitoreo cuando se detecta una caída.",
      features: language === 'en' 
        ? [
            "One-touch emergency button",
            "Advanced fall detection",
            "GPS location tracking",
            "Water-resistant design",
            "Long battery life (up to 7 days)",
            "Two-way voice communication",
            "Automatic emergency alerts",
            "Customizable emergency contacts"
          ]
        : [
            "Botón de emergencia con un toque",
            "Detección avanzada de caídas",
            "Seguimiento de ubicación GPS",
            "Diseño resistente al agua",
            "Batería de larga duración (hasta 7 días)",
            "Comunicación de voz bidireccional",
            "Alertas automáticas de emergencia",
            "Contactos de emergencia personalizables"
          ],
      specs: {
        batteryLife: language === 'en' ? "Up to 7 days" : "Hasta 7 días",
        waterResistance: language === 'en' ? "IP67 (water resistant)" : "IP67 (resistente al agua)",
        connectivity: language === 'en' ? "4G LTE & Bluetooth" : "4G LTE y Bluetooth",
        dimensions: "4.5 × 3.2 × 1.2 cm",
        weight: "35g"
      },
      path: "/sos-pendant"
    },
    {
      id: "dispenser",
      name: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
      icon: <PlusSquare className="w-16 h-16 text-guardian-500" />,
      image: "/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png",
      price: 249.99,
      monthlyService: 24.99,
      description: language === 'en' 
        ? "Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking. The system can alert caregivers or family members when doses are missed."
        : "Nunca vuelva a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes y seguimiento de adherencia. El sistema puede alertar a cuidadores o familiares cuando se omiten dosis.",
      features: language === 'en' 
        ? [
            "Automated pill dispensing",
            "Customizable medication schedules",
            "Missed dose notifications",
            "Medication adherence tracking",
            "Refill reminders",
            "Multiple medication compartments",
            "Caregiver notifications",
            "Integration with health dashboard"
          ]
        : [
            "Dispensación automatizada de píldoras",
            "Horarios de medicación personalizables",
            "Notificaciones de dosis olvidadas",
            "Seguimiento de adherencia a la medicación",
            "Recordatorios de recarga",
            "Múltiples compartimentos para medicamentos",
            "Notificaciones para cuidadores",
            "Integración con el panel de salud"
          ],
      specs: {
        capacity: language === 'en' ? "Up to 28 doses" : "Hasta 28 dosis",
        powerSource: language === 'en' ? "AC Power with battery backup" : "Corriente AC con batería de respaldo",
        connectivity: "Wi-Fi",
        dimensions: "22 × 18 × 8 cm",
        weight: "650g"
      },
      path: "/medical-dispenser"
    },
    {
      id: "glucose",
      name: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
      icon: <ActivitySquare className="w-16 h-16 text-orange-500" />,
      image: "/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png",
      price: 149.99,
      monthlyService: 24.99,
      description: language === 'en' 
        ? "Our continuous Glucose Monitor provides real-time glucose tracking with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations. The device syncs automatically with our health dashboard."
        : "Nuestro Monitor de Glucosa continuo proporciona seguimiento de glucosa en tiempo real con análisis impulsado por IA. Reciba alertas inmediatas para niveles preocupantes y recomendaciones personalizadas. El dispositivo se sincroniza automáticamente con nuestro panel de salud.",
      features: language === 'en' 
        ? [
            "Continuous glucose monitoring",
            "Real-time data transmission",
            "Customizable alert thresholds",
            "Trend analysis and predictions",
            "Easy sensor application",
            "14-day sensor life",
            "Water-resistant design",
            "No fingerstick calibration needed"
          ]
        : [
            "Monitoreo continuo de glucosa",
            "Transmisión de datos en tiempo real",
            "Umbrales de alerta personalizables",
            "Análisis de tendencias y predicciones",
            "Fácil aplicación del sensor",
            "Vida útil del sensor de 14 días",
            "Diseño resistente al agua",
            "No se necesita calibración con pinchazo en el dedo"
          ],
      specs: {
        sensorLife: language === 'en' ? "Up to 14 days" : "Hasta 14 días",
        waterResistance: language === 'en' ? "IP27 (shower-proof)" : "IP27 (resistente a la ducha)",
        connectivity: language === 'en' ? "Bluetooth Low Energy" : "Bluetooth de baja energía",
        readingRange: "40-500 mg/dL",
        accuracy: "±10%"
      },
      path: "/glucose-monitor"
    }
  ];
};
