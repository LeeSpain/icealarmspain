
import React, { useState, useEffect } from "react";
import { BellRing, PlusSquare, ActivitySquare, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import DeviceCard from "./DeviceCard";
import ShoppingCartComponent from "./ShoppingCart";

const DeviceShowcase: React.FC = () => {
  const { language } = useLanguage();
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [totalMonthly, setTotalMonthly] = useState<number>(0);
  const [totalOneTime, setTotalOneTime] = useState<number>(0);

  const devices = [
    {
      id: "sos",
      name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
      price: 110.00,
      monthlyPrice: 24.99,
      icon: <BellRing className="w-12 h-12 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
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
      description: language === 'en' ? 
        "Immediate emergency response with just one touch. Our advanced pendant provides around-the-clock protection with built-in fall detection and GPS tracking." :
        "Respuesta inmediata a emergencias con un solo toque. Nuestro colgante avanzado proporciona protección las 24 horas con detección de caídas y seguimiento GPS."
    },
    {
      id: "dispenser",
      name: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
      price: 249.99,
      monthlyPrice: 24.99,
      icon: <PlusSquare className="w-12 h-12 text-guardian-500" />,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
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
      description: language === 'en' ? 
        "Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking." :
        "Nunca vuelva a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes."
    },
    {
      id: "glucose",
      name: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
      price: 149.99,
      monthlyPrice: 24.99,
      icon: <ActivitySquare className="w-12 h-12 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
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
      description: language === 'en' ? 
        "Real-time glucose monitoring with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations for better health." :
        "Monitoreo de glucosa en tiempo real con análisis impulsado por IA. Reciba alertas inmediatas para niveles preocupantes y recomendaciones personalizadas."
    }
  ];

  useEffect(() => {
    if (selectedDevices.length === 0) {
      setTotalMonthly(0);
      setTotalOneTime(0);
      return;
    }

    let oneTimeTotal = 0;
    let baseMonthly = 0;

    // Calculate one-time device costs
    selectedDevices.forEach(deviceId => {
      const device = devices.find(d => d.id === deviceId);
      if (device) {
        oneTimeTotal += device.price;
        baseMonthly += device.monthlyPrice;
      }
    });

    // Add base AI Guardian service automatically (€49.99)
    const aiGuardianMonthly = 49.99;
    baseMonthly += aiGuardianMonthly;

    // Apply discounts based on number of devices
    let discountedMonthly = baseMonthly;
    if (selectedDevices.length === 2) {
      // 10% discount for 2 devices
      discountedMonthly = baseMonthly * 0.9;
    } else if (selectedDevices.length === 3) {
      // 20% discount for 3 devices
      discountedMonthly = baseMonthly * 0.8;
    }

    setTotalMonthly(discountedMonthly);
    setTotalOneTime(oneTimeTotal);
  }, [selectedDevices]);

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices(prev => {
      if (prev.includes(deviceId)) {
        return prev.filter(id => id !== deviceId);
      } else {
        return [...prev, deviceId];
      }
    });
  };

  return (
    <section id="devices" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
            <ShoppingBag size={16} className="mr-2" />
            {language === 'en' ? 'SHOP NOW & BUY TODAY' : 'COMPRE AHORA Y HOY MISMO'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? "Shop Smart Devices" : "Comprar Dispositivos Inteligentes"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? "Our comprehensive ecosystem of health monitoring devices works seamlessly with the AI Guardian." 
              : "Nuestro ecosistema integral de dispositivos de monitoreo de salud funciona a la perfección con el Guardián de IA."}
          </p>
          <p className="text-ice-600 mt-2 font-medium">
            {language === 'en' 
              ? "Select the devices you need below. AI Guardian service is automatically included." 
              : "Seleccione los dispositivos que necesita a continuación. El servicio AI Guardian se incluye automáticamente."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {devices.map((device, index) => (
            <DeviceCard
              key={device.id}
              id={device.id}
              name={device.name}
              price={device.price}
              monthlyPrice={device.monthlyPrice}
              icon={device.icon}
              image={device.image}
              features={device.features}
              description={device.description}
              isSelected={selectedDevices.includes(device.id)}
              onSelect={toggleDeviceSelection}
            />
          ))}
        </div>
        
        <ShoppingCartComponent
          selectedDevices={selectedDevices}
          devices={devices}
          totalMonthly={totalMonthly}
          totalOneTime={totalOneTime}
          onRemoveDevice={toggleDeviceSelection}
        />
      </div>
    </section>
  );
};

export default DeviceShowcase;
