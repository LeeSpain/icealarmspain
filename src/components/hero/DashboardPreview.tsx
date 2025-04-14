
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
    <div className="mt-16 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'en' ? "Member Dashboard Overview" : "Vista Previa del Panel de Miembro"}
        </h2>
      </div>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Description Column */}
        <div className="space-y-5 order-2 md:order-1">
          <p className="text-base text-gray-600 leading-relaxed">
            {language === 'en'
              ? "Experience our intuitive health monitoring system designed for simplicity and peace of mind."
              : "Experimente nuestro sistema de monitoreo de salud intuitivo diseñado para simplicidad y tranquilidad."}
          </p>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start">
              <div className="mt-1 mr-3 bg-ice-50 p-2 rounded-full">
                <Activity className="h-5 w-5 text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {language === 'en' ? "Real-time Health Insights" : "Información de Salud en Tiempo Real"}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? "Monitor vital signs and health metrics with easy-to-read visual indicators."
                    : "Monitoree signos vitales y métricas de salud con indicadores visuales fáciles de leer."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-3 bg-ice-50 p-2 rounded-full">
                <Bell className="h-5 w-5 text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {language === 'en' ? "Smart Alert System" : "Sistema Inteligente de Alertas"}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'en'
                    ? "Receive timely notifications for medication reminders and critical health changes."
                    : "Reciba notificaciones oportunas para recordatorios de medicación y cambios críticos de salud."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-3 bg-ice-50 p-2 rounded-full">
                <Shield className="h-5 w-5 text-ice-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {language === 'en' ? "Device Management" : "Gestión de Dispositivos"}
                </h3>
                <p className="text-sm text-gray-600">
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
              className="group"
            >
              <span className="flex items-center">
                {language === 'en' ? 'Explore Full Dashboard' : 'Explorar Panel Completo'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </ButtonCustom>
          </div>
        </div>
        
        {/* Dashboard Preview Column */}
        <div className="order-1 md:order-2">
          <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 max-w-md mx-auto transform transition-all duration-300 hover:shadow-lg">
            <DashboardPreviewComponent language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
