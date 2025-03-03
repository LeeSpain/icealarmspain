
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { MultiEntry } from "@/components/questionnaire/types";

interface EmergencyContactsTabProps {
  contacts: MultiEntry[];
  onAddContact: () => void;
  onRemoveContact: (id: string) => void;
  onContactChange: (field: string, entryId: string, key: string, value: string) => void;
  language: string;
}

const EmergencyContactsTab: React.FC<EmergencyContactsTabProps> = ({
  contacts,
  onAddContact,
  onRemoveContact,
  onContactChange,
  language
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'People to contact in case of emergency' 
              : 'Personas a contactar en caso de emergencia'}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddContact}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          {language === 'en' ? 'Add Contact' : 'Añadir Contacto'}
        </Button>
      </CardHeader>
      <CardContent>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact._id} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">
                  {contact.name || (language === 'en' ? 'New Contact' : 'Nuevo Contacto')}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveContact(contact._id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Name' : 'Nombre'}
                  </Label>
                  <Input
                    value={contact.name || ''}
                    onChange={(e) => onContactChange('emergency_contacts', contact._id, 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Relationship' : 'Relación'}
                  </Label>
                  <Input
                    value={contact.relationship || ''}
                    onChange={(e) => onContactChange('emergency_contacts', contact._id, 'relationship', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === 'en' ? 'Phone' : 'Teléfono'}
                  </Label>
                  <Input
                    value={contact.phone || ''}
                    onChange={(e) => onContactChange('emergency_contacts', contact._id, 'phone', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            {language === 'en' 
              ? 'No emergency contacts added yet. Add your first contact using the button above.' 
              : 'Aún no se han añadido contactos de emergencia. Añada su primer contacto usando el botón de arriba.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmergencyContactsTab;
