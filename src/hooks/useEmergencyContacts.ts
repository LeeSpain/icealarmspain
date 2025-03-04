import { useState } from "react";
import { Contact, TestStatus, AlertType, TestResult, TestLog } from "@/components/emergency-contacts/types";
import { toast } from "@/components/ui/use-toast";

export interface EmergencyContactsHookProps {
  language: 'en' | 'es';
}

export interface NewContactForm {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
  receivesAlerts: boolean;
  receivesUpdates: boolean;
}

export const useEmergencyContacts = ({ language }: EmergencyContactsHookProps) => {
  // Initial contacts state
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Maria Rodriguez",
      relationship: "Daughter",
      phone: "+1 (555) 123-4567",
      email: "maria@example.com",
      priority: 1,
      receivesAlerts: true,
      receivesUpdates: true
    },
    {
      id: "2",
      name: "James Smith",
      relationship: "Son",
      phone: "+1 (555) 987-6543",
      email: "james@example.com",
      priority: 2,
      receivesAlerts: true,
      receivesUpdates: false
    }
  ]);
  
  // Form state for new contact
  const [newContact, setNewContact] = useState<NewContactForm>({
    name: "",
    relationship: "family",
    phone: "",
    email: "",
    priority: 3,
    receivesAlerts: true,
    receivesUpdates: true
  });
  
  // UI state
  const [activeTab, setActiveTab] = useState<string>("manage");
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [selectedAlertType, setSelectedAlertType] = useState<AlertType>('all');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [testLogs, setTestLogs] = useState<TestLog[]>([]);
  
  // Handle adding a new contact
  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: language === 'en' ? "Required fields missing" : "Faltan campos requeridos",
        description: language === 'en' 
          ? "Please provide at least a name and phone number" 
          : "Por favor proporcione al menos un nombre y número de teléfono",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.random().toString(36).substring(2, 9);
    setContacts([...contacts, { ...newContact, id: newId }]);
    
    // Reset form
    setNewContact({
      name: "",
      relationship: "family",
      phone: "",
      email: "",
      priority: Math.max(...contacts.map(c => c.priority), 0) + 1,
      receivesAlerts: true,
      receivesUpdates: true
    });
    
    toast({
      title: language === 'en' ? "Contact added" : "Contacto agregado",
      description: language === 'en' 
        ? "Emergency contact has been added successfully" 
        : "El contacto de emergencia ha sido agregado exitosamente"
    });
  };
  
  // Handle deleting a contact
  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    
    toast({
      title: language === 'en' ? "Contact removed" : "Contacto eliminado",
      description: language === 'en' 
        ? "Emergency contact has been removed" 
        : "El contacto de emergencia ha sido eliminado"
    });
  };
  
  // Handle toggling a contact setting
  const handleToggleSetting = (id: string, setting: 'receivesAlerts' | 'receivesUpdates') => {
    setContacts(contacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, [setting]: !contact[setting] };
      }
      return contact;
    }));
  };
  
  // Handle input changes for the new contact form
  const handleInputChange = (field: string, value: string | number | boolean) => {
    setNewContact({
      ...newContact,
      [field]: value
    });
  };
  
  // Handle changing the alert type for testing
  const handleChangeAlertType = (type: AlertType) => {
    setSelectedAlertType(type);
  };
  
  // Generate a test message based on alert type
  const getTestMessage = (type: AlertType): string => {
    const baseMessage = language === 'en' 
      ? "This is a TEST alert from IceGuardian Alert system." 
      : "Esta es una alerta de PRUEBA del sistema IceGuardian Alert.";
      
    const typeMessage = {
      emergency: language === 'en' ? "EMERGENCY TEST" : "PRUEBA DE EMERGENCIA",
      medical: language === 'en' ? "MEDICAL TEST" : "PRUEBA MÉDICA",
      activity: language === 'en' ? "ACTIVITY TEST" : "PRUEBA DE ACTIVIDAD",
      all: language === 'en' ? "GENERAL TEST" : "PRUEBA GENERAL"
    };
    
    return `${typeMessage[type]}: ${baseMessage}`;
  };
  
  // Create a new test log entry
  const createTestLog = (
    contactId: string, 
    alertType: AlertType, 
    delivered: boolean, 
    deliveryMethod: 'sms' | 'email' | 'call'
  ): TestLog => {
    return {
      contactId,
      timestamp: new Date(),
      alertType,
      delivered,
      deliveryMethod,
      message: getTestMessage(alertType)
    };
  };
  
  // Handle sending test alerts
  const handleTestAlerts = () => {
    setTestStatus('sending');
    
    // Filter contacts that should receive alerts
    const alertRecipients = contacts
      .filter(c => c.receivesAlerts)
      .sort((a, b) => a.priority - b.priority);
    
    if (alertRecipients.length === 0) {
      setTestStatus('error');
      
      toast({
        title: language === 'en' ? "Test failed" : "Prueba fallida",
        description: language === 'en' 
          ? "No contacts are configured to receive alerts" 
          : "No hay contactos configurados para recibir alertas",
        variant: "destructive"
      });
      
      setTimeout(() => setTestStatus('idle'), 2000);
      return;
    }
    
    // Simulate sending test alerts
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success for demo purposes
      const newLogs: TestLog[] = [];
      const recipientIds: string[] = [];
      
      // Create test logs for each recipient
      alertRecipients.forEach(contact => {
        // Determine delivery methods based on contact info
        if (contact.phone) {
          const smsDelivered = Math.random() > 0.1; // 90% SMS success rate
          newLogs.push(createTestLog(contact.id, selectedAlertType, smsDelivered, 'sms'));
          
          // For primary contacts, try call as well
          if (contact.priority === 1) {
            const callDelivered = Math.random() > 0.2; // 80% call success rate
            newLogs.push(createTestLog(contact.id, selectedAlertType, callDelivered, 'call'));
          }
        }
        
        if (contact.email) {
          const emailDelivered = Math.random() > 0.05; // 95% email success rate
          newLogs.push(createTestLog(contact.id, selectedAlertType, emailDelivered, 'email'));
        }
        
        recipientIds.push(contact.id);
      });
      
      // Create the test result
      const testResult: TestResult = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date(),
        type: selectedAlertType,
        success: success,
        recipients: recipientIds,
        errorMessage: success ? undefined : 
          language === 'en' 
            ? "One or more alerts failed to deliver" 
            : "Una o más alertas no se pudieron entregar"
      };
      
      // Update state with new logs and results
      setTestLogs(prev => [...newLogs, ...prev].slice(0, 100)); // Keep last 100 logs
      setTestResults(prev => [testResult, ...prev].slice(0, 20)); // Keep last 20 results
      setTestStatus(success ? 'success' : 'error');
      
      // Show toast notification
      toast({
        title: language === 'en' 
          ? success ? "Test alerts sent" : "Some alerts failed" 
          : success ? "Alertas de prueba enviadas" : "Algunas alertas fallaron",
        description: language === 'en' 
          ? success
            ? `Test emergency alerts sent to ${alertRecipients.length} contacts`
            : "Some alerts could not be delivered. Check the test logs for details."
          : success
            ? `Se han enviado alertas de emergencia de prueba a ${alertRecipients.length} contactos`
            : "Algunas alertas no se pudieron entregar. Consulte los registros de prueba para más detalles.",
        variant: success ? "default" : "destructive"
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setTestStatus('idle');
      }, 3000);
    }, 2000);
  };

  // Clear test logs and results
  const clearTestHistory = () => {
    setTestLogs([]);
    setTestResults([]);
    
    toast({
      title: language === 'en' ? "Test history cleared" : "Historial de pruebas borrado",
      description: language === 'en' 
        ? "All test logs and results have been cleared" 
        : "Todos los registros y resultados de pruebas han sido borrados"
    });
  };

  return {
    contacts,
    newContact,
    activeTab,
    testStatus,
    selectedAlertType,
    testResults,
    testLogs,
    setActiveTab,
    handleAddContact,
    handleDeleteContact,
    handleToggleSetting,
    handleInputChange,
    handleTestAlerts,
    handleChangeAlertType,
    clearTestHistory
  };
};
