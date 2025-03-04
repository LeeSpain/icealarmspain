
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import AddContactTab from '@/components/emergency-contacts/AddContactTab';
import ManageContactsTab from '@/components/emergency-contacts/ManageContactsTab';
import TestAlertsTab from '@/components/emergency-contacts/TestAlertsTab';
import { Contact, TestResult } from "@/components/emergency-contacts/types";
import { getContacts, addContact, updateContact, deleteContact, testAlert } from '@/services/contactsService';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from '@/components/common/PageHeader';
import { Loader2 } from 'lucide-react';

const EmergencyContactsPage: React.FC = () => {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('add-contact');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);
  const [testInProgress, setTestInProgress] = useState(false);

  // Fetch contacts when component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      if (isAuthenticated) {
        try {
          setIsLoading(true);
          const fetchedContacts = await getContacts();
          setContacts(fetchedContacts);
        } catch (error) {
          console.error("Error fetching contacts:", error);
          toast({
            title: language === 'en' ? "Error" : "Error",
            description: language === 'en' 
              ? "Failed to load emergency contacts" 
              : "Error al cargar los contactos de emergencia",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchContacts();
  }, [isAuthenticated, language, toast]);

  const handleAddContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      const newContact = await addContact(contact);
      setContacts(prev => [...prev, newContact]);
      toast({
        title: language === 'en' ? "Contact Added" : "Contacto Añadido",
        description: language === 'en'
          ? `${contact.name} has been added to your emergency contacts`
          : `${contact.name} ha sido añadido a tus contactos de emergencia`,
      });
      return true;
    } catch (error) {
      console.error("Error adding contact:", error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en'
          ? "Failed to add contact"
          : "Error al añadir contacto",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleUpdateContact = async (id: string, updatedContact: Partial<Contact>) => {
    try {
      const updated = await updateContact(id, updatedContact);
      setContacts(prev => prev.map(c => c.id === id ? updated : c));
      toast({
        title: language === 'en' ? "Contact Updated" : "Contacto Actualizado",
        description: language === 'en'
          ? `${updated.name} has been updated`
          : `${updated.name} ha sido actualizado`,
      });
      return true;
    } catch (error) {
      console.error("Error updating contact:", error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en'
          ? "Failed to update contact"
          : "Error al actualizar contacto",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      if (selectedContactId === id) {
        setSelectedContactId(null);
      }
      toast({
        title: language === 'en' ? "Contact Deleted" : "Contacto Eliminado",
        description: language === 'en'
          ? "The contact has been removed from your emergency contacts"
          : "El contacto ha sido eliminado de tus contactos de emergencia",
      });
      return true;
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en'
          ? "Failed to delete contact"
          : "Error al eliminar contacto",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleTestAlert = async (alertType: 'emergency' | 'medical' | 'activity' | 'all', contactIds: string[]) => {
    try {
      setTestInProgress(true);
      const result = await testAlert(alertType, contactIds);
      setLastTestResult(result);
      
      toast({
        title: result.success 
          ? (language === 'en' ? "Test Successful" : "Prueba Exitosa")
          : (language === 'en' ? "Test Failed" : "Prueba Fallida"),
        description: result.success
          ? (language === 'en' 
              ? `Test alerts sent to ${result.recipients.join(', ')}`
              : `Alertas de prueba enviadas a ${result.recipients.join(', ')}`)
          : (language === 'en'
              ? result.errorMessage || "Failed to send test alerts"
              : result.errorMessage || "Error al enviar alertas de prueba"),
        variant: result.success ? "default" : "destructive",
      });
      
      return result.success;
    } catch (error) {
      console.error("Error testing alert:", error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en'
          ? "Failed to test alert"
          : "Error al probar la alerta",
        variant: "destructive",
      });
      return false;
    } finally {
      setTestInProgress(false);
    }
  };

  // If user is not authenticated, show a loading state until auth is checked
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-ice-600 mb-4" />
          <p className="text-ice-700">
            {language === 'en' ? 'Checking authentication...' : 'Verificando autenticación...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title={language === 'en' ? "Emergency Contacts" : "Contactos de Emergencia"}
            description={language === 'en' 
              ? "Manage your emergency contacts and test the alert system."
              : "Gestiona tus contactos de emergencia y prueba el sistema de alertas."}
          />
          
          <div className="mt-8">
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
                  onAddContact={handleAddContact} 
                />
              </TabsContent>
              
              <TabsContent value="manage-contacts" className="mt-6">
                <ManageContactsTab 
                  contacts={contacts}
                  isLoading={isLoading}
                  selectedContactId={selectedContactId}
                  onSelectContact={setSelectedContactId}
                  onUpdateContact={handleUpdateContact}
                  onDeleteContact={handleDeleteContact}
                />
              </TabsContent>
              
              <TabsContent value="test-alerts" className="mt-6">
                <TestAlertsTab 
                  contacts={contacts}
                  isLoading={isLoading}
                  testInProgress={testInProgress}
                  lastTestResult={lastTestResult}
                  onTestAlert={handleTestAlert}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmergencyContactsPage;
