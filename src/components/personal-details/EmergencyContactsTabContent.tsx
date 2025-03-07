
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneCall, User, PlusCircle, Trash2, Mail, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmergencyContactsTabContentProps {
  editMode: boolean;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  isEmergencyResponder?: boolean;
  priority?: 'primary' | 'secondary';
}

const EmergencyContactsTabContent: React.FC<EmergencyContactsTabContentProps> = ({ editMode }) => {
  const { language } = useLanguage();
  
  // Initialize emergency contacts from local storage or questionnaire data
  const [contacts, setContacts] = useState<EmergencyContact[]>(() => {
    const savedQuestionnaire = localStorage.getItem('userQuestionnaire');
    if (savedQuestionnaire) {
      const parsedData = JSON.parse(savedQuestionnaire);
      
      // If we have emergency contact entries in the questionnaire, use them
      if (parsedData.multiEntries?.emergencyContacts) {
        return parsedData.multiEntries.emergencyContacts.map((contact: any) => ({
          id: contact._id || `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: contact.contactName || "",
          relationship: contact.relationship || "",
          phone: contact.contactPhone || "",
          alternatePhone: contact.alternatePhone || "",
          email: contact.contactEmail || "",
          isEmergencyResponder: contact.isEmergencyResponder || false,
          priority: contact.priority || 'primary'
        }));
      }
    }
    
    // Default empty array if no data found
    return [];
  });
  
  // Function to add a new emergency contact
  const addContact = () => {
    if (!editMode) return;
    
    const newContact: EmergencyContact = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: "",
      relationship: "",
      phone: "",
      priority: contacts.length === 0 ? 'primary' : 'secondary'
    };
    
    setContacts([...contacts, newContact]);
  };
  
  // Function to remove a contact
  const removeContact = (id: string) => {
    if (!editMode) return;
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  
  // Function to update a contact
  const updateContact = (id: string, field: keyof EmergencyContact, value: string | boolean) => {
    if (!editMode) return;
    
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };
  
  // Set primary contact
  const setPrimaryContact = (id: string) => {
    if (!editMode) return;
    
    setContacts(contacts.map(contact => ({
      ...contact,
      priority: contact.id === id ? 'primary' : 'secondary'
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
        </h3>
        
        {editMode && (
          <Button 
            onClick={addContact} 
            className="bg-ice-600 hover:bg-ice-700"
          >
            <PlusCircle size={16} className="mr-2" />
            {language === 'en' ? 'Add Contact' : 'Añadir Contacto'}
          </Button>
        )}
      </div>
      
      {contacts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users size={48} className="text-gray-300 mb-4" />
            <p className="text-lg text-gray-500 mb-2">
              {language === 'en' ? 'No emergency contacts added yet' : 'No hay contactos de emergencia añadidos aún'}
            </p>
            <p className="text-sm text-gray-400 text-center max-w-md">
              {language === 'en'
                ? 'Add emergency contacts to help respond in case of emergency.'
                : 'Añada contactos de emergencia para ayudar en caso de emergencia.'}
            </p>
            
            {editMode && (
              <Button 
                onClick={addContact} 
                variant="outline" 
                className="mt-4"
              >
                <PlusCircle size={16} className="mr-2" />
                {language === 'en' ? 'Add Your First Contact' : 'Añadir Su Primer Contacto'}
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card 
              key={contact.id} 
              className={`border-l-4 ${contact.priority === 'primary' ? 'border-ice-600' : 'border-ice-300'}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <User size={18} className="text-ice-600 mr-2" />
                    {editMode ? (
                      <Input
                        value={contact.name}
                        onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                        placeholder={language === 'en' ? "Contact name" : "Nombre del contacto"}
                        className="font-semibold border-0 p-0 h-auto text-lg focus-visible:ring-0"
                      />
                    ) : (
                      <CardTitle>{contact.name || "-"}</CardTitle>
                    )}
                  </div>
                  
                  {editMode && (
                    <div className="flex gap-2">
                      {contact.priority !== 'primary' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setPrimaryContact(contact.id)}
                          className="text-ice-600 text-xs"
                        >
                          {language === 'en' ? 'Set as Primary' : 'Establecer como Primario'}
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeContact(contact.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {contact.priority === 'primary' && (
                    <Badge className="bg-ice-600 text-white">
                      {language === 'en' ? "Primary Contact" : "Contacto Principal"}
                    </Badge>
                  )}
                  
                  <Badge variant="outline" className="bg-ice-50">
                    {contact.relationship || (language === 'en' ? "Relationship not specified" : "Relación no especificada")}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {editMode ? (
                    <>
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Relationship' : 'Relación'}
                        </Label>
                        <Input
                          value={contact.relationship}
                          onChange={(e) => updateContact(contact.id, 'relationship', e.target.value)}
                          placeholder={language === 'en' ? "e.g. Spouse, Child, Friend" : "ej. Cónyuge, Hijo, Amigo"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                        </Label>
                        <Input
                          value={contact.phone}
                          onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                          placeholder={language === 'en' ? "Phone number" : "Número de teléfono"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Alternate Phone (optional)' : 'Teléfono Alternativo (opcional)'}
                        </Label>
                        <Input
                          value={contact.alternatePhone || ""}
                          onChange={(e) => updateContact(contact.id, 'alternatePhone', e.target.value)}
                          placeholder={language === 'en' ? "Alternate phone" : "Teléfono alternativo"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          {language === 'en' ? 'Email (optional)' : 'Correo Electrónico (opcional)'}
                        </Label>
                        <Input
                          type="email"
                          value={contact.email || ""}
                          onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                          placeholder={language === 'en' ? "Email address" : "Dirección de correo"}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <Users size={18} className="text-ice-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {language === 'en' ? 'Relationship' : 'Relación'}
                          </p>
                          <p className="text-gray-600">{contact.relationship || "-"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <PhoneCall size={18} className="text-ice-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                          </p>
                          <p className="text-gray-600">{contact.phone || "-"}</p>
                        </div>
                      </div>
                      
                      {contact.alternatePhone && (
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                            <PhoneCall size={18} className="text-ice-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {language === 'en' ? 'Alternate Phone' : 'Teléfono Alternativo'}
                            </p>
                            <p className="text-gray-600">{contact.alternatePhone}</p>
                          </div>
                        </div>
                      )}
                      
                      {contact.email && (
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                            <Mail size={18} className="text-ice-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {language === 'en' ? 'Email' : 'Correo Electrónico'}
                            </p>
                            <p className="text-gray-600">{contact.email}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencyContactsTabContent;
