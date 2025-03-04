
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import MemberSidebar from "@/components/member/MemberSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ManageContactsTab from "@/components/emergency-contacts/ManageContactsTab";
import AddContactTab from "@/components/emergency-contacts/AddContactTab";
import TestAlertsTab from "@/components/emergency-contacts/TestAlertsTab";
import PageHeader from "@/components/common/PageHeader";
import { useEmergencyContacts } from "@/hooks/useEmergencyContacts";

const EmergencyContactsPage: React.FC = () => {
  const { language } = useLanguage();
  
  const {
    contacts,
    newContact,
    activeTab,
    testStatus,
    setActiveTab,
    handleAddContact,
    handleDeleteContact,
    handleToggleSetting,
    handleInputChange,
    handleTestAlerts
  } = useEmergencyContacts({ language });
  
  const content = {
    en: {
      title: "Emergency Contacts",
      subtitle: "Manage the people who will be notified in case of emergency",
      tabManage: "Manage Contacts",
      tabAdd: "Add Contact",
      tabTest: "Test Alerts",
      relations: {
        family: "Family Member",
        friend: "Friend",
        neighbor: "Neighbor",
        caregiver: "Caregiver",
        doctor: "Doctor",
        other: "Other"
      }
    },
    es: {
      title: "Contactos de Emergencia",
      subtitle: "Administre las personas que serán notificadas en caso de emergencia",
      tabManage: "Administrar Contactos",
      tabAdd: "Agregar Contacto",
      tabTest: "Probar Alertas",
      relations: {
        family: "Familiar",
        friend: "Amigo",
        neighbor: "Vecino",
        caregiver: "Cuidador",
        doctor: "Doctor",
        other: "Otro"
      }
    }
  };
  
  const ct = language === 'en' ? content.en : content.es;
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader title={ct.title} subtitle={ct.subtitle} />
        
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="manage" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manage">{ct.tabManage}</TabsTrigger>
              <TabsTrigger value="add">{ct.tabAdd}</TabsTrigger>
              <TabsTrigger value="test">{ct.tabTest}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manage">
              <ManageContactsTab 
                contacts={contacts}
                language={language}
                onAddContact={() => setActiveTab("add")}
                onDeleteContact={handleDeleteContact}
                onToggleSetting={handleToggleSetting}
                setActiveTab={setActiveTab}
                relations={ct.relations}
              />
            </TabsContent>
            
            <TabsContent value="add">
              <AddContactTab 
                newContact={newContact}
                onInputChange={handleInputChange}
                onAddContact={handleAddContact}
                language={language}
                relations={ct.relations}
              />
            </TabsContent>
            
            <TabsContent value="test">
              <TestAlertsTab 
                contacts={contacts}
                language={language}
                testStatus={testStatus}
                onTestAlerts={handleTestAlerts}
                setActiveTab={setActiveTab}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default EmergencyContactsPage;
