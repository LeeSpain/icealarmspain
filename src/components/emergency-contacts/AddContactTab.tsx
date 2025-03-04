
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, User, Phone, Mail, Users, AlertTriangle, Bell } from 'lucide-react';
import { Contact } from './types';

// Form schema with validation
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
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface AddContactTabProps {
  onAddContact: (contact: Omit<Contact, 'id'>) => Promise<boolean>;
}

const AddContactTab: React.FC<AddContactTabProps> = ({ onAddContact }) => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values
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
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="receivesAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel>
                        {language === 'en' ? 'Emergency Alerts' : 'Alertas de Emergencia'}
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Receive notifications during emergencies'
                          : 'Recibir notificaciones durante emergencias'}
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receivesUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel>
                        {language === 'en' ? 'Status Updates' : 'Actualizaciones de Estado'}
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en'
                          ? 'Receive regular status updates and notifications'
                          : 'Recibir actualizaciones regulares de estado y notificaciones'}
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <CardFooter className="px-0 pt-6">
              <ButtonCustom 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {!isSubmitting && (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Add Emergency Contact' : 'Añadir Contacto de Emergencia'}
                  </>
                )}
                {isSubmitting && (language === 'en' ? 'Adding contact...' : 'Añadiendo contacto...')}
              </ButtonCustom>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddContactTab;
