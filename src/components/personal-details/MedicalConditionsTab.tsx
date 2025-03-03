
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { MultiEntry } from "@/components/questionnaire/types";

interface MedicalConditionsTabProps {
  conditions: MultiEntry[];
  allergies: MultiEntry[];
  onAddCondition: () => void;
  onRemoveCondition: (id: string) => void;
  onConditionChange: (field: string, entryId: string, key: string, value: string) => void;
  onAddAllergy: () => void;
  onRemoveAllergy: (id: string) => void;
  onAllergyChange: (field: string, entryId: string, key: string, value: string) => void;
  language: string;
}

const MedicalConditionsTab: React.FC<MedicalConditionsTabProps> = ({
  conditions,
  allergies,
  onAddCondition,
  onRemoveCondition,
  onConditionChange,
  onAddAllergy,
  onRemoveAllergy,
  onAllergyChange,
  language
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Your health conditions and diagnoses' 
                : 'Sus condiciones de salud y diagnósticos'}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddCondition}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Add Condition' : 'Añadir Condición'}
          </Button>
        </CardHeader>
        <CardContent>
          {conditions.length > 0 ? (
            conditions.map((condition) => (
              <div key={condition._id} className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium">
                    {condition.condition || (language === 'en' ? 'New Condition' : 'Nueva Condición')}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveCondition(condition._id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      {language === 'en' ? 'Condition' : 'Condición'}
                    </Label>
                    <Input
                      value={condition.condition || ''}
                      onChange={(e) => onConditionChange('medical_conditions', condition._id, 'condition', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {language === 'en' ? 'Year Diagnosed' : 'Año de Diagnóstico'}
                    </Label>
                    <Input
                      value={condition.diagnosedYear || ''}
                      onChange={(e) => onConditionChange('medical_conditions', condition._id, 'diagnosedYear', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {language === 'en' ? 'Severity' : 'Gravedad'}
                    </Label>
                    <Input
                      value={condition.severity || ''}
                      onChange={(e) => onConditionChange('medical_conditions', condition._id, 'severity', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {language === 'en' ? 'Treatment' : 'Tratamiento'}
                    </Label>
                    <Input
                      value={condition.treatment || ''}
                      onChange={(e) => onConditionChange('medical_conditions', condition._id, 'treatment', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {language === 'en' 
                ? 'No medical conditions added yet.' 
                : 'Aún no se han añadido condiciones médicas.'}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {language === 'en' ? 'Allergies' : 'Alergias'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Your allergies and adverse reactions' 
                : 'Sus alergias y reacciones adversas'}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddAllergy}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Add Allergy' : 'Añadir Alergia'}
          </Button>
        </CardHeader>
        <CardContent>
          {allergies.length > 0 ? (
            allergies.map((allergy) => (
              <div key={allergy._id} className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium">
                    {allergy.allergen || (language === 'en' ? 'New Allergy' : 'Nueva Alergia')}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveAllergy(allergy._id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>
                      {language === 'en' ? 'Allergen' : 'Alérgeno'}
                    </Label>
                    <Input
                      value={allergy.allergen || ''}
                      onChange={(e) => onAllergyChange('allergies', allergy._id, 'allergen', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {language === 'en' ? 'Reaction' : 'Reacción'}
                    </Label>
                    <Input
                      value={allergy.reaction || ''}
                      onChange={(e) => onAllergyChange('allergies', allergy._id, 'reaction', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {language === 'en' ? 'Severity' : 'Gravedad'}
                    </Label>
                    <Input
                      value={allergy.severity || ''}
                      onChange={(e) => onAllergyChange('allergies', allergy._id, 'severity', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {language === 'en' 
                ? 'No allergies added yet.' 
                : 'Aún no se han añadido alergias.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalConditionsTab;
