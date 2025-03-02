
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { 
  ActivitySquare, Shield, Check, ArrowRight, Clock, 
  BarChart, Eye, LineChart, ChevronRight, Heart
} from "lucide-react";

const GlucoseMonitorPage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-ice-100/70 to-transparent rounded-full filter blur-3xl opacity-70 -z-10 animate-pulse-gentle"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-radial from-guardian-100/60 to-transparent rounded-full filter blur-3xl opacity-50 -z-10"></div>
          <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full border border-ice-200/50 -z-10 animate-float"></div>
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6 animate-slide-down">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-sm font-medium mb-2">
                    <ActivitySquare size={16} className="mr-2" />
                    {language === 'en' ? 'CONTINUOUS GLUCOSE MONITORING' : 'MONITOREO CONTINUO DE GLUCOSA'}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight relative">
                    <span className="relative z-10 bg-gradient-to-r from-gray-900 via-ice-900 to-orange-800 bg-clip-text text-transparent inline-block">
                      {language === 'en' 
                        ? 'Smart Glucose Monitor' 
                        : 'Monitor de Glucosa Inteligente'}
                    </span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    {language === 'en' 
                      ? 'Our smart Glucose Monitor provides continuous glucose monitoring with real-time data analysis and alerts, helping maintain optimal blood sugar levels.' 
                      : 'Nuestro Monitor de Glucosa inteligente proporciona monitoreo continuo de glucosa con análisis de datos en tiempo real y alertas, ayudando a mantener niveles óptimos de azúcar en sangre.'}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link to="/join">
                      <ButtonCustom size="lg" className="group relative overflow-hidden shadow-md">
                        <span className="relative z-10 flex items-center">
                          {language === 'en' ? 'Order Now - €149.99' : 'Ordenar Ahora - €149.99'}
                          <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </span>
                      </ButtonCustom>
                    </Link>
                    <Link to="/demo">
                      <ButtonCustom variant="outline" size="lg">
                        {language === 'en' ? 'Request Demo' : 'Solicitar Demo'}
                      </ButtonCustom>
                    </Link>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Shield size={16} className="mr-2 text-guardian-500" />
                    <span>
                      {language === 'en' 
                        ? 'Guardian AI Compatible' 
                        : 'Compatible con Guardian AI'}
                    </span>
                    <span className="mx-2">•</span>
                    <Clock size={16} className="mr-2 text-orange-500" />
                    <span>
                      {language === 'en' 
                        ? '14-Day Sensor Life' 
                        : 'Vida del Sensor de 14 Días'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-orange-100 rounded-full opacity-50 -z-10"></div>
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-ice-100 rounded-full opacity-40 -z-10"></div>
                <img 
                  src="/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png"
                  alt="Glucose Monitor"
                  className="rounded-xl shadow-subtle bg-white p-6 relative z-10 max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-ice-50/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'en' 
                  ? "Advanced Glucose Monitoring Features" 
                  : "Características Avanzadas de Monitoreo de Glucosa"}
              </h2>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Our continuous glucose monitor combines cutting-edge technology with ease of use, providing reliable monitoring without the pain of fingersticks."
                  : "Nuestro monitor continuo de glucosa combina tecnología de vanguardia con facilidad de uso, proporcionando un monitoreo confiable sin el dolor de los pinchazos en los dedos."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <LineChart className="w-10 h-10 text-orange-500" />,
                  title: language === 'en' ? "Continuous Monitoring" : "Monitoreo Continuo",
                  description: language === 'en'
                    ? "Automatic readings every 5 minutes, providing a complete picture of your glucose levels and trends."
                    : "Lecturas automáticas cada 5 minutos, proporcionando una imagen completa de sus niveles de glucosa y tendencias."
                },
                {
                  icon: <Eye className="w-10 h-10 text-guardian-600" />,
                  title: language === 'en' ? "Real-time Alerts" : "Alertas en Tiempo Real",
                  description: language === 'en'
                    ? "Customizable alerts notify you and your caregivers when glucose levels rise or fall outside your target range."
                    : "Alertas personalizables le notifican a usted y a sus cuidadores cuando los niveles de glucosa suben o bajan fuera de su rango objetivo."
                },
                {
                  icon: <BarChart className="w-10 h-10 text-orange-500" />,
                  title: language === 'en' ? "Trend Analysis" : "Análisis de Tendencias",
                  description: language === 'en'
                    ? "AI-powered analytics provide insight into patterns and predict potential issues before they become serious."
                    : "El análisis impulsado por IA proporciona información sobre patrones y predice posibles problemas antes de que se vuelvan graves."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-panel p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform duration-300 relative overflow-hidden"
                >
                  <div className="mb-4 p-3 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-subtle">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Technical Specifications */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {language === 'en' 
                    ? "Technical Specifications" 
                    : "Especificaciones Técnicas"}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {language === 'en' ? "Sensor Specifications" : "Especificaciones del Sensor"}
                    </h3>
                    <ul className="space-y-2">
                      {(language === 'en' 
                        ? [
                            "Sensor life: Up to 14 days",
                            "Water resistance: IP27 (shower-proof)",
                            "Reading range: 40-500 mg/dL",
                            "Accuracy: ±10% compared to lab results",
                            "Warm-up time: 1 hour",
                            "Readings: Automatic every 5 minutes"
                          ]
                        : [
                            "Vida del sensor: Hasta 14 días",
                            "Resistencia al agua: IP27 (resistente a la ducha)",
                            "Rango de lectura: 40-500 mg/dL",
                            "Precisión: ±10% en comparación con resultados de laboratorio",
                            "Tiempo de calentamiento: 1 hora",
                            "Lecturas: Automática cada 5 minutos"
                          ]
                      ).map((spec, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {language === 'en' ? "Connectivity" : "Conectividad"}
                    </h3>
                    <ul className="space-y-2">
                      {(language === 'en' 
                        ? [
                            "Bluetooth Low Energy to smartphone",
                            "Automatic syncing with Guardian AI",
                            "Data sharing with family members and healthcare providers",
                            "Compatible with iOS and Android devices"
                          ]
                        : [
                            "Bluetooth de baja energía a smartphone",
                            "Sincronización automática con Guardian AI",
                            "Compartir datos con familiares y proveedores de atención médica",
                            "Compatible con dispositivos iOS y Android"
                          ]
                      ).map((spec, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3">
                    {language === 'en' ? "What's Included" : "Qué Incluye"}
                  </h3>
                  <ul className="space-y-2">
                    {(language === 'en' 
                      ? [
                          "1 Glucose Monitor Receiver",
                          "2 Glucose Sensors (14-day each)",
                          "1 Sensor Applicator",
                          "USB Charging Cable",
                          "User Manual",
                          "Mobile App Access"
                        ]
                      : [
                          "1 Receptor Monitor de Glucosa",
                          "2 Sensores de Glucosa (14 días cada uno)",
                          "1 Aplicador de Sensor",
                          "Cable de Carga USB",
                          "Manual de Usuario",
                          "Acceso a Aplicación Móvil"
                        ]
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-ice-50 p-8 rounded-xl relative">
                <div className="bg-white rounded-lg shadow-subtle p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? "Pricing Information" : "Información de Precios"}
                  </h3>
                  
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-orange-600 mb-1">€149.99</div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === 'en' ? "One-time purchase for monitor (excl. 21% IVA)" : "Compra única para monitor (sin 21% IVA)"}
                    </p>
                    <div className="text-lg font-semibold text-orange-600 flex items-center mt-3">
                      <span>+</span>
                      <span className="mx-2">€24.99</span>
                      <span className="text-sm font-medium">/ {language === 'en' ? "month" : "mes"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? "Monthly service fee (excl. 10% IVA)" : "Tarifa de servicio mensual (sin 10% IVA)"}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {language === 'en' ? "Shipping" : "Envío"}
                      </span>
                      <span>€14.99</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {language === 'en' ? "Replacement Sensors (2-pack)" : "Sensores de Reemplazo (2 unidades)"}
                      </span>
                      <span>€89.99</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Link to="/join" className="w-full">
                      <ButtonCustom className="w-full">
                        {language === 'en' ? "Order Now" : "Ordenar Ahora"}
                      </ButtonCustom>
                    </Link>
                    <div className="text-center">
                      <Link to="/devices" className="text-ice-600 text-sm flex items-center justify-center hover:underline">
                        <ChevronRight size={16} className="mr-1" />
                        {language === 'en' ? "Compare with other devices" : "Comparar con otros dispositivos"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Health Integration Section */}
        <section className="py-16 bg-ice-50/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'en' 
                  ? "Integrated Health Management" 
                  : "Gestión Integrada de Salud"}
              </h2>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Our Glucose Monitor works seamlessly with the Guardian AI system and other health devices for comprehensive health monitoring."
                  : "Nuestro Monitor de Glucosa funciona perfectamente con el sistema Guardian AI y otros dispositivos de salud para un monitoreo integral de la salud."}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-subtle overflow-hidden max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Heart className="text-orange-500 mr-2" />
                    {language === 'en' ? "Health Dashboard Integration" : "Integración con Panel de Salud"}
                  </h3>
                  
                  <ul className="space-y-3">
                    {(language === 'en' 
                      ? [
                          "View glucose trends alongside other health metrics",
                          "Receive personalized health insights",
                          "Share data with healthcare providers",
                          "Set custom alerts and notifications",
                          "Track medication adherence and effects"
                        ]
                      : [
                          "Ver tendencias de glucosa junto con otras métricas de salud",
                          "Recibir información personalizada sobre la salud",
                          "Compartir datos con proveedores de atención médica",
                          "Establecer alertas y notificaciones personalizadas",
                          "Seguimiento de adherencia y efectos de medicamentos"
                        ]
                    ).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-ice-50 p-8 flex items-center justify-center">
                  <img 
                    src="/placeholder.svg" 
                    alt="Health Dashboard"
                    className="rounded-lg shadow-subtle max-w-full h-auto"
                    width={300}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' 
                ? "Take control of your glucose levels today" 
                : "Tome el control de sus niveles de glucosa hoy"}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {language === 'en'
                ? "Join thousands of satisfied customers who trust our Glucose Monitor for accurate, reliable, and continuous glucose monitoring."
                : "Únase a miles de clientes satisfechos que confían en nuestro Monitor de Glucosa para un monitoreo de glucosa preciso, confiable y continuo."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <ButtonCustom variant="secondary" size="lg">
                  {language === 'en' ? "Order Now" : "Ordenar Ahora"}
                </ButtonCustom>
              </Link>
              <Link to="/demo">
                <ButtonCustom variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  {language === 'en' ? "Request Demo" : "Solicitar Demo"}
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GlucoseMonitorPage;
