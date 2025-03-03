
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { MultiEntry } from "@/components/questionnaire/types";

interface DoctorsTabProps {
  doctors: MultiEntry[];
  onAddDoctor: () => void;
  onRemoveDoctor: (id: string) => void;
  onDoctorChange: (field: string, entryId: string, key: string, value: string) => void;
  language: string;
}

const DoctorsTab: React.FC<DoctorsTabProps> = ({
  doctors,
  onAddDoctor,
  onRemoveDoctor,
  onDoctorChange,
  language
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            {language === 'en' ? 'Doctors & Healthcare Providers' : 'Médicos y Proveedores de Salud'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Your healthcare team and their contact information' 
              : 'Su equipo médico y su información de contacto'}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddDoctor}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          {language === 'en' ? 'Add Doctor' : 'Añadir Médico'}
        </Button>
      </CardHeader>
      <CardContent>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">
                  {doctor.name || (language === 'en' ? 'New Doctor' : 'Nuevo Médico')}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveDoctor(doctor._id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Name' : 'Nombre'}
                  </Label>
                  <Input
                    value={doctor.name || ''}
                    onChange={(e) => onDoctorChange('doctors', doctor._id, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Specialty' : 'Especialidad'}
                  </Label>
                  <Input
                    value={doctor.specialty || ''}
                    onChange={(e) => onDoctorChange('doctors', doctor._id, 'specialty', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Phone' : 'Teléfono'}
                  </Label>
                  <Input
                    value={doctor.phone || ''}
                    onChange={(e) => onDoctorChange('doctors', doctor._id, 'phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Address' : 'Dirección'}
                  </Label>
                  <Input
                    value={doctor.address || ''}
                    onChange={(e) => onDoctorChange('doctors', doctor._id, 'address', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            {language === 'en' 
              ? 'No healthcare providers added yet.' 
              : 'Aún no se han añadido proveedores de salud.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorsTab;
