
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Users, Phone, Mail } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface ContactBasicInfoProps {
  form: UseFormReturn<{
    name: string;
    relationship: string;
    phone: string;
    email: string;
    priority: number;
    receivesAlerts: boolean;
    receivesUpdates: boolean;
  }>;
}

const ContactBasicInfo: React.FC<ContactBasicInfoProps> = ({ form }) => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {language === 'en' ? 'Full Name' : 'Nombre Completo'}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  placeholder={language === 'en' ? "John Doe" : "Juan Pérez"} 
                  className="pl-10" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="relationship"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {language === 'en' ? 'Relationship' : 'Parentesco'}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger className="pl-10 w-full">
                    <SelectValue placeholder={language === 'en' ? "Select relationship" : "Seleccionar parentesco"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spouse">{language === 'en' ? "Spouse" : "Cónyuge"}</SelectItem>
                    <SelectItem value="Partner">{language === 'en' ? "Partner" : "Pareja"}</SelectItem>
                    <SelectItem value="Parent">{language === 'en' ? "Parent" : "Padre/Madre"}</SelectItem>
                    <SelectItem value="Child">{language === 'en' ? "Child" : "Hijo/a"}</SelectItem>
                    <SelectItem value="Sibling">{language === 'en' ? "Sibling" : "Hermano/a"}</SelectItem>
                    <SelectItem value="Friend">{language === 'en' ? "Friend" : "Amigo/a"}</SelectItem>
                    <SelectItem value="Caregiver">{language === 'en' ? "Caregiver" : "Cuidador/a"}</SelectItem>
                    <SelectItem value="Doctor">{language === 'en' ? "Doctor" : "Médico"}</SelectItem>
                    <SelectItem value="Other">{language === 'en' ? "Other" : "Otro"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  placeholder="+34 612 345 678" 
                  className="pl-10" 
                  {...field}
                  type="tel"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  placeholder={language === 'en' ? "john.doe@example.com" : "juan.perez@ejemplo.com"} 
                  className="pl-10" 
                  {...field}
                  type="email" 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactBasicInfo;
