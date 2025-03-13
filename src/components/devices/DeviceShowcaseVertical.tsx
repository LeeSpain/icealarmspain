
import React from "react";
import { BellRing, PlusSquare, ActivitySquare, ShoppingBag, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import DeviceCard from "./DeviceCard";

const DeviceShowcaseVertical: React.FC = () => {
  const { language } = useLanguage();

  const devices = [
    {
      id: "sos",
      name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
      icon: <BellRing className="w-12 h-12 text-orange-500" />,
      image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png",
      features: language === 'en' ? [
        "One-touch emergency call",
        "GPS tracking",
        "Fall detection sensors",
        "Custom emergency routing",
        "AI wellness check-ins"
      ] : [
        "Llamada de emergencia con un toque",
        "Seguimiento GPS",
        "Sensores de detección de caídas",
        "Enrutamiento personalizado",
        "Revisiones de bienestar con IA"
      ],
      techSpecs: language === 'en' ? [
        "Battery life: Up to 7 days",
        "Water-resistant (IP67)",
        "Dimensions: 4.2 x 2.8 x 1.1 cm",
        "Weight: 35g",
        "Connectivity: 4G LTE & Bluetooth"
      ] : [
        "Duración de batería: Hasta 7 días",
        "Resistente al agua (IP67)",
        "Dimensiones: 4.2 x 2.8 x 1.1 cm",
        "Peso: 35g",
        "Conectividad: 4G LTE y Bluetooth"
      ],
      description: language === 'en' ? 
        "Immediate emergency response with just one touch. Our advanced pendant provides around-the-clock protection with built-in fall detection and GPS tracking." :
        "Respuesta inmediata a emergencias con un solo toque. Nuestro colgante avanzado proporciona protección las 24 horas con detección de caídas y seguimiento GPS.",
      longDescription: language === 'en' ?
        "The SOS Pendant is designed for seniors and vulnerable individuals to maintain independence while ensuring help is always available. Its advanced fall detection automatically alerts emergency services and caregivers if a fall is detected, even if the user is unconscious." :
        "El Colgante SOS está diseñado para personas mayores y vulnerables para mantener la independencia mientras se asegura de que la ayuda esté siempre disponible. Su detección avanzada de caídas alerta automáticamente a los servicios de emergencia y cuidadores si se detecta una caída, incluso si el usuario está inconsciente.",
      path: "/sos-pendant",
      price: "€110.00",
      monthlyPrice: "€24.99"
    },
    {
      id: "dispenser",
      name: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
      icon: <PlusSquare className="w-12 h-12 text-guardian-500" />,
      image: "/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png",
      features: language === 'en' ? [
        "Automated pill dispensing",
        "Missed dose notifications",
        "AI-powered reminders",
        "Escalation protocols",
        "Medication adherence tracking"
      ] : [
        "Dispensación automática de píldoras",
        "Notificaciones de dosis olvidadas",
        "Recordatorios potenciados por IA",
        "Protocolos de escalada",
        "Seguimiento de adherencia"
      ],
      techSpecs: language === 'en' ? [
        "Capacity: Up to 28 doses",
        "Power: AC with 48-hour battery backup",
        "Dimensions: 22 x 15 x 5 cm",
        "Connectivity: Wi-Fi & Cellular",
        "Tamper-proof locking system"
      ] : [
        "Capacidad: Hasta 28 dosis",
        "Alimentación: CA con batería de respaldo de 48 horas",
        "Dimensiones: 22 x 15 x 5 cm",
        "Conectividad: Wi-Fi y Celular",
        "Sistema de bloqueo a prueba de manipulaciones"
      ],
      description: language === 'en' ? 
        "Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking." :
        "Nunca vuelva a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes.",
      longDescription: language === 'en' ?
        "The Medical Dispenser is perfect for individuals managing multiple medications. Its smart system alerts caregivers if doses are missed and can be programmed remotely. The dispenser only provides access to the correct medication at the prescribed time, preventing overdose or medication errors." :
        "El Dispensador Médico es perfecto para personas que manejan múltiples medicamentos. Su sistema inteligente alerta a los cuidadores si se olvidan las dosis y puede programarse de forma remota. El dispensador solo proporciona acceso a la medicación correcta en el momento prescrito, evitando sobredosis o errores de medicación.",
      path: "/medical-dispenser",
      price: "€249.99",
      monthlyPrice: "€24.99"
    },
    {
      id: "glucose",
      name: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
      icon: <ActivitySquare className="w-12 h-12 text-orange-500" />,
      image: "/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png",
      features: language === 'en' ? [
        "Continuous glucose monitoring",
        "AI trend analysis",
        "Immediate alerts",
        "Emergency response",
        "Dietary recommendations"
      ] : [
        "Monitoreo continuo de glucosa",
        "Análisis de tendencias con IA",
        "Alertas inmediatas",
        "Respuesta de emergencia",
        "Recomendaciones dietéticas"
      ],
      techSpecs: language === 'en' ? [
        "Sensor life: 14 days",
        "Reading interval: Every 5 minutes",
        "Water-resistant (IP68)",
        "Wireless range: Up to 6 meters",
        "App compatibility: iOS & Android"
      ] : [
        "Vida del sensor: 14 días",
        "Intervalo de lecturas: Cada 5 minutos",
        "Resistente al agua (IP68)",
        "Alcance inalámbrico: Hasta 6 metros",
        "Compatibilidad con apps: iOS y Android"
      ],
      description: language === 'en' ? 
        "Real-time glucose monitoring with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations for better health." :
        "Monitoreo de glucosa en tiempo real con análisis impulsado por IA. Reciba alertas inmediatas para niveles preocupantes y recomendaciones personalizadas.",
      longDescription: language === 'en' ?
        "Our Glucose Monitor provides 24/7 monitoring without the need for constant finger pricks. The AI system learns the user's patterns and can predict hypoglycemic or hyperglycemic events before they occur, providing life-saving alerts to both the user and caregivers." :
        "Nuestro Monitor de Glucosa proporciona monitoreo 24/7 sin necesidad de pinchazos constantes en el dedo. El sistema de IA aprende los patrones del usuario y puede predecir eventos hipoglucémicos o hiperglucémicos antes de que ocurran, proporcionando alertas que salvan vidas tanto al usuario como a los cuidadores.",
      path: "/glucose-monitor",
      price: "€149.99",
      monthlyPrice: "€24.99"
    }
  ];

  return (
    <section id="devices" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
            <ShoppingBag size={16} className="mr-2" />
            {language === 'en' ? 'OUR PRODUCT RANGE' : 'NUESTRA GAMA DE PRODUCTOS'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            {language === 'en' ? "Smart Health Monitoring Devices" : "Dispositivos Inteligentes de Monitoreo de Salud"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? "Discover our comprehensive range of AI-powered health monitoring devices designed to provide peace of mind and enhanced care." 
              : "Descubra nuestra amplia gama de dispositivos de monitoreo de salud impulsados por IA diseñados para brindar tranquilidad y atención mejorada."}
          </p>
          
          <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm flex items-start max-w-xl mx-auto">
            <Info size={18} className="text-ice-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              {language === 'en' 
                ? "Our devices are designed to be easy to use and provide continuous monitoring with instant alerts to caregivers and emergency services when needed."
                : "Nuestros dispositivos están diseñados para ser fáciles de usar y proporcionar monitoreo continuo con alertas instantáneas a cuidadores y servicios de emergencia cuando sea necesario."}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {devices.map((device, index) => (
            <DeviceCard
              key={device.id}
              id={device.id}
              name={device.name}
              icon={device.icon}
              image={device.image}
              description={device.description}
              longDescription={device.longDescription}
              features={device.features}
              techSpecs={device.techSpecs}
              path={device.path}
              price={device.price}
              monthlyPrice={device.monthlyPrice}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? "All our devices are designed to work together as part of a comprehensive health monitoring ecosystem. Bundle multiple devices for enhanced protection and special pricing."
              : "Todos nuestros dispositivos están diseñados para trabajar juntos como parte de un ecosistema integral de monitoreo de salud. Combine múltiples dispositivos para obtener mayor protección y precios especiales."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/join">
              <ButtonCustom variant="primary" size="lg">
                {language === 'en' ? "Get Started Today" : "Comience Hoy"}
              </ButtonCustom>
            </Link>
            <Link to="/contact">
              <ButtonCustom variant="outline" size="lg">
                {language === 'en' ? "Contact for Custom Solutions" : "Contacte para Soluciones Personalizadas"}
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceShowcaseVertical;
