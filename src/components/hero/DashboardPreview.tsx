
import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, Heart, Shield, Activity, Calendar, Pill, User, Clock } from "lucide-react";

interface DashboardPreviewProps {
  language: string;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ language }) => {
  const navigate = useNavigate();
  
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
          ? "Get a glimpse of our intuitive health monitoring dashboard with real-time alerts and device management."
          : "Vea un vistazo de nuestro panel intuitivo de monitoreo de salud con alertas en tiempo real y gestión de dispositivos."}
      </p>
      
      <div className="relative mx-auto max-w-5xl rounded-xl shadow-md border border-gray-200 overflow-hidden bg-white">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-ice-500 to-guardian-600 h-14 flex items-center px-6">
          <div className="flex items-center space-x-3 text-white">
            <div className="font-semibold">
              {language === 'en' ? "ICE Alarm Health Dashboard" : "Panel de Salud ICE Alarm"}
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="h-5 w-5 text-white/80" />
            <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="bg-white p-6" style={{ height: '450px' }}>
          {/* Welcome Card */}
          <Card className="shadow-sm border-l-4 border-ice-500 mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{language === 'en' ? "Monday, August 5, 2024" : "Lunes, 5 de Agosto, 2024"}</span>
                  </div>
                  <h3 className="text-xl font-semibold">
                    {language === 'en' ? "Welcome back, Elena" : "Bienvenida de nuevo, Elena"}
                  </h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  <span>{language === 'en' ? 'All Systems Normal' : 'Todos los Sistemas Normales'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Heart Rate" : "Ritmo Cardíaco"}</h3>
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">72</span>
                    <span className="text-sm ml-1 text-gray-500">BPM</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    {language === 'en' ? "Normal" : "Normal"}
                  </div>
                </div>
                <div className="mt-2 h-8 w-full flex items-end">
                  {[4, 5, 3, 6, 7, 5, 4, 5, 6, 5, 4, 3].map((h, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 mx-0.5 rounded-t ${i === 6 || i === 7 ? 'bg-red-400' : 'bg-gray-200'}`} 
                      style={{ height: `${h * 4}px` }}
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Blood Pressure" : "Presión Arterial"}</h3>
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-2xl font-bold">118/75</span>
                    <span className="text-sm ml-1 text-gray-500">mmHg</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    {language === 'en' ? "Optimal" : "Óptima"}
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Glucose Level" : "Nivel de Glucosa"}</h3>
                  <Pill className="h-4 w-4 text-purple-500" />
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-2xl font-bold">103</span>
                    <span className="text-sm ml-1 text-gray-500">mg/dL</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full flex items-center">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></span>
                    {language === 'en' ? "Stable" : "Estable"}
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Device Status & Medication */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Active Devices" : "Dispositivos Activos"}</h3>
                  <Shield className="h-4 w-4 text-ice-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">{language === 'en' ? "SOS Pendant" : "Colgante SOS"}</span>
                    </div>
                    <span className="text-xs text-gray-500">{language === 'en' ? "Battery: 86%" : "Batería: 86%"}</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">{language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa"}</span>
                    </div>
                    <span className="text-xs text-gray-500">{language === 'en' ? "Connected" : "Conectado"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Medication Reminder" : "Recordatorio de Medicación"}</h3>
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded p-2 flex items-center">
                  <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <Pill className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{language === 'en' ? "Blood Pressure Medication" : "Medicación para la Presión"}</p>
                    <p className="text-xs text-gray-500">{language === 'en' ? "Next dose: 2:00 PM" : "Próxima dosis: 14:00"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Dashboard Footer with Button */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
          <ButtonCustom 
            size="lg" 
            onClick={handleClick}
            className="bg-ice-600 hover:bg-ice-700 text-white transition-colors"
          >
            <span className="flex items-center">
              {language === 'en' ? "See Pricing Plans" : "Ver Planes de Precios"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
