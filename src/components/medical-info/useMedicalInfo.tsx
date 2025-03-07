import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useMedicalInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [medicalData, setMedicalData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("conditions");
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Load medical data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('userQuestionnaire');
    if (savedData) {
      setMedicalData(JSON.parse(savedData));
    } else {
      // Display a toast message if no data is found
      toast.info(
        language === 'en'
          ? 'No medical information found. Please complete the questionnaire.'
          : 'No se encontró información médica. Por favor complete el cuestionario.'
      );
    }
  }, [language]);

  const handleSaveChanges = () => {
    setIsLoading(true);
    
    // Save updated data to localStorage
    localStorage.setItem('userQuestionnaire', JSON.stringify(medicalData));
    
    // Simulate API call
    setTimeout(() => {
      toast.success(
        language === 'en' 
          ? "Your changes have been saved successfully!" 
          : "¡Tus cambios se han guardado con éxito!"
      );
      setIsLoading(false);
      setEditMode(false);
    }, 1000);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // Reload data from localStorage to discard changes
    const savedData = localStorage.getItem('userQuestionnaire');
    if (savedData) {
      setMedicalData(JSON.parse(savedData));
    }
    
    toast.info(
      language === 'en'
        ? "Edit mode cancelled. No changes were saved."
        : "Modo de edición cancelado. No se guardaron cambios."
    );
  };

  const handleUpdate = (section: string, field: string, value: string) => {
    if (editMode) {
      setMedicalData((prev: any) => {
        const updated = {...prev};
        if (!updated.health) updated.health = {};
        if (!updated.health[section]) updated.health[section] = field === 'conditions' || field === 'allergies' ? [] : {};
        
        if (Array.isArray(updated.health[section])) {
          // Handle array updates for conditions and allergies
          const index = parseInt(field, 10);
          if (!isNaN(index)) {
            updated.health[section][index] = value;
          }
        } else {
          // Handle object updates for vitals
          updated.health[section][field] = value;
        }
        
        return updated;
      });
    }
  };

  const handleCompleteQuestionnaire = () => {
    // Keep within dashboard by navigating to dashboard/onboarding
    navigate("/dashboard/onboarding");
  };

  return {
    editMode,
    setEditMode,
    isLoading,
    medicalData,
    activeTab,
    setActiveTab,
    handleSaveChanges,
    handleCancelEdit,
    handleUpdate,
    handleCompleteQuestionnaire
  };
};
