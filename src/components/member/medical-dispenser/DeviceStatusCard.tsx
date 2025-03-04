
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";

interface MedicationSummary {
  name: string;
  schedule: string;
  remaining: number;
  total: number;
}

interface DeviceStatusCardProps {
  medications: MedicationSummary[];
}

const DeviceStatusCard: React.FC<DeviceStatusCardProps> = ({ medications }) => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Current status and information about your Medical Dispenser' 
            : 'Estado actual e información sobre tu Dispensador Médico'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Status' : 'Estado'}</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-green-600">{language === 'en' ? 'Active' : 'Activo'}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Connection' : 'Conexión'}</span>
            <span className="text-sm">{language === 'en' ? 'Online' : 'En línea'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Last Sync' : 'Última Sincronización'}</span>
            <span className="text-sm">{language === 'en' ? '15 minutes ago' : 'Hace 15 minutos'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Next Dose' : 'Próxima Dosis'}</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold">20:00 - Metformin, Atorvastatin</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">{language === 'en' ? 'Medication Overview' : 'Resumen de Medicamentos'}</h3>
          
          {medications.map((med, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{med.name}</span>
                <span className="text-xs text-muted-foreground">{med.remaining} / {med.total} {language === 'en' ? 'remaining' : 'restantes'}</span>
              </div>
              <Progress value={(med.remaining / med.total) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceStatusCard;
