
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart, Activity, PillIcon } from "lucide-react";

// Import refactored components
import MedicalInfoHeader from "@/components/medical-info/MedicalInfoHeader";
import NoMedicalData from "@/components/medical-info/NoMedicalData";
import MedicalConditionsTab from "@/components/medical-info/MedicalConditionsTab";
import VitalsTab from "@/components/medical-info/VitalsTab";
import AllergiesTab from "@/components/medical-info/AllergiesTab";
import { useMedicalInfo } from "@/components/medical-info/useMedicalInfo";

const DashboardMedicalInfoPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const {
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
  } = useMedicalInfo();

  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="medical-info"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <MedicalInfoHeader 
            editMode={editMode}
            isLoading={isLoading}
            medicalData={medicalData}
            setEditMode={setEditMode}
            handleSaveChanges={handleSaveChanges}
            handleCancelEdit={handleCancelEdit}
            handleCompleteQuestionnaire={handleCompleteQuestionnaire}
          />
          
          {!medicalData ? (
            <NoMedicalData handleCompleteQuestionnaire={handleCompleteQuestionnaire} />
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

export default DashboardMedicalInfoPage;
