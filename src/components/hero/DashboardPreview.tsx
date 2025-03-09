
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, Heart, Shield, AlertCircle } from "lucide-react";

interface DashboardPreviewProps {
  language: string;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ language }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    console.log("Dashboard preview button clicked, redirecting to login");
    navigate('/login');
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
          ? "See how easily you can monitor your health data and manage your devices from our intuitive dashboard."
          : "Vea cómo puede monitorear fácilmente sus datos de salud y administrar sus dispositivos desde nuestro panel intuitivo."}
      </p>
      
      <div 
        className="relative mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-gradient-to-r from-ice-500 to-guardian-600 h-8 flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-70"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
          </div>
        </div>
        
        {/* Dashboard example content */}
        <div className="bg-ice-50/30 p-6" style={{ height: '450px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-3 shadow-md border-l-4 border-ice-600">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex flex-col mb-4 md:mb-0">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{language === 'en' ? "Wednesday, June 5, 2024" : "Miércoles, 5 de Junio, 2024"}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {language === 'en' ? `Welcome back, John!` : `¡Bienvenido de nuevo, John!`}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {language === 'en' 
                        ? 'Here\'s a summary of your ICE Alarm account.'
                        : 'Aquí tienes un resumen de tu cuenta de ICE Alarm.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{language === 'en' ? "SOS Status" : "Estado SOS"}</h3>
                  <Shield className="h-5 w-5 text-ice-600" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-green-600">
                    {language === 'en' ? "Active & Protected" : "Activo y Protegido"}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{language === 'en' ? "Heart Rate" : "Ritmo Cardíaco"}</h3>
                  <Heart className="h-5 w-5 text-ice-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">72</span>
                  <span className="text-sm text-gray-500">BPM</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{language === 'en' ? "Notifications" : "Notificaciones"}</h3>
                  <Bell className="h-5 w-5 text-ice-600" />
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-ice-500" />
                  <span className="text-sm">
                    {language === 'en' ? "2 new alerts" : "2 alertas nuevas"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
          <ButtonCustom 
            size="lg" 
            className={`bg-white text-ice-700 hover:bg-ice-50 transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
            onClick={handleClick}
          >
            <span className="flex items-center">
              {language === 'en' ? "Try The Dashboard" : "Pruebe El Panel"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
