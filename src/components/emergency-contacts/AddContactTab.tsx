
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Contact, ContactFormValues } from './types';
import ContactBasicInfo from './form-components/ContactBasicInfo';
import ContactPriority from './form-components/ContactPriority';
import NotificationPreferences from './form-components/NotificationPreferences';
import FormActions from './form-components/FormActions';

// Form schema with validation - ensure all fields are required
const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  relationship: z.string().min(1, {
    message: "Please select a relationship.",
  }),
  phone: z.string().min(9, {
    message: "Phone number must be at least 9 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  priority: z.number().min(1).max(10),
  receivesAlerts: z.boolean(),
  receivesUpdates: z.boolean(),
}).required();

interface AddContactTabProps {
  onAddContact: (contact: Omit<Contact, 'id'>) => Promise<boolean>;
}

const AddContactTab: React.FC<AddContactTabProps> = ({ onAddContact }) => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use ContactFormValues type directly for the form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
      priority: 3,
      receivesAlerts: true,
      receivesUpdates: true,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // The form validation ensures all required fields are present
      const success = await onAddContact({
        name: data.name,
        relationship: data.relationship,
        phone: data.phone,
        email: data.email,
        priority: data.priority,
        receivesAlerts: data.receivesAlerts,
        receivesUpdates: data.receivesUpdates,
      });
      
      if (success) {
        form.reset(); // Reset form on success
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Add Emergency Contact' : 'Añadir Contacto de Emergencia'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Add people who should be contacted in case of emergency.'
            : 'Añade personas que deben ser contactadas en caso de emergencia.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ContactBasicInfo form={form} />
            
            <div className="grid grid-cols-1">
              <ContactPriority form={form} />
            </div>

            <NotificationPreferences form={form} />
            
            <FormActions isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddContactTab;
