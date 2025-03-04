
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertTriangle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ContactFormValues } from '../types';

interface ContactPriorityProps {
  form: UseFormReturn<ContactFormValues>;
}

const ContactPriority: React.FC<ContactPriorityProps> = ({ form }) => {
  const { language } = useLanguage();

  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {language === 'en' ? 'Priority (1-10)' : 'Prioridad (1-10)'}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="number" 
                min={1} 
                max={10} 
                className="pl-10" 
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContactPriority;
