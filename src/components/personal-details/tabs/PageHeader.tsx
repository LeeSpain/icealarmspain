
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Edit, Save, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  editMode: boolean;
  isLoading: boolean;
  onEditToggle: () => void;
  onSaveChanges: () => void;
  onCancelEdit: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  editMode,
  isLoading,
  onEditToggle,
  onSaveChanges,
  onCancelEdit
}) => {
  const { language } = useLanguage();

  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-ice-800 mb-2">
          {language === 'en' ? 'Personal Details' : 'Datos Personales'}
        </h1>
        <p className="text-ice-700">
          {language === 'en' 
            ? 'Your complete profile information for emergency services' 
            : 'Tu información completa de perfil para servicios de emergencia'}
        </p>
      </div>
      
      <div className="flex space-x-2">
        {editMode ? (
          <>
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={onCancelEdit}
            >
              <X size={16} />
              {language === 'en' ? 'Cancel' : 'Cancelar'}
            </Button>
            <Button
              className="flex items-center gap-1 bg-ice-600 hover:bg-ice-700"
              onClick={onSaveChanges}
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
            onClick={onEditToggle}
          >
            <Edit size={16} />
            {language === 'en' ? 'Edit Information' : 'Editar Información'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
