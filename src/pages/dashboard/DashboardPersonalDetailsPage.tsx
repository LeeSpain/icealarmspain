
import React, { useState, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PersonalDetailsTabContent from "@/components/personal-details/PersonalDetailsTabContent";
import MedicationsTabContent from "@/components/personal-details/MedicationsTabContent";
import EmergencyContactsTabContent from "@/components/personal-details/EmergencyContactsTabContent";
import MedicalInfoTabContent from "@/components/personal-details/tabs/MedicalInfoTabContent";
import PageHeader from "@/components/personal-details/tabs/PageHeader";
import TabsNavigation from "@/components/personal-details/tabs/TabsNavigation";
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
          <PageHeader
            editMode={editMode}
            isLoading={isLoading}
            onEditToggle={() => setEditMode(true)}
            onSaveChanges={handleSaveChanges}
            onCancelEdit={handleCancelEdit}
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsNavigation activeTab={activeTab} />
            
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
              <MedicalInfoTabContent questionnaireData={questionnaireData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardPersonalDetailsPage;
