
import React from "react";
import { Check, Headset, Phone, HeartPulse, Globe, ArrowRight } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface CallCenterServicesProps {
  language: string;
}

const CallCenterServices: React.FC<CallCenterServicesProps> = ({ language }) => {
  return (
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
            <h3 className="text-xl font-semibold font-playfair mb-3">
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
            <h3 className="text-xl font-semibold font-playfair mb-3">
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
            <h3 className="text-xl font-semibold font-playfair mb-3">
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
  );
};

export default CallCenterServices;
