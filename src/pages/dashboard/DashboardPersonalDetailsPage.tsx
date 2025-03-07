
import React, { useState, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { User, Phone, MapPin, Stethoscope, Clock, Heart } from "lucide-react";

// Define the form schema with Zod
const personalDetailsSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  nie: z.string().optional(),
  passport: z.string().optional(),
  emergencyContact: z.string().min(5, { message: "Emergency contact is required" }),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),
  notes: z.string().optional(),
});

type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

const DashboardPersonalDetailsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the form
  const form = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      dob: "",
      nie: "",
      passport: "",
      emergencyContact: "",
      bloodType: "",
      allergies: "",
      medicalConditions: "",
      medications: "",
      notes: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: PersonalDetailsFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data submitted:", data);
      toast.success(
        language === 'en' 
          ? "Personal details saved successfully!" 
          : "¡Datos personales guardados con éxito!"
      );
      setIsLoading(false);
      
      // In a real application, you would update the user profile in the database
      // updateUserProfile(user.id, data)
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Complete Personal Details' : 'Completar Datos Personales'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'This information is crucial for emergency services' 
                : 'Esta información es crucial para los servicios de emergencia'}
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Basic Information' : 'Información Básica'}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Your personal identification details' 
                      : 'Tus datos de identificación personal'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                            <Input {...field} />
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
                            <Input {...field} type="email" />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' ? 'Date of Birth' : 'Fecha de Nacimiento'}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nie"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' ? 'NIE Number' : 'Número NIE'}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="passport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' ? 'Passport Number' : 'Número de Pasaporte'}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Contact & Address' : 'Contacto y Dirección'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' ? 'Full Address' : 'Dirección Completa'}
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' ? 'Emergency Contact' : 'Contacto de Emergencia'}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={language === 'en' ? "Name and phone number" : "Nombre y número de teléfono"} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Medical Information' : 'Información Médica'}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Important health details for emergency responders' 
                      : 'Detalles de salud importantes para servicios de emergencia'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' ? 'Blood Type' : 'Grupo Sanguíneo'}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' ? 'Allergies' : 'Alergias'}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="medicalConditions"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>
                            {language === 'en' ? 'Medical Conditions' : 'Condiciones Médicas'}
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="medications"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>
                            {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'}
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>
                            {language === 'en' ? 'Additional Notes' : 'Notas Adicionales'}
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-ice-600 hover:bg-ice-700" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 animate-spin mr-2" />
                      {language === 'en' ? 'Saving...' : 'Guardando...'}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Save Details' : 'Guardar Detalles'}
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DashboardPersonalDetailsPage;
