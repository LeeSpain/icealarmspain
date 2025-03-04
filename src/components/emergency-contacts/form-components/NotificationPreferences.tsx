
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ContactFormValues } from '../types';
import FormSectionWrapper from './FormSectionWrapper';

interface NotificationPreferencesProps {
  form: UseFormReturn<ContactFormValues>;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ form }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="receivesAlerts"
        render={({ field }) => (
          <FormSectionWrapper
            title={language === 'en' ? 'Emergency Alerts' : 'Alertas de Emergencia'}
            description={language === 'en' 
              ? 'Receive notifications during emergencies'
              : 'Recibir notificaciones durante emergencias'}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />

      <FormField
        control={form.control}
        name="receivesUpdates"
        render={({ field }) => (
          <FormSectionWrapper
            title={language === 'en' ? 'Status Updates' : 'Actualizaciones de Estado'}
            description={language === 'en'
              ? 'Receive regular status updates and notifications'
              : 'Recibir actualizaciones regulares de estado y notificaciones'}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
    </div>
  );
};

export default NotificationPreferences;
