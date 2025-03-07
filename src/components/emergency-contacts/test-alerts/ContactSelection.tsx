
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTriangle } from '@/components/ui/alert';
import { Contact } from '../types';

interface ContactSelectionProps {
  contacts: Contact[];
  selectedContactIds: string[];
  onContactSelectionChange: (contactId: string, checked: boolean) => void;
}

const ContactSelection: React.FC<ContactSelectionProps> = ({
  contacts,
  selectedContactIds,
  onContactSelectionChange,
}) => {
  const { language } = useLanguage();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">
        {language === 'en' ? 'Select Contacts to Test' : 'Seleccionar Contactos para Probar'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className="flex items-start space-x-3 border p-4 rounded-md"
          >
            <Checkbox 
              id={`contact-${contact.id}`} 
              checked={selectedContactIds.includes(contact.id)}
              onCheckedChange={(checked) => 
                onContactSelectionChange(contact.id, checked as boolean)
              }
            />
            <div className="grid gap-1.5">
              <Label 
                htmlFor={`contact-${contact.id}`}
                className="font-medium cursor-pointer"
              >
                {contact.name}
              </Label>
              <p className="text-sm text-muted-foreground">
                {contact.relationship} • {contact.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedContactIds.length === 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            {language === 'en' 
              ? 'Please select at least one contact to send test alerts.'
              : 'Selecciona al menos un contacto para enviar alertas de prueba.'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ContactSelection;
