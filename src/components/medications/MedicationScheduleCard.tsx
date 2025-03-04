
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MedicationScheduleProps {
  medications: Array<{
    id: number;
    name: string;
    dosage: string;
    schedule: {
      morning?: string;
      afternoon?: string;
      evening?: string;
    };
    days: string[];
  }>;
}

const MedicationScheduleCard: React.FC<MedicationScheduleProps> = ({ medications }) => {
  const { language } = useLanguage();
  const daysOfWeek = language === 'en' 
    ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    : ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-ice-500" />
          <CardTitle>
            {language === 'en' ? 'Weekly Schedule' : 'Horario Semanal'}
          </CardTitle>
        </div>
        <CardDescription>
          {language === 'en' 
            ? 'Your medication schedule for the week' 
            : 'Tu horario de medicamentos para la semana'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'en' ? 'Medication' : 'Medicamento'}</TableHead>
                {daysOfWeek.map((day, index) => (
                  <TableHead key={index}>{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((med) => (
                <TableRow key={med.id}>
                  <TableCell className="font-medium">
                    {med.name} ({med.dosage})
                  </TableCell>
                  {daysOfWeek.map((_, dayIndex) => (
                    <TableCell key={dayIndex}>
                      {med.days.includes(dayIndex.toString()) ? (
                        <div className="space-y-1">
                          {med.schedule.morning && (
                            <div className="text-xs">{med.schedule.morning}</div>
                          )}
                          {med.schedule.afternoon && (
                            <div className="text-xs">{med.schedule.afternoon}</div>
                          )}
                          {med.schedule.evening && (
                            <div className="text-xs">{med.schedule.evening}</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationScheduleCard;
