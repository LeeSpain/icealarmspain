
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import ContactCard from "./ContactCard";

interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
  receivesAlerts: boolean;
  receivesUpdates: boolean;
}

interface ManageContactsTabProps {
  contacts: Contact[];
  language: 'en' | 'es';
  onAddContact: () => void;
  onDeleteContact: (id: string) => void;
  onToggleSetting: (id: string, setting: 'receivesAlerts' | 'receivesUpdates') => void;
  setActiveTab: (tab: string) => void;
  relations: {[key: string]: string};
}

const ManageContactsTab: React.FC<ManageContactsTabProps> = ({ 
  contacts, 
  language, 
  onAddContact, 
  onDeleteContact, 
  onToggleSetting,
  setActiveTab,
  relations
}) => {
  const ct = {
    noContacts: language === 'en' ? "No emergency contacts added yet" : "Aún no se han agregado contactos de emergencia",
    addFirst: language === 'en' ? "Add your first contact" : "Agregue su primer contacto",
    tabAdd: language === 'en' ? "Add Contact" : "Agregar Contacto"
  };
  
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-ice-100 p-3 mb-4">
          <UserPlus className="h-6 w-6 text-ice-600" />
        </div>
        <h3 className="mb-2 font-medium">{ct.noContacts}</h3>
        <p className="text-muted-foreground mb-4">{ct.addFirst}</p>
        <Button onClick={() => setActiveTab("add")}>
          {ct.tabAdd}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {contacts.map((contact) => (
        <ContactCard 
          key={contact.id}
          contact={contact}
          language={language}
          onDelete={onDeleteContact}
          onToggleSetting={onToggleSetting}
          relations={relations}
        />
      ))}
    </div>
  );
};

export default ManageContactsTab;
