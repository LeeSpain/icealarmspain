import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { UserPlus, Clipboard, Building, Mail, Phone, Check, X, Clock, Users, MapPin, Laptop } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";

// Define client interface 
interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: 'pending' | 'active' | 'inactive';
  createdAt: string;
  usersCount: number;
  devicesCount: number;
}

// Define client form data interface
interface ClientFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

const ClientOnboarding: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "c1",
      companyName: "Residencia El Pinar",
      contactName: "María García",
      email: "mgarcia@elpinar.es",
      phone: "+34 612 345 678",
      address: "Calle Alameda 23",
      city: "Barcelona",
      country: "Spain",
      status: "active",
      createdAt: "2023-06-15T10:30:00Z",
      usersCount: 24,
      devicesCount: 35
    },
    {
      id: "c2",
      companyName: "Centro Asistencial Las Flores",
      contactName: "Javier Rodríguez",
      email: "jrodriguez@lasflores.es",
      phone: "+34 623 456 789",
      address: "Avenida Principal 45",
      city: "Madrid",
      country: "Spain",
      status: "pending",
      createdAt: "2023-09-22T14:20:00Z",
      usersCount: 0,
      devicesCount: 0
    },
    {
      id: "c3",
      companyName: "Residencial Sol y Mar",
      contactName: "Ana Martínez",
      email: "amartinez@solymar.es",
      phone: "+34 634 567 890",
      address: "Paseo Marítimo 12",
      city: "Valencia",
      country: "Spain",
      status: "active",
      createdAt: "2023-04-10T09:15:00Z",
      usersCount: 18,
      devicesCount: 30
    }
  ]);
  
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { language } = useLanguage();
  
  // Client form
  const form = useForm<ClientFormData>({
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "Spain"
    }
  });
  
  // Filter clients based on active tab
  const getFilteredClients = () => {
    if (activeTab === "all") return clients;
    return clients.filter(client => client.status === activeTab);
  };
  
  // Translation helper
  const t = (key: string, fallback: string): string => {
    // Simple implementation - in a real app you'd use a proper i18n solution
    if (language === 'es') {
      const translations: Record<string, string> = {
        "Client Onboarding": "Incorporación de Clientes",
        "Add Client": "Añadir Cliente",
        "All": "Todos",
        "Active": "Activos",
        "Pending": "Pendientes",
        "Inactive": "Inactivos",
        "Company": "Empresa",
        "Contact": "Contacto",
        "Status": "Estado",
        "Users": "Usuarios",
        "Devices": "Dispositivos",
        "Actions": "Acciones",
        "View": "Ver",
        "Complete Setup": "Completar",
        "New Client": "Nuevo Cliente",
        "Add a new client to the system": "Añadir un nuevo cliente al sistema",
        "Company Name": "Nombre de la Empresa",
        "Contact Name": "Nombre de Contacto",
        "Email": "Correo Electrónico",
        "Phone": "Teléfono",
        "Address": "Dirección",
        "City": "Ciudad",
        "Country": "País",
        "Cancel": "Cancelar",
        "Save Client": "Guardar Cliente",
        "Client added successfully": "Cliente añadido correctamente",
        "Please fill out all required fields": "Por favor complete todos los campos requeridos"
      };
      return translations[fallback] || fallback;
    }
    return fallback;
  };
  
  // Handle form submission
  const onSubmit = (data: ClientFormData) => {
    const newClient: Client = {
      id: `c${clients.length + 1}`,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      usersCount: 0,
      devicesCount: 0
    };
    
    setClients([...clients, newClient]);
    setIsAddClientDialogOpen(false);
    form.reset();
    
    toast.success(t("Client added successfully", "Client added successfully"));
  };
  
  // Get status badge color and text
  const getStatusBadge = (status: 'pending' | 'active' | 'inactive') => {
    switch(status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="w-3 h-3 mr-1" />
            {t("Active", "Active")}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            {t("Pending", "Pending")}
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <X className="w-3 h-3 mr-1" />
            {t("Inactive", "Inactive")}
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {t("Client Onboarding", "Client Onboarding")}
          </h2>
          <p className="text-muted-foreground">
            {t("Manage client accounts and onboarding process", "Manage client accounts and onboarding process")}
          </p>
        </div>
        <Button onClick={() => setIsAddClientDialogOpen(true)} className="flex items-center gap-2">
          <UserPlus size={16} />
          {t("Add Client", "Add Client")}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">{t("All", "All")}</TabsTrigger>
          <TabsTrigger value="active">{t("Active", "Active")}</TabsTrigger>
          <TabsTrigger value="pending">{t("Pending", "Pending")}</TabsTrigger>
          <TabsTrigger value="inactive">{t("Inactive", "Inactive")}</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {getFilteredClients().map(client => (
          <Card key={client.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{client.companyName}</CardTitle>
                  <CardDescription>{client.city}, {client.country}</CardDescription>
                </div>
                {getStatusBadge(client.status)}
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{t("Users", "Users")}: {client.usersCount}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Laptop className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{t("Devices", "Devices")}: {client.devicesCount}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{client.address}</span>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="pt-4 justify-between">
              <Button variant="outline" size="sm">
                {t("View", "View")}
              </Button>
              {client.status === 'pending' && (
                <Button size="sm" className="bg-ice-600 hover:bg-ice-700">
                  {t("Complete Setup", "Complete Setup")}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Add Client Dialog */}
      <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t("New Client", "New Client")}</DialogTitle>
            <DialogDescription>
              {t("Add a new client to the system", "Add a new client to the system")}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Company Name", "Company Name")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Contact Name", "Contact Name")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact person name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Email", "Email")}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@company.com" {...field} />
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
                      <FormLabel>{t("Phone", "Phone")}</FormLabel>
                      <FormControl>
                        <Input placeholder="+34 612 345 678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Address", "Address")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("City", "City")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Country", "Country")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Spain">Spain</SelectItem>
                          <SelectItem value="Portugal">Portugal</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Italy">Italy</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddClientDialogOpen(false)}
                >
                  {t("Cancel", "Cancel")}
                </Button>
                <Button type="submit">{t("Save Client", "Save Client")}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientOnboarding;
