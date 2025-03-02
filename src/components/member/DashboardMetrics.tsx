
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Activity, Heart, BarChart3, Pill, Battery, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  progress?: number;
  progressColor?: string;
  status?: 'normal' | 'warning' | 'alert';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  progress,
  progressColor = 'bg-ice-500',
  status = 'normal' 
}) => {
  const statusClasses = {
    normal: "text-green-600",
    warning: "text-amber-600",
    alert: "text-red-600"
  };
  
  return (
    <Card className="p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm font-medium text-gray-700">{title}</div>
        <div className={`p-2 rounded-full ${status === 'normal' ? 'bg-ice-50 text-ice-600' : status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {description && (
        <div className={`text-xs ${statusClasses[status]}`}>
          {description}
        </div>
      )}
      {progress !== undefined && (
        <Progress 
          value={progress} 
          className="h-1.5 mt-4" 
          indicatorClassName={progressColor}
        />
      )}
    </Card>
  );
};

const DashboardMetrics: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'Health & Device Metrics' : 'Métricas de Salud y Dispositivos'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard 
          title={language === 'en' ? "Glucose Level" : "Nivel de Glucosa"}
          value="124 mg/dL" 
          icon={<Activity size={20} />}
          description={language === 'en' ? "Within normal range" : "Dentro del rango normal"}
          progress={75}
          progressColor="bg-green-500"
          status="normal"
        />
        
        <MetricCard 
          title={language === 'en' ? "Heart Rate" : "Ritmo Cardíaco"}
          value="72 bpm" 
          icon={<Heart size={20} />}
          description={language === 'en' ? "Resting" : "En reposo"}
          progress={62}
          progressColor="bg-ice-500"
          status="normal"
        />
        
        <MetricCard 
          title={language === 'en' ? "Blood Pressure" : "Presión Arterial"}
          value="120/80 mmHg" 
          icon={<BarChart3 size={20} />}
          description={language === 'en' ? "Optimal" : "Óptima"}
          progress={80}
          progressColor="bg-green-500"
          status="normal"
        />
        
        <MetricCard 
          title={language === 'en' ? "Medication" : "Medicación"}
          value={language === 'en' ? "Next: 2:00 PM" : "Próxima: 14:00"} 
          icon={<Pill size={20} />}
          description={language === 'en' ? "2 pills remaining today" : "2 píldoras restantes hoy"}
          progress={66}
          progressColor="bg-amber-500"
          status="warning"
        />
        
        <MetricCard 
          title={language === 'en' ? "SOS Pendant" : "Colgante SOS"}
          value={language === 'en' ? "Active" : "Activo"} 
          icon={<Battery size={20} />}
          description={language === 'en' ? "Battery: 92%" : "Batería: 92%"}
          progress={92}
          progressColor="bg-green-500"
          status="normal"
        />
        
        <MetricCard 
          title={language === 'en' ? "Next Check-up" : "Próximo Chequeo"}
          value="24/05/2024" 
          icon={<AlertTriangle size={20} />}
          description={language === 'en' ? "In 14 days" : "En 14 días"}
          progress={30}
          status="normal"
        />
      </div>
    </div>
  );
};

export default DashboardMetrics;
