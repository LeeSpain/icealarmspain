
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pill } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MedicationStatusProps {
  medications: Array<{
    id: number;
    name: string;
    remaining: number;
    total: number;
  }>;
}

const MedicationStatusCard: React.FC<MedicationStatusProps> = ({ medications }) => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Pill className="h-5 w-5 text-ice-500" />
          {language === 'en' ? 'Medication Inventory' : 'Inventario de Medicamentos'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((med) => (
            <div key={med.id} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{med.name}</span>
                <span className="text-xs text-muted-foreground">
                  {med.remaining} / {med.total} {language === 'en' ? 'remaining' : 'restantes'}
                </span>
              </div>
              <Progress 
                value={(med.remaining / med.total) * 100} 
                className="h-2" 
                color={med.remaining < med.total * 0.2 ? "bg-red-500" : undefined}
              />
              {med.remaining < med.total * 0.2 && (
                <p className="text-xs text-red-500 mt-1">
                  {language === 'en' ? 'Low supply - refill soon' : 'Suministro bajo - rellenar pronto'}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationStatusCard;
