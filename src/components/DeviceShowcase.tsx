
import React, { useState, useEffect } from "react";
import { ButtonCustom } from "./ui/button-custom";
import { BellRing, PlusSquare, ActivitySquare, ArrowRight, CheckCircle, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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

  // Calculate discounts based on number of devices
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

  const getDeviceSelectLabel = () => {
    return language === 'en' ? "Select" : "Seleccionar";
  };

  const getDeviceSelectedLabel = () => {
    return language === 'en' ? "Selected" : "Seleccionado";
  };
  
  return (
    <section id="devices" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? "Integrated Smart Devices" : "Dispositivos Inteligentes Integrados"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? "Our comprehensive ecosystem of health monitoring devices works seamlessly with the AI Guardian." 
              : "Nuestro ecosistema integral de dispositivos de monitoreo de salud funciona a la perfección con el Guardián de IA."}
          </p>
          <p className="text-muted-foreground mt-2">
            {language === 'en' 
              ? "Select the devices you need for your personalized protection plan." 
              : "Seleccione los dispositivos que necesita para su plan de protección personalizado."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {devices.map((device, index) => (
            <div 
              key={device.id}
              className={`device-card shadow-subtle animate-slide-up ${
                selectedDevices.includes(device.id) ? "border-2 border-orange-500" : "border border-gray-100"
              }`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="mb-6">{device.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{device.name}</h3>
              <p className="text-2xl font-bold text-orange-600 mb-4">€{device.price.toFixed(2)}</p>
              <p className="text-sm text-orange-700 mb-4">
                {language === 'en' ? "+ €" : "+ €"}{device.monthlyPrice.toFixed(2)} {language === 'en' ? "monthly" : "mensual"}
              </p>
              <p className="text-muted-foreground text-sm text-center mb-6">
                {device.description}
              </p>
              
              <div className="w-full border-t border-gray-100 pt-4 mb-6">
                <ul className="space-y-2">
                  {device.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <ButtonCustom 
                variant={selectedDevices.includes(device.id) ? "primary" : "outline"} 
                className="mt-auto group"
                onClick={() => toggleDeviceSelection(device.id)}
              >
                {selectedDevices.includes(device.id) ? getDeviceSelectedLabel() : getDeviceSelectLabel()}
                {selectedDevices.includes(device.id) ? (
                  <CheckCircle size={16} className="ml-2" />
                ) : (
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </ButtonCustom>
            </div>
          ))}
        </div>
        
        {selectedDevices.length > 0 && (
          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2 text-orange-500" />
              {language === 'en' ? "Your Selected Devices" : "Sus Dispositivos Seleccionados"}
            </h3>
            
            <div className="space-y-3 mb-6">
              {selectedDevices.map(deviceId => {
                const device = devices.find(d => d.id === deviceId);
                return device && (
                  <div key={deviceId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3">{device.icon}</div>
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? "One-time purchase" : "Compra única"}: €{device.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <ButtonCustom 
                      variant="outline" 
                      size="sm" 
                      className="text-orange-500 hover:text-orange-700 hover:bg-orange-50"
                      onClick={() => toggleDeviceSelection(deviceId)}
                    >
                      {language === 'en' ? "Remove" : "Eliminar"}
                    </ButtonCustom>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">
                  {language === 'en' ? "One-time device cost" : "Costo único de dispositivos"}:
                </span>
                <span className="font-medium">€{totalOneTime.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">
                  {language === 'en' ? "Monthly subscription" : "Suscripción mensual"}:
                </span>
                <span className="font-medium">€{totalMonthly.toFixed(2)}</span>
              </div>
              
              {selectedDevices.length > 1 && (
                <div className="text-sm text-green-600 italic mb-4 text-right">
                  {selectedDevices.length === 2 
                    ? (language === 'en' ? "10% discount applied!" : "¡Descuento del 10% aplicado!") 
                    : (language === 'en' ? "20% discount applied!" : "¡Descuento del 20% aplicado!")}
                </div>
              )}
              
              <ButtonCustom className="w-full mt-4">
                {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
              </ButtonCustom>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                {language === 'en' 
                  ? "By proceeding, you agree to our Terms of Service and Privacy Policy."
                  : "Al continuar, acepta nuestros Términos de Servicio y Política de Privacidad."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DeviceShowcase;
