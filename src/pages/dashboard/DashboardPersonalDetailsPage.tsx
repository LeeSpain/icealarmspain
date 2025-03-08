
import React, { useState, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, PillIcon, PhoneCall, Edit, Save, X, Clock } from "lucide-react";
import PersonalDetailsTabContent from "@/components/personal-details/PersonalDetailsTabContent";
import MedicationsTabContent from "@/components/personal-details/MedicationsTabContent";
import EmergencyContactsTabContent from "@/components/personal-details/EmergencyContactsTabContent";
import { useNavigate } from "react-router-dom";

const DashboardPersonalDetailsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const navigate = useNavigate();

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
    }, 1000);
  };

  const handleCancelEdit = () => {
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
            </TabsList>
            
            <TabsContent value="personal" className="mt-0">
              {questionnaireData ? (
                <PersonalDetailsTabContent 
                  editMode={editMode} 
                  questionnaireData={questionnaireData} 
                />
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        {language === 'en'
                          ? 'No personal information available yet. You can add your information by clicking the Edit button.'
                          : 'No hay información personal disponible todavía. Puede agregar su información haciendo clic en el botón Editar.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardPersonalDetailsPage;
