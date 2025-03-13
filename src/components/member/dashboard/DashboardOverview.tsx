
import React from "react";
import { Activity, Bell, AlertTriangle, Battery, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MetricCard } from "./MetricCard";

export const DashboardOverview: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard 
        title={language === 'en' ? "Active Devices" : "Dispositivos Activos"} 
        value="3" 
        icon={<Activity size={18} className="text-blue-500" />} 
        trend="+1"
        trendDirection="up"
        status="normal"
      />
      <MetricCard 
        title={language === 'en' ? "System Status" : "Estado del Sistema"} 
        value={language === 'en' ? "Protected" : "Protegido"} 
        icon={<Shield size={18} className="text-green-500" />} 
        status="success"
      />
      <MetricCard 
        title={language === 'en' ? "Battery Level" : "Nivel de Batería"} 
        value="92%" 
        icon={<Battery size={18} className="text-yellow-500" />} 
        status="warning"
        description={language === 'en' ? "SOS Pendant" : "Colgante SOS"}
      />
      <MetricCard 
        title={language === 'en' ? "Next Check-up" : "Próxima Revisión"} 
        value="March 17" 
        icon={<AlertTriangle size={18} className="text-purple-500" />} 
        description={language === 'en' ? "Scheduled" : "Programado"}
        status="normal"
      />
    </div>
  );
};
