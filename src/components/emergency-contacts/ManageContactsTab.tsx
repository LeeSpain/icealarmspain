import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ContactCard from './ContactCard';
import { Contact } from './types';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Phone, Mail, Users, AlertTriangle, Bell, Pencil, Trash2, Check, X } from 'lucide-react';

interface ManageContactsTabProps {
  contacts: Contact[];
  isLoading: boolean;
  selectedContactId: string | null;
  onSelectContact: (id: string | null) => void;
  onUpdateContact: (id: string, updatedContact: Partial<Contact>) => Promise<boolean>;
  onDeleteContact: (id: string) => Promise<boolean>;
}

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

const ManageContactsTab: React.FC<ManageContactsTabProps> = ({
  contacts,
  isLoading,
  selectedContactId,
  onSelectContact,
  onUpdateContact,
  onDeleteContact,
}) => {
  const { language } = useLanguage();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedContact = contacts.find(c => c.id === selectedContactId);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: selectedContact ? {
      name: selectedContact.name,
      relationship: selectedContact.relationship,
      phone: selectedContact.phone,
      email: selectedContact.email,
      priority: selectedContact.priority,
      receivesAlerts: selectedContact.receivesAlerts,
      receivesUpdates: selectedContact.receivesUpdates,
    } : {
      name: '',
      relationship: '',
      phone: '',
      email: '',
      priority: 3,
      receivesAlerts: true,
      receivesUpdates: true,
    },
  });

  React.useEffect(() => {
    if (selectedContact) {
      form.reset({
        name: selectedContact.name,
        relationship: selectedContact.relationship,
        phone: selectedContact.phone,
        email: selectedContact.email,
        priority: selectedContact.priority,
        receivesAlerts: selectedContact.receivesAlerts,
        receivesUpdates: selectedContact.receivesUpdates,
      });
    }
  }, [selectedContact, form]);

  const handleEditContact = async (data: ContactFormValues) => {
    if (!selectedContactId) return;
    
    setIsUpdating(true);
    try {
      const success = await onUpdateContact(selectedContactId, data);
      if (success) {
        setEditDialogOpen(false);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteContact = async () => {
    if (!selectedContactId) return;
    
    setIsDeleting(true);
    try {
      const success = await onDeleteContact(selectedContactId);
      if (success) {
        setDeleteDialogOpen(false);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Manage Contacts' : 'Gestionar Contactos'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'View, edit or delete your emergency contacts.'
              : 'Ver, editar o eliminar tus contactos de emergencia.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-ice-600" />
        </CardContent>
      </Card>
    );
  }

  if (contacts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'No Contacts Found' : 'No Se Encontraron Contactos'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'You have not added any emergency contacts yet.'
              : 'Aún no has añadido ningún contacto de emergencia.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8 text-center">
          <p className="mb-4 text-muted-foreground">
            {language === 'en'
              ? 'Add emergency contacts to ensure help can be provided quickly in case of an emergency.'
              : 'Añade contactos de emergencia para asegurar que se pueda proporcionar ayuda rápidamente en caso de emergencia.'}
          </p>
          <ButtonCustom onClick={() => window.location.hash = '#add-contact'}>
            {language === 'en' ? 'Add Contact' : 'Añadir Contacto'}
          </ButtonCustom>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            isSelected={contact.id === selectedContactId}
            onSelect={() => onSelectContact(contact.id)}
          />
        ))}
      </div>

      {selectedContact && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  {selectedContact.name}
                  <Badge variant="outline" className="ml-2">
                    {selectedContact.relationship}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Priority level:' : 'Nivel de prioridad:'} {selectedContact.priority}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <ButtonCustom variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                      <Pencil className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Edit' : 'Editar'}
                    </ButtonCustom>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>
                        {language === 'en' ? 'Edit Contact' : 'Editar Contacto'}
                      </DialogTitle>
                      <DialogDescription>
                        {language === 'en'
                          ? 'Update the information for this emergency contact.'
                          : 'Actualiza la información de este contacto de emergencia.'}
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleEditContact)} className="space-y-6">
                        <div className="space-y-4">
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <DialogFooter>
                          <ButtonCustom 
                            type="submit" 
                            isLoading={isUpdating}
                            disabled={isUpdating}
                          >
                            {!isUpdating && (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                {language === 'en' ? 'Save Changes' : 'Guardar Cambios'}
                              </>
                            )}
                            {isUpdating && (language === 'en' ? 'Saving...' : 'Guardando...')}
                          </ButtonCustom>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <ButtonCustom variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                      <Trash2 className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Delete' : 'Eliminar'}
                    </ButtonCustom>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {language === 'en' ? 'Delete Contact' : 'Eliminar Contacto'}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {language === 'en'
                          ? 'Are you sure you want to delete this contact? This action cannot be undone.'
                          : '¿Estás seguro de que quieres eliminar este contacto? Esta acción no se puede deshacer.'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        {language === 'en' ? 'Cancel' : 'Cancelar'}
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteContact();
                        }}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          language === 'en' ? 'Delete' : 'Eliminar'
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-ice-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Phone' : 'Teléfono'}
                    </p>
                    <p>{selectedContact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-ice-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Email' : 'Correo Electrónico'}
                    </p>
                    <p>{selectedContact.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-ice-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Emergency Alerts' : 'Alertas de Emergencia'}
                    </p>
                    <p>
                      {selectedContact.receivesAlerts 
                        ? (language === 'en' ? 'Enabled' : 'Habilitado')
                        : (language === 'en' ? 'Disabled' : 'Deshabilitado')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-ice-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Status Updates' : 'Actualizaciones de Estado'}
                    </p>
                    <p>
                      {selectedContact.receivesUpdates 
                        ? (language === 'en' ? 'Enabled' : 'Habilitado')
                        : (language === 'en' ? 'Disabled' : 'Deshabilitado')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageContactsTab;
