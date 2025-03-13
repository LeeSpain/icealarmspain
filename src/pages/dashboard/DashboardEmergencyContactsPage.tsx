
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, UserPlus, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import AddContactTab from "@/components/emergency-contacts/AddContactTab";
import ManageContactsTab from "@/components/emergency-contacts/ManageContactsTab";
import TestAlertsTab from "@/components/emergency-contacts/TestAlertsTab";
import { Contact, AlertType, TestResult } from "@/components/emergency-contacts/types";
import { useAuth } from "@/context/auth";

// Mock data for contacts - in a real app, these would come from a database
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Jane Smith",
    relationship: "Spouse",
    phone: "+34 612 345 678",
    email: "jane.smith@example.com",
    priority: 1,
    receivesAlerts: true,
    receivesUpdates: true,
  },
  {
    id: "2",
    name: "John Doe",
    relationship: "Friend",
    phone: "+34 623 456 789",
    email: "john.doe@example.com",
    priority: 2,
    receivesAlerts: true,
    receivesUpdates: false,
  },
];

const DashboardEmergencyContactsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [testInProgress, setTestInProgress] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);
  const { user } = useAuth();

  // Handler for adding a new contact
  const handleAddContact = async (contact: Omit<Contact, 'id'>): Promise<boolean> => {
    try {
      // Simulate API call
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add new contact with generated ID
      const newContact: Contact = {
        ...contact,
        id: Date.now().toString(),
      };
      
      setContacts(prev => [...prev, newContact]);
      toast.success(
        language === 'en' 
          ? 'Contact added successfully' 
          : 'Contacto añadido con éxito'
      );
      return true;
    } catch (error) {
      toast.error(
        language === 'en' 
          ? 'Failed to add contact' 
          : 'Error al añadir contacto'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for updating a contact
  const handleUpdateContact = async (id: string, updatedContact: Partial<Contact>): Promise<boolean> => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContacts(prev => 
        prev.map(contact => 
          contact.id === id ? { ...contact, ...updatedContact } : contact
        )
      );
      
      toast.success(
        language === 'en' 
          ? 'Contact updated successfully' 
          : 'Contacto actualizado con éxito'
      );
      return true;
    } catch (error) {
      toast.error(
        language === 'en' 
          ? 'Failed to update contact' 
          : 'Error al actualizar contacto'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for deleting a contact
  const handleDeleteContact = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContacts(prev => prev.filter(contact => contact.id !== id));
      setSelectedContactId(null);
      
      toast.success(
        language === 'en' 
          ? 'Contact deleted successfully' 
          : 'Contacto eliminado con éxito'
      );
      return true;
    } catch (error) {
      toast.error(
        language === 'en' 
          ? 'Failed to delete contact' 
          : 'Error al eliminar contacto'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for testing alerts
  const handleTestAlert = async (type: AlertType, contactIds: string[]): Promise<boolean> => {
    try {
      setTestInProgress(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const recipients = contacts
        .filter(contact => contactIds.includes(contact.id))
        .map(contact => contact.name);
      
      const newTestResult: TestResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type,
        success: true,
        recipients,
      };
      
      setLastTestResult(newTestResult);
      
      toast.success(
        language === 'en' 
          ? `Test alert sent to ${recipients.join(', ')}` 
          : `Alerta de prueba enviada a ${recipients.join(', ')}`
      );
      return true;
    } catch (error) {
      const errorResult: TestResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type,
        success: false,
        recipients: [],
        errorMessage: 'Failed to send test alerts'
      };
      
      setLastTestResult(errorResult);
      
      toast.error(
        language === 'en' 
          ? 'Failed to send test alerts' 
          : 'Error al enviar alertas de prueba'
      );
      return false;
    } finally {
      setTestInProgress(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Manage the people to contact in case of emergency' 
                : 'Gestiona las personas a contactar en caso de emergencia'}
            </p>
          </div>

          <Tabs defaultValue="manage" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {language === 'en' ? 'Manage Contacts' : 'Gestionar Contactos'}
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {language === 'en' ? 'Add Contact' : 'Añadir Contacto'}
              </TabsTrigger>
              <TabsTrigger value="test" className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4" />
                {language === 'en' ? 'Test Alerts' : 'Probar Alertas'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manage">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Your Emergency Contacts' : 'Tus Contactos de Emergencia'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ManageContactsTab 
                    contacts={contacts}
                    isLoading={isLoading}
                    selectedContactId={selectedContactId}
                    onSelectContact={setSelectedContactId}
                    onUpdateContact={handleUpdateContact}
                    onDeleteContact={handleDeleteContact}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Add New Emergency Contact' : 'Añadir Nuevo Contacto de Emergencia'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AddContactTab onAddContact={handleAddContact} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Test Emergency Alerts' : 'Probar Alertas de Emergencia'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TestAlertsTab 
                    contacts={contacts}
                    isLoading={isLoading}
                    testInProgress={testInProgress}
                    lastTestResult={lastTestResult}
                    onTestAlert={handleTestAlert}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmergencyContactsPage;
