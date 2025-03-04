
import { useState } from "react";
import { Contact, TestStatus } from "@/components/emergency-contacts/types";
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
  
  // Handle sending test alerts
  const handleTestAlerts = () => {
    setTestStatus('sending');
    
    // Simulate sending test alerts
    setTimeout(() => {
      setTestStatus('success');
      
      toast({
        title: language === 'en' ? "Test alerts sent" : "Alertas de prueba enviadas",
        description: language === 'en' 
          ? "Test emergency alerts have been sent to all configured contacts" 
          : "Se han enviado alertas de emergencia de prueba a todos los contactos configurados"
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setTestStatus('idle');
      }, 3000);
    }, 2000);
  };

  return {
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
  };
};
