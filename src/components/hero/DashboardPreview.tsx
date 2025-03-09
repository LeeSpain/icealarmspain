
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, Heart, Shield, AlertCircle, Activity, Calendar, Pill } from "lucide-react";

interface DashboardPreviewProps {
  language: string;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ language }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    console.log("Dashboard preview button clicked, redirecting to pricing page");
    navigate('/join');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="mt-24 mb-12 text-center">
      <h2 className="text-3xl font-bold mb-6">
        {language === 'en' ? "Member Dashboard Preview" : "Vista Previa del Panel de Miembro"}
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
        {language === 'en'
          ? "Get a glimpse of our comprehensive health monitoring dashboard with real-time alerts and intuitive controls."
          : "Vea un vistazo de nuestro panel integral de monitoreo de salud con alertas en tiempo real y controles intuitivos."}
      </p>
      
      <div 
        className="relative mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-gradient-to-r from-ice-600 to-guardian-700 h-12 flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white/80 rounded-full"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full"></div>
            <div className="w-3 h-3 bg-white/40 rounded-full"></div>
          </div>
          <div className="ml-4 text-white font-medium">
            {language === 'en' ? "ICE Alarm Health Dashboard" : "Panel de Salud ICE Alarm"}
          </div>
        </div>
        
        {/* Dashboard example content */}
        <div className="bg-white p-6" style={{ height: '500px' }}>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card className="shadow-md border-l-4 border-ice-600">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex flex-col mb-4 md:mb-0">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{language === 'en' ? "Wednesday, June 5, 2024" : "Miércoles, 5 de Junio, 2024"}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {language === 'en' ? `Good morning, Maria!` : `¡Buenos días, Maria!`}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {language === 'en' 
                        ? 'Your health metrics are within normal ranges today.'
                        : 'Tus métricas de salud están dentro de rangos normales hoy.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-200 rounded-full text-green-700 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>{language === 'en' ? 'All Systems Normal' : 'Todos los Sistemas Normales'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{language === 'en' ? "Heart Rate" : "Ritmo Cardíaco"}</h3>
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-3xl font-bold">72</span>
                    <span className="text-sm ml-1 text-gray-500">BPM</span>
                  </div>
                  <div className="h-12 flex items-end">
                    <div className="w-1 h-6 bg-gray-200 rounded mx-0.5"></div>
                    <div className="w-1 h-8 bg-gray-200 rounded mx-0.5"></div>
                    <div className="w-1 h-5 bg-gray-200 rounded mx-0.5"></div>
                    <div className="w-1 h-9 bg-red-400 rounded mx-0.5"></div>
                    <div className="w-1 h-7 bg-red-500 rounded mx-0.5"></div>
                    <div className="w-1 h-10 bg-red-400 rounded mx-0.5"></div>
                    <div className="w-1 h-8 bg-gray-200 rounded mx-0.5"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{language === 'en' ? "Blood Pressure" : "Presión Arterial"}</h3>
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">118</span>
                    <span className="text-xl font-bold text-gray-500">/</span>
                    <span className="text-3xl font-bold">75</span>
                    <span className="text-sm ml-1 text-gray-500">mmHg</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {language === 'en' ? "Normal" : "Normal"}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{language === 'en' ? "Glucose Level" : "Nivel de Glucosa"}</h3>
                  <Pill className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-3xl font-bold">103</span>
                    <span className="text-sm ml-1 text-gray-500">mg/dL</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    <span className="text-sm text-green-600">
                      {language === 'en' ? "Stable" : "Estable"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{language === 'en' ? "SOS Device Status" : "Estado del Dispositivo SOS"}</h3>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 pulse"></div>
                    <span className="text-sm font-medium">
                      {language === 'en' ? "Active & Connected" : "Activo y Conectado"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {language === 'en' ? "Battery: 86%" : "Batería: 86%"}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{language === 'en' ? "Notifications" : "Notificaciones"}</h3>
                  <Bell className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm">
                      {language === 'en' ? "No urgent alerts" : "Sin alertas urgentes"}
                    </span>
                  </div>
                  <div className="text-sm text-blue-600 cursor-pointer">
                    {language === 'en' ? "View all" : "Ver todo"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end justify-center pb-10">
          <ButtonCustom 
            size="lg" 
            className={`bg-white text-ice-700 hover:bg-ice-50 transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
            onClick={handleClick}
          >
            <span className="flex items-center">
              {language === 'en' ? "See Our Pricing Plans" : "Ver Nuestros Planes de Precios"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
