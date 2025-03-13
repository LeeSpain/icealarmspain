
import React, { useState, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, PillIcon, PhoneCall, Edit, Save, X, Clock, Heart } from "lucide-react";
import PersonalDetailsTabContent from "@/components/personal-details/PersonalDetailsTabContent";
import MedicationsTabContent from "@/components/personal-details/MedicationsTabContent";
import EmergencyContactsTabContent from "@/components/personal-details/EmergencyContactsTabContent";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const DashboardPersonalDetailsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load questionnaire data from localStorage without showing notifications
  useEffect(() => {
    const savedData = localStorage.getItem('userQuestionnaire');
    if (savedData) {
      setQuestionnaireData(JSON.parse(savedData));
      console.log("Loaded saved questionnaire data:", JSON.parse(savedData));
    }
    
    // Set profile as completed when user visits this page to prevent future redirects
    if (user && !user.profileCompleted) {
      localStorage.setItem('profileCompleted', 'true');
    }
  }, [navigate, language, user]);

  const handleSaveChanges = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEditMode(false);
      
      // Refresh questionnaire data after save
      const savedData = localStorage.getItem('userQuestionnaire');
      if (savedData) {
        setQuestionnaireData(JSON.parse(savedData));
      }
      
      toast({
        title: language === 'en' ? "Changes saved" : "Cambios guardados",
        description: language === 'en' 
          ? "Your information has been updated successfully" 
          : "Tu información ha sido actualizada con éxito"
      });
    }, 1000);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };
  
  const handleDataSaved = (updatedData: any) => {
    // Update the state with the new data
    setQuestionnaireData(updatedData);
    setEditMode(false);
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="personal-details"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-white border mb-6 p-0 h-auto">
              <TabsTrigger
                value="personal"
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                <User className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Personal Information' : 'Información Personal'}
              </TabsTrigger>
              <TabsTrigger
                value="medications"
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                <PillIcon className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Medications' : 'Medicamentos'}
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                <PhoneCall className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
              </TabsTrigger>
              <TabsTrigger
                value="medical"
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                <Heart className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Medical Information' : 'Información Médica'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-0">
              <PersonalDetailsTabContent 
                editMode={editMode} 
                questionnaireData={questionnaireData}
                onSave={handleDataSaved}
              />
            </TabsContent>
            
            <TabsContent value="medications" className="mt-0">
              <MedicationsTabContent 
                editMode={editMode} 
                questionnaireData={questionnaireData} 
              />
            </TabsContent>
            
            <TabsContent value="emergency" className="mt-0">
              <EmergencyContactsTabContent 
                editMode={editMode} 
                questionnaireData={questionnaireData} 
              />
            </TabsContent>
            
            <TabsContent value="medical" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  {questionnaireData && questionnaireData.health ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg border-b pb-2">
                          {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}
                        </h3>
                        <div className="space-y-2">
                          {questionnaireData.health.conditions && questionnaireData.health.conditions.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {questionnaireData.health.conditions.map((condition: string, index: number) => (
                                <li key={index} className="text-gray-700">{condition}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500">
                              {language === 'en' ? 'No medical conditions reported' : 'No se han reportado condiciones médicas'}
                            </p>
                          )}
                        </div>
                        
                        <h3 className="font-medium text-lg border-b pb-2 mt-6">
                          {language === 'en' ? 'Allergies' : 'Alergias'}
                        </h3>
                        <div className="space-y-2">
                          {questionnaireData.health.allergies && questionnaireData.health.allergies.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {questionnaireData.health.allergies.map((allergy: string, index: number) => (
                                <li key={index} className="text-gray-700">{allergy}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500">
                              {language === 'en' ? 'No allergies reported' : 'No se han reportado alergias'}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg border-b pb-2">
                          {language === 'en' ? 'Vital Information' : 'Información Vital'}
                        </h3>
                        
                        {questionnaireData.health.vitals ? (
                          <div className="grid grid-cols-1 gap-4">
                            <InfoField 
                              label={language === 'en' ? 'Height' : 'Altura'}
                              value={`${questionnaireData.health.vitals.height || '-'} cm`}
                              editMode={false}
                            />
                            
                            <InfoField 
                              label={language === 'en' ? 'Weight' : 'Peso'}
                              value={`${questionnaireData.health.vitals.weight || '-'} kg`}
                              editMode={false}
                            />
                            
                            <InfoField 
                              label={language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}
                              value={questionnaireData.health.vitals.bloodPressure || '-'}
                              editMode={false}
                            />
                            
                            <InfoField 
                              label={language === 'en' ? 'Heart Rate' : 'Frecuencia Cardíaca'}
                              value={`${questionnaireData.health.vitals.heartRate || '-'} bpm`}
                              editMode={false}
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">
                            {language === 'en' ? 'No vital information available' : 'No hay información vital disponible'}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        {language === 'en'
                          ? 'No medical information available. Please complete the questionnaire to add your medical information.'
                          : 'No hay información médica disponible. Por favor complete el cuestionario para añadir su información médica.'
                        }
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/dashboard/questionnaire')}
                        className="flex items-center gap-2"
                      >
                        <ClipboardList className="h-4 w-4" />
                        {language === 'en' 
                          ? 'Complete Questionnaire' 
                          : 'Completar Cuestionario'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface InfoFieldProps {
  label: string;
  value: string;
  editMode: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, editMode }) => {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      {editMode ? (
        <input 
          type="text" 
          defaultValue={value} 
          className="w-full p-2 border rounded-md bg-white text-ice-800 placeholder:text-ice-400" 
        />
      ) : (
        <div className="p-2 bg-gray-50 rounded-md border">{value}</div>
      )}
    </div>
  );
};

export default DashboardPersonalDetailsPage;
