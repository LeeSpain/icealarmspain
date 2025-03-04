
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import AddContactTab from '@/components/emergency-contacts/AddContactTab';
import ManageContactsTab from '@/components/emergency-contacts/ManageContactsTab';
import TestAlertsTab from '@/components/emergency-contacts/TestAlertsTab';
import { Contact, TestResult } from "@/components/emergency-contacts/types";

interface EmergencyContactsTabsProps {
  contacts: Contact[];
  isLoading: boolean;
  selectedContactId: string | null;
  onSelectContact: (id: string | null) => void;
  lastTestResult: TestResult | null;
  testInProgress: boolean;
  onAddContact: (contact: Omit<Contact, 'id'>) => Promise<boolean>;
  onUpdateContact: (id: string, updatedContact: Partial<Contact>) => Promise<boolean>;
  onDeleteContact: (id: string) => Promise<boolean>;
  onTestAlert: (alertType: 'emergency' | 'medical' | 'activity' | 'all', contactIds: string[]) => Promise<boolean>;
}

const EmergencyContactsTabs: React.FC<EmergencyContactsTabsProps> = ({
  contacts,
  isLoading,
  selectedContactId,
  onSelectContact,
  lastTestResult,
  testInProgress,
  onAddContact,
  onUpdateContact,
  onDeleteContact,
  onTestAlert
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('add-contact');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="add-contact">
          {language === 'en' ? "Add Contact" : "Añadir Contacto"}
        </TabsTrigger>
        <TabsTrigger value="manage-contacts">
          {language === 'en' ? "Manage Contacts" : "Gestionar Contactos"}
        </TabsTrigger>
        <TabsTrigger value="test-alerts">
          {language === 'en' ? "Test Alerts" : "Probar Alertas"}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="add-contact" className="mt-6">
        <AddContactTab 
          onAddContact={onAddContact} 
        />
      </TabsContent>
      
      <TabsContent value="manage-contacts" className="mt-6">
        <ManageContactsTab 
          contacts={contacts}
          isLoading={isLoading}
          selectedContactId={selectedContactId}
          onSelectContact={onSelectContact}
          onUpdateContact={onUpdateContact}
          onDeleteContact={onDeleteContact}
        />
      </TabsContent>
      
      <TabsContent value="test-alerts" className="mt-6">
        <TestAlertsTab 
          contacts={contacts}
          isLoading={isLoading}
          testInProgress={testInProgress}
          lastTestResult={lastTestResult}
          onTestAlert={onTestAlert}
        />
      </TabsContent>
    </Tabs>
  );
};

export default EmergencyContactsTabs;
