
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { MultiEntry } from "@/components/questionnaire/types";

interface MedicationsTabProps {
  medications: MultiEntry[];
  onAddMedication: () => void;
  onRemoveMedication: (id: string) => void;
  onMedicationChange: (field: string, entryId: string, key: string, value: string) => void;
  language: string;
}

const MedicationsTab: React.FC<MedicationsTabProps> = ({
  medications,
  onAddMedication,
  onRemoveMedication,
  onMedicationChange,
  language
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            {language === 'en' ? 'Medications' : 'Medicamentos'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Your current medications and supplements' 
              : 'Sus medicamentos y suplementos actuales'}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddMedication}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
        </Button>
      </CardHeader>
      <CardContent>
        {medications.length > 0 ? (
          medications.map((medication) => (
            <div key={medication._id} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">
                  {medication.name || (language === 'en' ? 'New Medication' : 'Nuevo Medicamento')}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveMedication(medication._id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Name' : 'Nombre'}
                  </Label>
                  <Input
                    value={medication.name || ''}
                    onChange={(e) => onMedicationChange('medications', medication._id, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Dosage' : 'Dosis'}
                  </Label>
                  <Input
                    value={medication.dosage || ''}
                    onChange={(e) => onMedicationChange('medications', medication._id, 'dosage', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Frequency' : 'Frecuencia'}
                  </Label>
                  <Input
                    value={medication.frequency || ''}
                    onChange={(e) => onMedicationChange('medications', medication._id, 'frequency', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Purpose' : 'Propósito'}
                  </Label>
                  <Input
                    value={medication.purpose || ''}
                    onChange={(e) => onMedicationChange('medications', medication._id, 'purpose', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            {language === 'en' 
              ? 'No medications added yet.' 
              : 'Aún no se han añadido medicamentos.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicationsTab;
