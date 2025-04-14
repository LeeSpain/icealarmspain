
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardPreviewComponent from "./dashboard-preview";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight, Shield, Bell, Activity } from "lucide-react";

interface DashboardPreviewProps {
  language: string;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ language }) => {
  const navigate = useNavigate();
  
  return (
    <div className="my-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'en' ? "Member Dashboard Overview" : "Vista Previa del Panel de Miembro"}
        </h2>
      </div>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-center">
        {/* Description Column - 1/3 width */}
        <div className="md:col-span-4 space-y-4">
          <p className="text-base text-gray-600 leading-relaxed">
            {language === 'en'
              ? "Experience our streamlined health monitoring dashboard with essential real-time insights and device management."
              : "Experimente nuestro panel de monitoreo de salud optimizado con información esencial en tiempo real y gestión de dispositivos."}
          </p>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start">
              <div className="mt-0.5 mr-3 bg-ice-50 p-2 rounded-full">
                <Activity className="h-4 w-4 text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium text-base text-gray-800">
                  {language === 'en' ? "Real-time Health Insights" : "Información de Salud en Tiempo Real"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'en' 
                    ? "Monitor vital signs and health metrics with easy-to-read visual indicators."
                    : "Monitoree signos vitales y métricas de salud con indicadores visuales fáciles de leer."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-0.5 mr-3 bg-ice-50 p-2 rounded-full">
                <Bell className="h-4 w-4 text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium text-base text-gray-800">
                  {language === 'en' ? "Smart Alert System" : "Sistema Inteligente de Alertas"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'en'
                    ? "Receive timely notifications for medication reminders and critical health changes."
                    : "Reciba notificaciones oportunas para recordatorios de medicación y cambios críticos de salud."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-0.5 mr-3 bg-ice-50 p-2 rounded-full">
                <Shield className="h-4 w-4 text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium text-base text-gray-800">
                  {language === 'en' ? "Device Management" : "Gestión de Dispositivos"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'en'
                    ? "Easily monitor battery levels and connection status of all your ICE devices."
                    : "Monitoree fácilmente los niveles de batería y el estado de conexión de todos sus dispositivos ICE."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <ButtonCustom 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="group text-sm"
            >
              <span className="flex items-center">
                {language === 'en' ? 'Explore Full Dashboard' : 'Explorar Panel Completo'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </ButtonCustom>
          </div>
        </div>
        
        {/* Dashboard Preview Column - 2/3 width */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 w-full mx-auto transform transition-all duration-300 hover:shadow-lg">
            <DashboardPreviewComponent language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
