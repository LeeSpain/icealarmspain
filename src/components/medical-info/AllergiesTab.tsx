
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { EmptyDataState } from "./MedicalConditionsTab";

interface AllergiesTabProps {
  editMode: boolean;
  medicalData: any;
  onUpdate: (section: string, field: string, value: string) => void;
}

const AllergiesTab: React.FC<AllergiesTabProps> = ({ 
  editMode, 
  medicalData, 
  onUpdate 
}) => {
  const { language } = useLanguage();
  
  if (!medicalData || !medicalData.health || !medicalData.health.allergies) {
    return <EmptyDataState type="allergies" />;
  }
  
  const allergies = medicalData.health.allergies || [];
  
  return (
    <Card>
      <CardContent className="p-6">
        {allergies.length > 0 ? (
          <div className="space-y-4">
            {allergies.map((allergy: string, index: number) => (
              <div key={index} className="p-3 bg-white border rounded-md shadow-sm">
                {editMode ? (
                  <input 
                    type="text" 
                    defaultValue={allergy} 
                    className="w-full p-2 border rounded" 
                    onChange={(e) => onUpdate('allergies', index.toString(), e.target.value)}
                  />
                ) : (
                  <p>{allergy}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyDataState type="allergies" />
        )}
      </CardContent>
    </Card>
  );
};

export default AllergiesTab;
