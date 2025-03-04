
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import MemberSidebar from "@/components/member/MemberSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  UserPlus, 
  UserX, 
  Bell, 
  BellOff, 
  Clock, 
  Phone, 
  Mail, 
  User,
  Send 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
  receivesAlerts: boolean;
  receivesUpdates: boolean;
}

const EmergencyContactsPage: React.FC = () => {
  const { language } = useLanguage();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Maria Rodriguez",
      relationship: "Daughter",
      phone: "+1 (555) 123-4567",
      email: "maria@example.com",
      priority: 1,
      receivesAlerts: true,
      receivesUpdates: true
    },
    {
      id: "2",
      name: "James Smith",
      relationship: "Son",
      phone: "+1 (555) 987-6543",
      email: "james@example.com",
      priority: 2,
      receivesAlerts: true,
      receivesUpdates: false
    }
  ]);
  
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "family",
    phone: "",
    email: "",
    priority: 3,
    receivesAlerts: true,
    receivesUpdates: true
  });
  
  const [activeTab, setActiveTab] = useState<string>("manage");
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: language === 'en' ? "Required fields missing" : "Faltan campos requeridos",
        description: language === 'en' 
          ? "Please provide at least a name and phone number" 
          : "Por favor proporcione al menos un nombre y número de teléfono",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.random().toString(36).substring(2, 9);
    setContacts([...contacts, { ...newContact, id: newId }]);
    
    // Reset form
    setNewContact({
      name: "",
      relationship: "family",
      phone: "",
      email: "",
      priority: Math.max(...contacts.map(c => c.priority), 0) + 1,
      receivesAlerts: true,
      receivesUpdates: true
    });
    
    toast({
      title: language === 'en' ? "Contact added" : "Contacto agregado",
      description: language === 'en' 
        ? "Emergency contact has been added successfully" 
        : "El contacto de emergencia ha sido agregado exitosamente"
    });
  };
  
  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    
    toast({
      title: language === 'en' ? "Contact removed" : "Contacto eliminado",
      description: language === 'en' 
        ? "Emergency contact has been removed" 
        : "El contacto de emergencia ha sido eliminado"
    });
  };
  
  const handleToggleSetting = (id: string, setting: 'receivesAlerts' | 'receivesUpdates') => {
    setContacts(contacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, [setting]: !contact[setting] };
      }
      return contact;
    }));
  };
  
  const handleTestAlerts = () => {
    setTestStatus('sending');
    
    // Simulate sending test alerts
    setTimeout(() => {
      setTestStatus('success');
      
      toast({
        title: language === 'en' ? "Test alerts sent" : "Alertas de prueba enviadas",
        description: language === 'en' 
          ? "Test emergency alerts have been sent to all configured contacts" 
          : "Se han enviado alertas de emergencia de prueba a todos los contactos configurados"
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setTestStatus('idle');
      }, 3000);
    }, 2000);
  };
  
  const content = {
    en: {
      title: "Emergency Contacts",
      subtitle: "Manage the people who will be notified in case of emergency",
      tabManage: "Manage Contacts",
      tabAdd: "Add Contact",
      tabTest: "Test Alerts",
      noContacts: "No emergency contacts added yet",
      addFirst: "Add your first contact",
      relationship: "Relationship",
      priority: "Priority",
      testAlertsDescription: "Send a test emergency alert to verify your contacts receive notifications correctly",
      sendTestAlert: "Send Test Alert",
      testingAlert: "Sending test alerts...",
      testSuccess: "Test completed successfully",
      alertsWillBeSent: "Alerts will be sent to:",
      noContactsForTest: "No contacts configured to receive alerts",
      addContactFirst: "Please add contacts and enable alerts first",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      alerts: "Emergency Alerts",
      updates: "Regular Updates",
      addContact: "Add Contact",
      contactDetails: "Contact Details",
      notificationPreferences: "Notification Preferences",
      relations: {
        family: "Family Member",
        friend: "Friend",
        neighbor: "Neighbor",
        caregiver: "Caregiver",
        doctor: "Doctor",
        other: "Other"
      }
    },
    es: {
      title: "Contactos de Emergencia",
      subtitle: "Administre las personas que serán notificadas en caso de emergencia",
      tabManage: "Administrar Contactos",
      tabAdd: "Agregar Contacto",
      tabTest: "Probar Alertas",
      noContacts: "Aún no se han agregado contactos de emergencia",
      addFirst: "Agregue su primer contacto",
      relationship: "Relación",
      priority: "Prioridad",
      testAlertsDescription: "Envíe una alerta de emergencia de prueba para verificar que sus contactos reciban las notificaciones correctamente",
      sendTestAlert: "Enviar Alerta de Prueba",
      testingAlert: "Enviando alertas de prueba...",
      testSuccess: "Prueba completada exitosamente",
      alertsWillBeSent: "Se enviarán alertas a:",
      noContactsForTest: "No hay contactos configurados para recibir alertas",
      addContactFirst: "Por favor agregue contactos y habilite las alertas primero",
      name: "Nombre Completo",
      phone: "Número de Teléfono",
      email: "Dirección de Email",
      alerts: "Alertas de Emergencia",
      updates: "Actualizaciones Regulares",
      addContact: "Agregar Contacto",
      contactDetails: "Detalles del Contacto",
      notificationPreferences: "Preferencias de Notificación",
      relations: {
        family: "Familiar",
        friend: "Amigo",
        neighbor: "Vecino",
        caregiver: "Cuidador",
        doctor: "Doctor",
        other: "Otro"
      }
    }
  };
  
  const ct = language === 'en' ? content.en : content.es;
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ice-800">{ct.title}</h1>
            <p className="text-muted-foreground">{ct.subtitle}</p>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="manage" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manage">{ct.tabManage}</TabsTrigger>
              <TabsTrigger value="add">{ct.tabAdd}</TabsTrigger>
              <TabsTrigger value="test">{ct.tabTest}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manage" className="space-y-6">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <Card key={contact.id} className="overflow-hidden">
                    <CardHeader className="bg-ice-50 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            <User className="h-5 w-5 mr-2 text-ice-600" />
                            {contact.name}
                          </CardTitle>
                          <CardDescription>
                            {ct.relations[contact.relationship as keyof typeof ct.relations] || contact.relationship}
                            {contact.priority === 1 && (
                              <Badge variant="outline" className="ml-2 bg-orange-50 text-orange-700 border-orange-200">
                                Primary
                              </Badge>
                            )}
                          </CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <UserX className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">{ct.contactDetails}</h4>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{contact.phone}</span>
                          </div>
                          {contact.email && (
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{contact.email}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {language === 'en' ? 'Priority' : 'Prioridad'}: {contact.priority}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-muted-foreground">{ct.notificationPreferences}</h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                              <span>{ct.alerts}</span>
                            </div>
                            <Switch 
                              checked={contact.receivesAlerts}
                              onCheckedChange={() => handleToggleSetting(contact.id, 'receivesAlerts')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Bell className="h-4 w-4 mr-2 text-blue-500" />
                              <span>{ct.updates}</span>
                            </div>
                            <Switch 
                              checked={contact.receivesUpdates}
                              onCheckedChange={() => handleToggleSetting(contact.id, 'receivesUpdates')}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-ice-100 p-3 mb-4">
                    <UserPlus className="h-6 w-6 text-ice-600" />
                  </div>
                  <h3 className="mb-2 font-medium">{ct.noContacts}</h3>
                  <p className="text-muted-foreground mb-4">{ct.addFirst}</p>
                  <Button onClick={() => setActiveTab("add")}>
                    {ct.tabAdd}
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>{ct.tabAdd}</CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? "Add a new emergency contact to be notified in case of emergencies" 
                      : "Agregue un nuevo contacto de emergencia para ser notificado en caso de emergencias"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{ct.name}</Label>
                      <Input 
                        id="name" 
                        value={newContact.name}
                        onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                        placeholder={language === 'en' ? "John Doe" : "Juan Pérez"}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="relationship">{ct.relationship}</Label>
                      <Select 
                        value={newContact.relationship}
                        onValueChange={(value) => setNewContact({...newContact, relationship: value})}
                      >
                        <SelectTrigger id="relationship">
                          <SelectValue placeholder={ct.relationship} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(ct.relations).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{ct.phone}</Label>
                      <Input 
                        id="phone" 
                        value={newContact.phone}
                        onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{ct.email}</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                        placeholder="email@example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="priority">{ct.priority}</Label>
                      <Select 
                        value={newContact.priority.toString()}
                        onValueChange={(value) => setNewContact({...newContact, priority: parseInt(value)})}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder={ct.priority} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - Primary</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5 - Lowest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-medium">{ct.notificationPreferences}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                        <Label htmlFor="receives-alerts" className="cursor-pointer">
                          {ct.alerts}
                        </Label>
                      </div>
                      <Switch 
                        id="receives-alerts"
                        checked={newContact.receivesAlerts}
                        onCheckedChange={(checked) => setNewContact({...newContact, receivesAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 mr-2 text-blue-500" />
                        <Label htmlFor="receives-updates" className="cursor-pointer">
                          {ct.updates}
                        </Label>
                      </div>
                      <Switch 
                        id="receives-updates"
                        checked={newContact.receivesUpdates}
                        onCheckedChange={(checked) => setNewContact({...newContact, receivesUpdates: checked})}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleAddContact} className="w-full mt-6">
                    {ct.addContact}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="test">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Test Emergency Alerts' : 'Probar Alertas de Emergencia'}
                  </CardTitle>
                  <CardDescription>
                    {ct.testAlertsDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contacts.some(c => c.receivesAlerts) ? (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">{ct.alertsWillBeSent}</h3>
                        <div className="space-y-2">
                          {contacts
                            .filter(c => c.receivesAlerts)
                            .sort((a, b) => a.priority - b.priority)
                            .map(contact => (
                              <div key={contact.id} className="flex items-center p-2 bg-ice-50 rounded-md">
                                <User className="h-5 w-5 mr-2 text-ice-600" />
                                <div className="flex-1">
                                  <div className="font-medium">{contact.name}</div>
                                  <div className="text-sm text-muted-foreground">{contact.phone}</div>
                                </div>
                                {contact.priority === 1 && (
                                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                    Primary
                                  </Badge>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleTestAlerts}
                        className="w-full"
                        disabled={testStatus !== 'idle'}
                      >
                        {testStatus === 'idle' && (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            {ct.sendTestAlert}
                          </>
                        )}
                        {testStatus === 'sending' && (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            {ct.testingAlert}
                          </>
                        )}
                        {testStatus === 'success' && (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            {ct.testSuccess}
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="rounded-full bg-ice-100 p-3 mb-4">
                        <BellOff className="h-6 w-6 text-ice-600" />
                      </div>
                      <h3 className="mb-2 font-medium">{ct.noContactsForTest}</h3>
                      <p className="text-muted-foreground mb-4">{ct.addContactFirst}</p>
                      <Button onClick={() => setActiveTab("add")}>
                        {ct.tabAdd}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default EmergencyContactsPage;
