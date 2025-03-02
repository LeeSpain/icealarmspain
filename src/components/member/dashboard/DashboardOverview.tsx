
import React from "react";
import { Activity, Bell, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MetricCard } from "./MetricCard";

export const DashboardOverview: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <MetricCard 
        title={language === 'en' ? "Active Devices" : "Dispositivos Activos"} 
        value="2" 
        icon={<Activity size={18} />} 
      />
      <MetricCard 
        title={language === 'en' ? "Alert Status" : "Estado de Alerta"} 
        value={language === 'en' ? "All Clear" : "Todo Bien"} 
        icon={<Bell size={18} />} 
      />
      <MetricCard 
        title={language === 'en' ? "Next Check-up" : "Próxima Revisión"} 
        value="17/03/2025" 
        icon={<AlertTriangle size={18} />} 
        status="warning"
        description={language === 'en' ? "Scheduled" : "Programado"}
      />
    </div>
  );
};
