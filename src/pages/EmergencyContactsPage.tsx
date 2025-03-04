
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import MemberSidebar from "@/components/member/MemberSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

import ManageContactsTab from "@/components/emergency-contacts/ManageContactsTab";
import AddContactTab from "@/components/emergency-contacts/AddContactTab";
import TestAlertsTab from "@/components/emergency-contacts/TestAlertsTab";
import { Contact } from "@/components/emergency-contacts/types";

const EmergencyContactsPage: React.FC = () => {
  const { language } = useLanguage();
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
  
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "family",
    phone: "",
    email: "",
    priority: 3,
    receivesAlerts: true,
    receivesUpdates: true
  });
  
  const [activeTab, setActiveTab] = useState<string>("manage");
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
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
  
  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    
    toast({
      title: language === 'en' ? "Contact removed" : "Contacto eliminado",
      description: language === 'en' 
        ? "Emergency contact has been removed" 
        : "El contacto de emergencia ha sido eliminado"
    });
  };
  
  const handleToggleSetting = (id: string, setting: 'receivesAlerts' | 'receivesUpdates') => {
    setContacts(contacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, [setting]: !contact[setting] };
      }
      return contact;
    }));
  };
  
  const handleInputChange = (field: string, value: string | number | boolean) => {
    setNewContact({
      ...newContact,
      [field]: value
    });
  };
  
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
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ice-800">{ct.title}</h1>
            <p className="text-muted-foreground">{ct.subtitle}</p>
          </div>
        </header>
        
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
