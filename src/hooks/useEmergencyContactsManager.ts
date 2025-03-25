
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Contact, TestResult } from "@/components/emergency-contacts/types";
import { getContacts, addContact, updateContact, deleteContact, testAlert } from '@/services/contactsService';

export function useEmergencyContactsManager() {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return {
    contacts,
    isLoading,
    selectedContactId,
    setSelectedContactId,
    lastTestResult,
    testInProgress,
    handleAddContact,
    handleUpdateContact,
    handleDeleteContact,
    handleTestAlert
  };
}
