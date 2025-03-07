
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PillIcon, PlusCircle, Trash2, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MedicationsTabContentProps {
  editMode: boolean;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  timings: string;
  startDate: string;
  endDate?: string;
}

const MedicationsTabContent: React.FC<MedicationsTabContentProps> = ({ editMode }) => {
  const { language } = useLanguage();
  
  // Initialize medications from local storage or questionnaire data
  const [medications, setMedications] = useState<Medication[]>(() => {
    const savedQuestionnaire = localStorage.getItem('userQuestionnaire');
    if (savedQuestionnaire) {
      const parsedData = JSON.parse(savedQuestionnaire);
      
      // If we have medication entries in the questionnaire, use them
      if (parsedData.multiEntries?.medications) {
        return parsedData.multiEntries.medications.map((med: any) => ({
          id: med._id || `med_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: med.medicationName || "",
          dosage: med.dosage || "",
          frequency: med.frequency || "",
          purpose: med.purpose || "",
          timings: med.timings || "",
          startDate: med.startDate || "",
          endDate: med.endDate || ""
        }));
      }
    }
    
    // Default empty array if no data found
    return [];
  });
  
  // Function to add a new medication
  const addMedication = () => {
    if (!editMode) return;
    
    const newMedication: Medication = {
      id: `med_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: "",
      dosage: "",
      frequency: "",
      purpose: "",
      timings: "",
      startDate: new Date().toISOString().split('T')[0]
    };
    
    setMedications([...medications, newMedication]);
  };
  
  // Function to remove a medication
  const removeMedication = (id: string) => {
    if (!editMode) return;
    setMedications(medications.filter(med => med.id !== id));
  };
  
  // Function to update a medication
  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    if (!editMode) return;
    
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'}
        </h3>
        
        {editMode && (
          <Button 
            onClick={addMedication} 
            className="bg-ice-600 hover:bg-ice-700"
          >
            <PlusCircle size={16} className="mr-2" />
            {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
          </Button>
        )}
      </div>
      
      {medications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <PillIcon size={48} className="text-gray-300 mb-4" />
            <p className="text-lg text-gray-500 mb-2">
              {language === 'en' ? 'No medications added yet' : 'No hay medicamentos añadidos aún'}
            </p>
            <p className="text-sm text-gray-400 text-center max-w-md">
              {language === 'en'
                ? 'Add your current medications to help emergency responders provide appropriate care.'
                : 'Añada sus medicamentos actuales para ayudar a los servicios de emergencia a proporcionar la atención adecuada.'}
            </p>
            
            {editMode && (
              <Button 
                onClick={addMedication} 
                variant="outline" 
                className="mt-4"
              >
                <PlusCircle size={16} className="mr-2" />
                {language === 'en' ? 'Add Your First Medication' : 'Añadir Su Primer Medicamento'}
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {medications.map((medication) => (
            <Card key={medication.id} className="border-l-4 border-ice-500">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <PillIcon size={18} className="text-ice-600 mr-2" />
                    {editMode ? (
                      <Input
                        value={medication.name}
                        onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                        placeholder={language === 'en' ? "Medication name" : "Nombre del medicamento"}
                        className="font-semibold border-0 p-0 h-auto text-lg focus-visible:ring-0"
                      />
                    ) : (
                      <CardTitle>{medication.name || "-"}</CardTitle>
                    )}
                  </div>
                  
                  {editMode && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMedication(medication.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-ice-50">
                    {medication.dosage || (language === 'en' ? "No dosage" : "Sin dosis")}
                  </Badge>
                  <Badge variant="outline" className="bg-ice-50">
                    {medication.frequency || (language === 'en' ? "No frequency" : "Sin frecuencia")}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {editMode ? (
                    <>
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Dosage' : 'Dosis'}
                        </Label>
                        <Input
                          value={medication.dosage}
                          onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                          placeholder={language === 'en' ? "e.g. 5mg" : "ej. 5mg"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Frequency' : 'Frecuencia'}
                        </Label>
                        <Input
                          value={medication.frequency}
                          onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                          placeholder={language === 'en' ? "e.g. Twice daily" : "ej. Dos veces al día"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Purpose' : 'Propósito'}
                        </Label>
                        <Input
                          value={medication.purpose}
                          onChange={(e) => updateMedication(medication.id, 'purpose', e.target.value)}
                          placeholder={language === 'en' ? "What it's for" : "Para qué sirve"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Timing' : 'Horario'}
                        </Label>
                        <Input
                          value={medication.timings}
                          onChange={(e) => updateMedication(medication.id, 'timings', e.target.value)}
                          placeholder={language === 'en' ? "e.g. Morning and evening" : "ej. Mañana y noche"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Start Date' : 'Fecha de Inicio'}
                        </Label>
                        <Input
                          type="date"
                          value={medication.startDate}
                          onChange={(e) => updateMedication(medication.id, 'startDate', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'End Date (optional)' : 'Fecha de Fin (opcional)'}
                        </Label>
                        <Input
                          type="date"
                          value={medication.endDate || ""}
                          onChange={(e) => updateMedication(medication.id, 'endDate', e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <PillIcon size={18} className="text-ice-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {language === 'en' ? 'Purpose' : 'Propósito'}
                          </p>
                          <p className="text-gray-600">{medication.purpose || "-"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <Clock size={18} className="text-ice-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {language === 'en' ? 'Timing' : 'Horario'}
                          </p>
                          <p className="text-gray-600">{medication.timings || "-"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <Calendar size={18} className="text-ice-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {language === 'en' ? 'Start Date' : 'Fecha de Inicio'}
                          </p>
                          <p className="text-gray-600">{medication.startDate || "-"}</p>
                        </div>
                      </div>
                      
                      {medication.endDate && (
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                            <Calendar size={18} className="text-ice-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {language === 'en' ? 'End Date' : 'Fecha de Fin'}
                            </p>
                            <p className="text-gray-600">{medication.endDate}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicationsTabContent;
