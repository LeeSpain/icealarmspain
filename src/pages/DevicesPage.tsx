
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import DeviceHero from "@/components/devices/DeviceHero";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { getDevices } from "@/components/devices/deviceData";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  const devices = getDevices(language);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <DeviceHero language={language} />
        
        {/* Devices Grid Layout */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center mb-12">
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
                      <h3 className="text-xl font-semibold">{device.name}</h3>
                      <div className="bg-ice-100 text-ice-600 text-sm px-2 py-1 rounded font-medium">
                        €{device.price.toFixed(2)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">{device.description}</p>
                    
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
                      
                      <Link to={device.path}>
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
        
        {/* AI Integration Section */}
        <section className="py-16 bg-ice-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4">
                {language === 'en' ? "Powered by Guardian AI" : "Impulsado por Guardian AI"}
              </h2>
              <p className="text-gray-600">
                {language === 'en'
                  ? "All our devices connect to our AI-powered monitoring system for continuous health analysis and rapid emergency response."
                  : "Todos nuestros dispositivos se conectan a nuestro sistema de monitoreo impulsado por IA para análisis continuo de salud y respuesta rápida a emergencias."}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-subtle p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? "Intelligent Monitoring" : "Monitoreo Inteligente"}
                  </h3>
                  <p className="text-gray-600 mb-6">
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
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-ice-50 rounded-lg p-6 shadow-inner">
                  {/* Placeholder for AI visualization */}
                  <div className="aspect-square max-w-xs mx-auto bg-gradient-to-br from-ice-100 to-guardian-100 rounded-xl flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ice-600">
                          <path d="M12 2a8 8 0 0 1 8 8v12l-4-4-4 4-4-4-4 4V10a8 8 0 0 1 8-8z" />
                          <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                          <path d="M12 10v4" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-lg">Guardian AI</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        {language === 'en' 
                          ? "Intelligent health monitoring and emergency response system" 
                          : "Sistema inteligente de monitoreo de salud y respuesta de emergencia"}
                      </p>
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
