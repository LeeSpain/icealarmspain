
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import DeviceHero from "@/components/devices/DeviceHero";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight, Check, Phone, Headset, Globe, Shield, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { getDevices } from "@/components/devices/deviceData";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  const devices = getDevices(language);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <DeviceHero language={language} />
        
        {/* Devices Grid Layout - Consistent py-20 spacing */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-playfair">
              {language === 'en' ? "Our Smart Health Devices" : "Nuestros Dispositivos Inteligentes de Salud"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {devices.map((device) => (
                <div key={device.id} className="bg-white rounded-lg shadow-subtle border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 bg-ice-50/50 p-4 flex items-center justify-center">
                    <img 
                      src={device.image}
                      alt={device.name}
                      className="h-full object-contain"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold font-inter">{device.name}</h3>
                      <div className="bg-ice-100 text-ice-600 text-sm px-2 py-1 rounded font-medium">
                        €{device.price.toFixed(2)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm font-inter">{device.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {device.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <span className="block">{language === 'en' ? 'Monthly service:' : 'Servicio mensual:'}</span>
                        <span className="font-medium text-sm text-ice-600">€{device.monthlyService.toFixed(2)}</span>
                      </div>
                      
                      <Link to={`/devices/${device.id}`}>
                        <ButtonCustom variant="outline" size="sm" className="group">
                          {language === 'en' ? 'Details' : 'Detalles'}
                          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </ButtonCustom>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/join">
                <ButtonCustom size="lg">
                  {language === 'en' ? 'Get Started Now' : 'Comience Ahora'}
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Call Center Support Section */}
        <section className="py-20 bg-ice-50/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-ice-100 to-ice-200 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm">
                <Headset size={16} className="mr-2" />
                <span>{language === 'en' ? '24/7 SUPPORT SERVICE' : 'SERVICIO DE ASISTENCIA 24/7'}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent">
                {language === 'en' ? "Professional Call Center Services" : "Servicios Profesionales de Call Center"}
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 font-inter">
                {language === 'en'
                  ? "Our multilingual support team provides round-the-clock monitoring and assistance for all our connected devices, ensuring your safety and peace of mind."
                  : "Nuestro equipo de soporte multilingüe proporciona monitoreo y asistencia las 24 horas para todos nuestros dispositivos conectados, garantizando su seguridad y tranquilidad."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-md border border-ice-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-ice-100 flex items-center justify-center mb-4">
                  <Phone size={24} className="text-ice-600" />
                </div>
                <h3 className="text-xl font-semibold font-inter mb-3">
                  {language === 'en' ? "Emergency Response" : "Respuesta de Emergencia"}
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  {language === 'en'
                    ? "Immediate response to SOS alerts with precise location tracking and emergency services coordination."
                    : "Respuesta inmediata a alertas SOS con seguimiento preciso de ubicación y coordinación de servicios de emergencia."}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Multilingual operators" : "Operadores multilingües"}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Location tracking" : "Seguimiento de ubicación"}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Emergency coordination" : "Coordinación de emergencia"}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-ice-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-ice-100 flex items-center justify-center mb-4">
                  <HeartPulse size={24} className="text-ice-600" />
                </div>
                <h3 className="text-xl font-semibold font-inter mb-3">
                  {language === 'en' ? "Health Monitoring" : "Monitoreo de Salud"}
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  {language === 'en'
                    ? "Continuous monitoring of glucose levels and medication adherence with proactive interventions."
                    : "Monitoreo continuo de niveles de glucosa y adherencia a medicamentos con intervenciones proactivas."}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Data analysis" : "Análisis de datos"}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Alert thresholds" : "Umbrales de alerta"}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Healthcare coordination" : "Coordinación sanitaria"}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-ice-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-ice-100 flex items-center justify-center mb-4">
                  <Globe size={24} className="text-ice-600" />
                </div>
                <h3 className="text-xl font-semibold font-inter mb-3">
                  {language === 'en' ? "Translation Services" : "Servicios de Traducción"}
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  {language === 'en'
                    ? "Full translation support for communication with local healthcare providers and emergency services."
                    : "Soporte completo de traducción para la comunicación con proveedores locales de atención médica y servicios de emergencia."}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Real-time translation" : "Traducción en tiempo real"}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Medical terminology" : "Terminología médica"}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5" />
                    <span>{language === 'en' ? "Multiple languages" : "Múltiples idiomas"}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/contact">
                <ButtonCustom variant="outline" size="lg" className="group">
                  {language === 'en' ? "Contact Our Support Team" : "Contacte a Nuestro Equipo de Soporte"}
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Improved AI Integration Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-guardian-400/20 to-guardian-600/20 border border-guardian-400/30 text-guardian-600 text-sm font-medium mb-6 shadow-sm">
                  <Shield size={16} className="mr-2" />
                  <span>{language === 'en' ? "ADVANCED TECHNOLOGY" : "TECNOLOGÍA AVANZADA"}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent">
                  {language === 'en' ? "Powered by Guardian AI" : "Impulsado por Guardian AI"}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
                  {language === 'en'
                    ? "All our devices connect to our AI-powered monitoring system for continuous health analysis and rapid emergency response."
                    : "Todos nuestros dispositivos se conectan a nuestro sistema de monitoreo impulsado por IA para análisis continuo de salud y respuesta rápida a emergencias."}
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-ice-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold font-inter mb-4">
                      {language === 'en' ? "Intelligent Monitoring" : "Monitoreo Inteligente"}
                    </h3>
                    <p className="text-gray-600 mb-6 font-inter">
                      {language === 'en'
                        ? "Our AI system learns your normal patterns and can detect unusual changes that might indicate a health issue, often before you notice symptoms."
                        : "Nuestro sistema de IA aprende sus patrones normales y puede detectar cambios inusuales que podrían indicar un problema de salud, a menudo antes de que note los síntomas."}
                    </p>
                    <ul className="space-y-3">
                      {[
                        language === 'en' ? "24/7 health data analysis" : "Análisis de datos de salud 24/7",
                        language === 'en' ? "Automatic alerts for concerning patterns" : "Alertas automáticas para patrones preocupantes",
                        language === 'en' ? "Personalized health insights" : "Información personalizada de salud",
                        language === 'en' ? "Emergency response coordination" : "Coordinación de respuesta de emergencia"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="font-inter">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      <Link to="/join">
                        <ButtonCustom size="lg" className="group">
                          {language === 'en' ? "Experience Guardian AI" : "Experimente Guardian AI"}
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </ButtonCustom>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-ice-50 to-guardian-50 p-8 flex items-center justify-center">
                    <div className="max-w-xs">
                      <div className="relative">
                        <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-ice-100 animate-pulse opacity-70"></div>
                        <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-guardian-400/30 animate-pulse opacity-70"></div>
                        
                        <div className="bg-white rounded-xl shadow-lg p-6 relative z-10">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-ice-100 to-guardian-100 flex items-center justify-center">
                            <Shield size={32} className="text-guardian-600" />
                          </div>
                          
                          <h4 className="font-semibold text-lg text-center font-playfair">Guardian AI</h4>
                          <p className="text-sm text-gray-600 mt-2 text-center font-inter">
                            {language === 'en' 
                              ? "Intelligent health monitoring and emergency response system" 
                              : "Sistema inteligente de monitoreo de salud y respuesta de emergencia"}
                          </p>
                          
                          <div className="mt-6 space-y-2">
                            <div className="bg-ice-50 rounded-full h-2 w-full overflow-hidden">
                              <div className="bg-ice-500 h-full w-3/4 animate-pulse"></div>
                            </div>
                            <div className="bg-ice-50 rounded-full h-2 w-full overflow-hidden">
                              <div className="bg-guardian-400 h-full w-1/2 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                            </div>
                            <div className="bg-ice-50 rounded-full h-2 w-full overflow-hidden">
                              <div className="bg-ice-400 h-full w-2/3 animate-pulse" style={{ animationDelay: "1s" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DevicesPage;
