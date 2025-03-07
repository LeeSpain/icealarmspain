
import React, { useState, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import { Heart, Activity, PillIcon, Edit, Save, X, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardMedicalInfoPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("conditions");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [medicalData, setMedicalData] = useState<any>(null);
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
    navigate("/onboarding");
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="medical-info"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
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
          
          {!medicalData ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500 mb-4">
                  {language === 'en' 
                    ? 'No medical information found. Please complete the health questionnaire to see your data here.' 
                    : 'No se encontró información médica. Por favor complete el cuestionario de salud para ver sus datos aquí.'}
                </p>
                <Button 
                  className="bg-ice-600 hover:bg-ice-700"
                  onClick={handleCompleteQuestionnaire}
                >
                  {language === 'en' ? 'Complete Questionnaire' : 'Completar Cuestionario'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-white border mb-6 p-0 h-auto">
                <TabsTrigger
                  value="conditions"
                  className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}
                </TabsTrigger>
                <TabsTrigger
                  value="vitals"
                  className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Vital Records' : 'Registros Vitales'}
                </TabsTrigger>
                <TabsTrigger
                  value="allergies"
                  className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
                >
                  <PillIcon className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Allergies' : 'Alergias'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="conditions" className="mt-0">
                <MedicalConditionsTab 
                  editMode={editMode} 
                  medicalData={medicalData}
                  onUpdate={handleUpdate}
                />
              </TabsContent>
              
              <TabsContent value="vitals" className="mt-0">
                <VitalsTab 
                  editMode={editMode} 
                  medicalData={medicalData}
                  onUpdate={handleUpdate}
                />
              </TabsContent>
              
              <TabsContent value="allergies" className="mt-0">
                <AllergiesTab 
                  editMode={editMode} 
                  medicalData={medicalData}
                  onUpdate={handleUpdate}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

// Medical Conditions Tab
interface TabProps {
  editMode: boolean;
  medicalData: any;
  onUpdate: (section: string, field: string, value: string) => void;
}

const MedicalConditionsTab: React.FC<TabProps> = ({ editMode, medicalData, onUpdate }) => {
  const { language } = useLanguage();
  
  if (!medicalData || !medicalData.health || !medicalData.health.conditions) {
    return <EmptyDataState type="conditions" />;
  }
  
  const conditions = medicalData.health.conditions || [];
  
  return (
    <Card>
      <CardContent className="p-6">
        {conditions.length > 0 ? (
          <div className="space-y-4">
            {conditions.map((condition: string, index: number) => (
              <div key={index} className="p-3 bg-white border rounded-md shadow-sm">
                {editMode ? (
                  <input 
                    type="text" 
                    defaultValue={condition} 
                    className="w-full p-2 border rounded" 
                    onChange={(e) => onUpdate('conditions', index.toString(), e.target.value)}
                  />
                ) : (
                  <p>{condition}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyDataState type="conditions" />
        )}
      </CardContent>
    </Card>
  );
};

// Vitals Tab
const VitalsTab: React.FC<TabProps> = ({ editMode, medicalData, onUpdate }) => {
  const { language } = useLanguage();
  
  if (!medicalData || !medicalData.health) {
    return <EmptyDataState type="vitals" />;
  }
  
  const vitals = {
    bloodType: medicalData.health.bloodType || '-',
    weight: medicalData.health.weight || '-',
    height: medicalData.health.height || '-',
    bloodPressure: medicalData.health.bloodPressure || '-'
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField 
            label={language === 'en' ? 'Blood Type' : 'Tipo de Sangre'}
            value={vitals.bloodType}
            editMode={editMode}
            onChange={(value) => onUpdate('vitals', 'bloodType', value)}
          />
          <InfoField 
            label={language === 'en' ? 'Weight' : 'Peso'}
            value={vitals.weight}
            editMode={editMode}
            onChange={(value) => onUpdate('vitals', 'weight', value)}
          />
          <InfoField 
            label={language === 'en' ? 'Height' : 'Altura'}
            value={vitals.height}
            editMode={editMode}
            onChange={(value) => onUpdate('vitals', 'height', value)}
          />
          <InfoField 
            label={language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}
            value={vitals.bloodPressure}
            editMode={editMode}
            onChange={(value) => onUpdate('vitals', 'bloodPressure', value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Allergies Tab
const AllergiesTab: React.FC<TabProps> = ({ editMode, medicalData, onUpdate }) => {
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

// Empty State Component
const EmptyDataState: React.FC<{type: 'conditions' | 'vitals' | 'allergies'}> = ({ type }) => {
  const { language } = useLanguage();
  
  const messages = {
    conditions: {
      en: 'No medical conditions recorded. Please complete the health questionnaire.',
      es: 'No hay condiciones médicas registradas. Por favor complete el cuestionario de salud.'
    },
    vitals: {
      en: 'No vital records available. Please complete the health questionnaire.',
      es: 'No hay registros vitales disponibles. Por favor complete el cuestionario de salud.'
    },
    allergies: {
      en: 'No allergies recorded. Please complete the health questionnaire.',
      es: 'No hay alergias registradas. Por favor complete el cuestionario de salud.'
    }
  };
  
  return (
    <div className="text-center py-8">
      <p className="text-gray-500">
        {language === 'en' ? messages[type].en : messages[type].es}
      </p>
    </div>
  );
};

// Info Field Component
interface InfoFieldProps {
  label: string;
  value: string;
  editMode: boolean;
  onChange: (value: string) => void;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, editMode, onChange }) => {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      {editMode ? (
        <input 
          type="text" 
          defaultValue={value} 
          className="w-full p-2 border rounded-md" 
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="p-2 bg-gray-50 rounded-md border">{value}</div>
      )}
    </div>
  );
};

export default DashboardMedicalInfoPage;
