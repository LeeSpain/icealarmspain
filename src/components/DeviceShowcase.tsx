
import React from "react";
import { BellRing, PlusSquare, ActivitySquare, ShoppingBag, Info, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { ButtonCustom } from "./ui/button-custom";

const DeviceShowcase: React.FC = () => {
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
      description: language === 'en' ? 
        "Immediate emergency response with just one touch. Our advanced pendant provides around-the-clock protection with built-in fall detection and GPS tracking." :
        "Respuesta inmediata a emergencias con un solo toque. Nuestro colgante avanzado proporciona protección las 24 horas con detección de caídas y seguimiento GPS."
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
      description: language === 'en' ? 
        "Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking." :
        "Nunca vuelva a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes."
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
      description: language === 'en' ? 
        "Real-time glucose monitoring with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations for better health." :
        "Monitoreo de glucosa en tiempo real con análisis impulsado por IA. Reciba alertas inmediatas para niveles preocupantes y recomendaciones personalizadas."
    }
  ];

  return (
    <section id="devices" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
            <ShoppingBag size={16} className="mr-2" />
            {language === 'en' ? 'INNOVATIVE MONITORING DEVICES' : 'DISPOSITIVOS DE MONITOREO INNOVADORES'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? "Smart Health Monitoring Devices" : "Dispositivos Inteligentes de Monitoreo de Salud"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? "Our comprehensive ecosystem of health monitoring devices works seamlessly with the AI Guardian." 
              : "Nuestro ecosistema integral de dispositivos de monitoreo de salud funciona a la perfección con el Guardián de IA."}
          </p>
          <p className="text-ice-600 mt-2 font-medium">
            {language === 'en' 
              ? "Learn more about our innovative devices below and how they integrate with our service." 
              : "Aprenda más sobre nuestros dispositivos innovadores a continuación y cómo se integran con nuestro servicio."}
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {devices.map((device, index) => (
            <div 
              key={device.id}
              className="bg-white rounded-3xl shadow-subtle border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="p-6">
                <div className="mb-4">{device.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{device.name}</h3>
                
                {/* Device Image */}
                <div className="mb-4 overflow-hidden rounded-lg h-48">
                  <img 
                    src={device.image}
                    alt={device.name}
                    className="w-full h-full object-contain transition-transform hover:scale-105"
                  />
                </div>
                
                <p className="text-muted-foreground text-sm text-center mb-6">
                  {device.description}
                </p>
                
                <div className="w-full border-t border-gray-100 pt-4 mb-6">
                  <h4 className="font-medium mb-2 text-sm text-ice-600">
                    {language === 'en' ? "Key Features:" : "Características Principales:"}
                  </h4>
                  <ul className="space-y-2">
                    {device.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link to={`/products#${device.id}`}>
                  <ButtonCustom 
                    variant="outline" 
                    className="mt-auto w-full group"
                  >
                    {language === 'en' ? "Learn More" : "Más Información"}
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {language === 'en'
              ? "Our devices are designed to work together to provide comprehensive health monitoring and emergency response."
              : "Nuestros dispositivos están diseñados para trabajar juntos para proporcionar monitoreo de salud integral y respuesta de emergencia."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/products">
              <ButtonCustom variant="outline" size="lg">
                {language === 'en' ? "Explore All Devices" : "Explorar Todos los Dispositivos"}
              </ButtonCustom>
            </Link>
            <Link to="/join">
              <ButtonCustom variant="primary" size="lg">
                {language === 'en' ? "Get Started Today" : "Comience Hoy"}
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceShowcase;
