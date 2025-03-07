
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Save, X, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MedicalInfoHeaderProps {
  editMode: boolean;
  isLoading: boolean;
  medicalData: any;
  setEditMode: (value: boolean) => void;
  handleSaveChanges: () => void;
  handleCancelEdit: () => void;
  handleCompleteQuestionnaire: () => void;
}

const MedicalInfoHeader: React.FC<MedicalInfoHeaderProps> = ({
  editMode,
  isLoading,
  medicalData,
  setEditMode,
  handleSaveChanges,
  handleCancelEdit,
  handleCompleteQuestionnaire
}) => {
  const { language } = useLanguage();

  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-ice-800 mb-2">
          {language === 'en' ? 'Medical Information' : 'Información Médica'}
        </h1>
        <p className="text-ice-700">
          {language === 'en' 
            ? 'Your comprehensive medical information for healthcare providers' 
            : 'Tu información médica completa para los proveedores de atención médica'}
        </p>
      </div>
      
      <div className="flex space-x-2">
        {!medicalData ? (
          <Button
            className="flex items-center gap-1 bg-ice-600 hover:bg-ice-700"
            onClick={handleCompleteQuestionnaire}
          >
            {language === 'en' ? 'Complete Questionnaire' : 'Completar Cuestionario'}
          </Button>
        ) : editMode ? (
          <>
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={handleCancelEdit}
            >
              <X size={16} />
              {language === 'en' ? 'Cancel' : 'Cancelar'}
            </Button>
            <Button
              className="flex items-center gap-1 bg-ice-600 hover:bg-ice-700"
              onClick={handleSaveChanges}
              disabled={isLoading}
            >
              {isLoading ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {language === 'en' ? 'Save Changes' : 'Guardar Cambios'}
            </Button>
          </>
        ) : (
          <Button
            className="flex items-center gap-1 bg-ice-600 hover:bg-ice-700"
            onClick={() => setEditMode(true)}
          >
            <Edit size={16} />
            {language === 'en' ? 'Edit Information' : 'Editar Información'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MedicalInfoHeader;
