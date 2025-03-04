
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MedicationReminderProps {
  medication: {
    id: number;
    name: string;
    dosage: string;
    time: string;
    taken?: boolean;
  };
  onMarkTaken: (id: number) => void;
}

const MedicationReminderCard: React.FC<MedicationReminderProps> = ({ 
  medication, 
  onMarkTaken 
}) => {
  const { language } = useLanguage();
  
  return (
    <Card className="mb-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>{medication.name} ({medication.dosage})</span>
          {medication.taken ? (
            <span className="text-green-500 flex items-center text-xs">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              {language === 'en' ? 'Taken' : 'Tomado'}
            </span>
          ) : (
            <span className="text-amber-500 flex items-center text-xs">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {language === 'en' ? 'Due' : 'Pendiente'}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3 pt-0">
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">{medication.time}</p>
          {!medication.taken && (
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs"
              onClick={() => onMarkTaken(medication.id)}
            >
              {language === 'en' ? 'Mark as Taken' : 'Marcar como Tomado'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationReminderCard;
