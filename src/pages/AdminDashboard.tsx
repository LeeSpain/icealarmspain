
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, Settings, Bell, ShieldAlert, Package, Activity, 
  User, Phone, Home, AlertTriangle, Mail, Key
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { ButtonCustom } from "@/components/ui/button-custom";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "alert";
  plan: "basic" | "premium" | "family";
  devices: string[];
  lastActivity: string;
  address: string;
  emergencyContacts: {
    name: string;
    relation: string;
    phone: string;
  }[];
  keyholders: {
    name: string;
    phone: string;
    hasKey: boolean;
  }[];
  medicalInfo: {
    conditions: string[];
    medications: string[];
    allergies: string[];
    bloodType: string;
  };
}

// Mock data for demonstration
const mockUsers: UserData[] = [
  {
    id: "u1",
    name: "María García",
    email: "maria@example.com",
    phone: "+34 612 345 678",
    status: "active",
    plan: "premium",
    devices: ["SOS Pendant", "Health Monitor", "Fall Detector"],
    lastActivity: "10 minutes ago",
    address: "Calle Mayor 12, Madrid, 28001",
    emergencyContacts: [
      {
        name: "Carlos García",
        relation: "Son",
        phone: "+34 623 456 789"
      },
      {
        name: "Laura García",
        relation: "Daughter",
        phone: "+34 634 567 890"
      }
    ],
    keyholders: [
      {
        name: "Carlos García",
        phone: "+34 623 456 789",
        hasKey: true
      },
      {
        name: "Neighbor - Ana López",
        phone: "+34 645 678 901",
        hasKey: true
      }
    ],
    medicalInfo: {
      conditions: ["Hypertension", "Diabetes Type 2"],
      medications: ["Metformin", "Lisinopril"],
      allergies: ["Penicillin"],
      bloodType: "A+"
    }
  },
  {
    id: "u2",
    name: "John Smith",
    email: "john@example.com",
    phone: "+34 678 901 234",
    status: "active",
    plan: "family",
    devices: ["SOS Pendant", "Health Monitor", "Fall Detector", "Door Sensor"],
    lastActivity: "1 hour ago",
    address: "Av. del Mediterráneo 15, Alicante, 03001",
    emergencyContacts: [
      {
        name: "Emma Smith",
        relation: "Wife",
        phone: "+34 689 012 345"
      }
    ],
    keyholders: [
      {
        name: "Emma Smith",
        phone: "+34 689 012 345",
        hasKey: true
      }
    ],
    medicalInfo: {
      conditions: ["Arrhythmia"],
      medications: ["Warfarin"],
      allergies: ["Sulfa drugs"],
      bloodType: "O-"
    }
  },
  {
    id: "u3",
    name: "Elizabeth Johnson",
    email: "elizabeth@example.com",
    phone: "+34 690 123 456",
    status: "alert",
    plan: "basic",
    devices: ["SOS Pendant"],
    lastActivity: "5 minutes ago",
    address: "Paseo de Gracia 43, Barcelona, 08007",
    emergencyContacts: [
      {
        name: "Michael Johnson",
        relation: "Son",
        phone: "+34 601 234 567"
      }
    ],
    keyholders: [
      {
        name: "Local Care Service",
        phone: "+34 612 345 678",
        hasKey: true
      }
    ],
    medicalInfo: {
      conditions: ["COPD", "Osteoporosis"],
      medications: ["Albuterol", "Calcium supplements"],
      allergies: ["Latex"],
      bloodType: "B+"
    }
  }
];

// Alerts mock data
const mockAlerts = [
  {
    id: "a1",
    userId: "u3",
    userName: "Elizabeth Johnson",
    type: "sos",
    timestamp: "2 minutes ago",
    status: "active",
    message: "SOS button pressed. Emergency contact notified."
  },
  {
    id: "a2",
    userId: "u1",
    userName: "María García",
    type: "fall",
    timestamp: "Yesterday at 8:45 PM",
    status: "resolved",
    message: "Potential fall detected. False alarm confirmed by user."
  },
  {
    id: "a3",
    userId: "u2",
    userName: "John Smith",
    type: "health",
    timestamp: "2 days ago",
    status: "resolved",
    message: "Irregular heartbeat detected. Medical team notified."
  }
];

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Show toast notification for active alerts
    const activeAlerts = alerts.filter(alert => alert.status === "active");
    if (activeAlerts.length > 0) {
      toast({
        title: language === 'en' ? "Active Alerts" : "Alertas Activas",
        description: language === 'en' 
          ? `There are ${activeAlerts.length} active alerts requiring attention.` 
          : `Hay ${activeAlerts.length} alertas activas que requieren atención.`,
        variant: "destructive"
      });
    }
  }, []);
  
  const handleUserSelect = (user: UserData) => {
    setSelectedUser(user);
  };
  
  const handleAlertAction = (alertId: string, action: "respond" | "resolve") => {
    if (action === "respond") {
      // In a real app, this would initiate a response protocol
      toast({
        title: language === 'en' ? "Response Initiated" : "Respuesta Iniciada",
        description: language === 'en' 
          ? "Emergency response team has been dispatched." 
          : "Se ha enviado al equipo de respuesta de emergencia."
      });
    } else {
      // Mark alert as resolved
      setAlerts(alerts.map(alert => 
        alert.id === alertId ? {...alert, status: "resolved"} : alert
      ));
      
      toast({
        title: language === 'en' ? "Alert Resolved" : "Alerta Resuelta",
        description: language === 'en' 
          ? "The alert has been marked as resolved." 
          : "La alerta ha sido marcada como resuelta."
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">
                {language === 'en' ? "Admin Dashboard" : "Panel de Administración"}
              </h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Bell className="w-6 h-6 text-muted-foreground" />
                  {alerts.filter(a => a.status === "active").length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {alerts.filter(a => a.status === "active").length}
                    </span>
                  )}
                </div>
                <Settings className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
            
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{language === 'en' ? "Members" : "Miembros"}</span>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{language === 'en' ? "Alerts" : "Alertas"}</span>
                  {alerts.filter(a => a.status === "active").length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {alerts.filter(a => a.status === "active").length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="devices" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>{language === 'en' ? "Devices" : "Dispositivos"}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Users list panel */}
                  <div className="col-span-1 glass-panel p-6 rounded-lg overflow-hidden">
                    <h2 className="text-xl font-semibold mb-4">
                      {language === 'en' ? "Members" : "Miembros"}
                    </h2>
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className="space-y-2">
                        {users.map(user => (
                          <div 
                            key={user.id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedUser?.id === user.id 
                                ? 'bg-ice-100 border-l-4 border-ice-500' 
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => handleUserSelect(user)}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium">{user.name}</h3>
                              <div className={`w-3 h-3 rounded-full ${
                                user.status === 'active' ? 'bg-green-500' : 
                                user.status === 'alert' ? 'bg-red-500' : 'bg-gray-400'
                              }`}></div>
                            </div>
                            <div className="text-sm text-muted-foreground mb-1">
                              {user.email}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.plan === 'basic' ? (
                                language === 'en' ? 'Basic Plan' : 'Plan Básico'
                              ) : user.plan === 'premium' ? (
                                language === 'en' ? 'Premium Plan' : 'Plan Premium'
                              ) : (
                                language === 'en' ? 'Family Plan' : 'Plan Familiar'
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {/* User details panel */}
                  <div className="col-span-1 lg:col-span-2 glass-panel p-6 rounded-lg">
                    {selectedUser ? (
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h2 className="text-2xl font-semibold">{selectedUser.name}</h2>
                            <p className="text-muted-foreground">
                              {selectedUser.plan === 'basic' ? (
                                language === 'en' ? 'Basic Plan' : 'Plan Básico'
                              ) : selectedUser.plan === 'premium' ? (
                                language === 'en' ? 'Premium Plan' : 'Plan Premium'
                              ) : (
                                language === 'en' ? 'Family Plan' : 'Plan Familiar'
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <ButtonCustom variant="outline" size="sm">
                              {language === 'en' ? "Edit" : "Editar"}
                            </ButtonCustom>
                            <ButtonCustom size="sm">
                              {language === 'en' ? "Contact" : "Contactar"}
                            </ButtonCustom>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                {language === 'en' ? "Contact Information" : "Información de Contacto"}
                              </h3>
                              <div className="space-y-2">
                                <div className="flex gap-2 items-center">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span>{selectedUser.email}</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{selectedUser.phone}</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <Home className="w-4 h-4 text-muted-foreground" />
                                  <span>{selectedUser.address}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                {language === 'en' ? "Devices" : "Dispositivos"}
                              </h3>
                              <div className="space-y-2">
                                {selectedUser.devices.map((device, idx) => (
                                  <div key={idx} className="flex justify-between items-center">
                                    <span>{device}</span>
                                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                      {language === 'en' ? "Active" : "Activo"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                {language === 'en' ? "Medical Information" : "Información Médica"}
                              </h3>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    {language === 'en' ? "Conditions" : "Condiciones"}
                                  </p>
                                  <p>{selectedUser.medicalInfo.conditions.join(", ")}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    {language === 'en' ? "Medications" : "Medicamentos"}
                                  </p>
                                  <p>{selectedUser.medicalInfo.medications.join(", ")}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    {language === 'en' ? "Allergies" : "Alergias"}
                                  </p>
                                  <p>{selectedUser.medicalInfo.allergies.join(", ")}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    {language === 'en' ? "Blood Type" : "Grupo Sanguíneo"}
                                  </p>
                                  <p>{selectedUser.medicalInfo.bloodType}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                {language === 'en' ? "Emergency Contacts" : "Contactos de Emergencia"}
                              </h3>
                              <div className="space-y-4">
                                {selectedUser.emergencyContacts.map((contact, idx) => (
                                  <div key={idx} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                    <p className="font-medium">{contact.name}</p>
                                    <p className="text-sm text-muted-foreground">{contact.relation}</p>
                                    <p className="text-sm">{contact.phone}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                {language === 'en' ? "Key Holders" : "Portadores de Llaves"}
                              </h3>
                              <div className="space-y-4">
                                {selectedUser.keyholders.map((keyholder, idx) => (
                                  <div key={idx} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                    <div className="flex justify-between">
                                      <p className="font-medium">{keyholder.name}</p>
                                      <div className="flex items-center gap-1">
                                        <Key className="w-3 h-3" />
                                        <span className="text-xs">
                                          {keyholder.hasKey ? 
                                            (language === 'en' ? "Has key" : "Tiene llave") : 
                                            (language === 'en' ? "No key" : "Sin llave")}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm">{keyholder.phone}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                {language === 'en' ? "Activity Log" : "Registro de Actividad"}
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>{language === 'en' ? "Last activity" : "Última actividad"}</span>
                                  <span>{selectedUser.lastActivity}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{language === 'en' ? "SOS button test" : "Prueba botón SOS"}</span>
                                  <span>{language === 'en' ? "3 days ago" : "Hace 3 días"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{language === 'en' ? "Account login" : "Inicio de sesión"}</span>
                                  <span>{language === 'en' ? "5 days ago" : "Hace 5 días"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <User className="w-12 h-12 text-muted-foreground/40 mb-4" />
                        <h3 className="text-xl font-medium mb-2">
                          {language === 'en' ? "No Member Selected" : "Ningún Miembro Seleccionado"}
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          {language === 'en' 
                            ? "Select a member from the list to view their detailed information and manage their account." 
                            : "Seleccione un miembro de la lista para ver su información detallada y gestionar su cuenta."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="alerts" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Active alerts panel */}
                  <div className="col-span-1 lg:col-span-2 glass-panel p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                      {language === 'en' ? "Active Alerts" : "Alertas Activas"}
                    </h2>
                    {alerts.filter(alert => alert.status === "active").length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                          <Check className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          {language === 'en' ? "No Active Alerts" : "Sin Alertas Activas"}
                        </h3>
                        <p className="text-muted-foreground">
                          {language === 'en' 
                            ? "There are currently no active alerts requiring attention." 
                            : "Actualmente no hay alertas activas que requieran atención."}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {alerts.filter(alert => alert.status === "active").map(alert => (
                          <div 
                            key={alert.id} 
                            className="p-4 border border-red-200 bg-red-50 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                <h3 className="font-medium">
                                  {alert.type === 'sos' 
                                    ? (language === 'en' ? 'SOS Alert' : 'Alerta SOS')
                                    : alert.type === 'fall'
                                    ? (language === 'en' ? 'Fall Detected' : 'Caída Detectada')
                                    : (language === 'en' ? 'Health Alert' : 'Alerta de Salud')}
                                </h3>
                              </div>
                              <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                            </div>
                            <p className="mb-2">{alert.userName} - {alert.message}</p>
                            <div className="flex gap-2 mt-3">
                              <ButtonCustom 
                                size="sm" 
                                onClick={() => handleAlertAction(alert.id, "respond")}
                              >
                                {language === 'en' ? "Respond" : "Responder"}
                              </ButtonCustom>
                              <ButtonCustom 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleAlertAction(alert.id, "resolve")}
                              >
                                {language === 'en' ? "Mark as Resolved" : "Marcar como Resuelto"}
                              </ButtonCustom>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <h2 className="text-xl font-semibold my-6">
                      {language === 'en' ? "Recent Alert History" : "Historial de Alertas Recientes"}
                    </h2>
                    <div className="space-y-3">
                      {alerts.filter(alert => alert.status === "resolved").map(alert => (
                        <div 
                          key={alert.id} 
                          className="p-3 border border-gray-200 bg-gray-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{alert.userName}</h3>
                              <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">
                                {alert.type === 'sos' 
                                  ? (language === 'en' ? 'SOS' : 'SOS')
                                  : alert.type === 'fall'
                                  ? (language === 'en' ? 'Fall' : 'Caída')
                                  : (language === 'en' ? 'Health' : 'Salud')}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                          </div>
                          <div className="text-xs text-right">
                            <div className="text-muted-foreground">{alert.timestamp}</div>
                            <div className="text-green-600">
                              {language === 'en' ? "Resolved" : "Resuelto"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Alert statistics panel */}
                  <div className="col-span-1 glass-panel p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                      {language === 'en' ? "Alert Statistics" : "Estadísticas de Alertas"}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">
                          {language === 'en' ? "Alert Types (Last 30 Days)" : "Tipos de Alertas (Últimos 30 Días)"}
                        </h3>
                        <div className="relative pt-1">
                          <div className="flex h-2 mb-4 overflow-hidden rounded bg-gray-200">
                            <div style={{ width: "65%" }} className="bg-red-500"></div>
                            <div style={{ width: "25%" }} className="bg-amber-500"></div>
                            <div style={{ width: "10%" }} className="bg-blue-500"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{language === 'en' ? "SOS (65%)" : "SOS (65%)"}</span>
                            <span>{language === 'en' ? "Fall (25%)" : "Caída (25%)"}</span>
                            <span>{language === 'en' ? "Health (10%)" : "Salud (10%)"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">
                          {language === 'en' ? "Response Time (Average)" : "Tiempo de Respuesta (Promedio)"}
                        </h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-ice-600">2.5</div>
                            <div className="text-xs text-muted-foreground">
                              {language === 'en' ? "minutes" : "minutos"}
                            </div>
                            <div className="text-xs">SOS</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-ice-600">3.2</div>
                            <div className="text-xs text-muted-foreground">
                              {language === 'en' ? "minutes" : "minutos"}
                            </div>
                            <div className="text-xs">
                              {language === 'en' ? "Fall" : "Caída"}
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-ice-600">5.8</div>
                            <div className="text-xs text-muted-foreground">
                              {language === 'en' ? "minutes" : "minutos"}
                            </div>
                            <div className="text-xs">
                              {language === 'en' ? "Health" : "Salud"}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">
                          {language === 'en' ? "Active Users with Alerts" : "Usuarios Activos con Alertas"}
                        </h3>
                        <div className="space-y-2">
                          {users.filter(user => user.status === "alert").map(user => (
                            <div 
                              key={user.id}
                              className="p-2 border-l-4 border-red-500 bg-red-50 rounded-r-lg flex justify-between items-center"
                            >
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.devices.join(", ")}</p>
                              </div>
                              <ButtonCustom size="sm" variant="outline" onClick={() => handleUserSelect(user)}>
                                {language === 'en' ? "View" : "Ver"}
                              </ButtonCustom>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="devices" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="glass-panel p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">SOS Pendant</h3>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {language === 'en' ? "87 Active" : "87 Activos"}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {language === 'en' 
                        ? "Emergency button with fall detection and GPS location tracking." 
                        : "Botón de emergencia con detección de caídas y seguimiento de ubicación GPS."}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "Battery Health (Avg)" : "Salud de Batería (Prom)"}</span>
                        <span>92%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "Signal Strength (Avg)" : "Fuerza de Señal (Prom)"}</span>
                        <span>89%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "Alerts (30 days)" : "Alertas (30 días)"}</span>
                        <span>43</span>
                      </div>
                    </div>
                    <ButtonCustom className="w-full">
                      {language === 'en' ? "Manage Devices" : "Gestionar Dispositivos"}
                    </ButtonCustom>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">Health Monitor</h3>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {language === 'en' ? "52 Active" : "52 Activos"}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {language === 'en' 
                        ? "Continuous health tracking with real-time vital sign monitoring." 
                        : "Seguimiento continuo de salud con monitoreo de signos vitales en tiempo real."}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "Battery Health (Avg)" : "Salud de Batería (Prom)"}</span>
                        <span>87%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "Data Sync Rate" : "Tasa de Sincronización"}</span>
                        <span>98%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "Alerts (30 days)" : "Alertas (30 días)"}</span>
                        <span>21</span>
                      </div>
                    </div>
                    <ButtonCustom className="w-full">
                      {language === 'en' ? "Manage Devices" : "Gestionar Dispositivos"}
                    </ButtonCustom>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">
                        {language === 'en' ? "Fall Detector" : "Detector de Caídas"}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {language === 'en' ? "63 Active" : "63 Activos"}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {language === 'en' 
                        ? "Advanced AI-powered fall detection with automatic alert system." 
                        : "Detección de caídas avanzada con IA y sistema de alerta automática."}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "Battery Health (Avg)" : "Salud de Batería (Prom)"}</span>
                        <span>90%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "False Positive Rate" : "Tasa de Falsos Positivos"}</span>
                        <span>3.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === 'en' ? "Alerts (30 days)" : "Alertas (30 días)"}</span>
                        <span>17</span>
                      </div>
                    </div>
                    <ButtonCustom className="w-full">
                      {language === 'en' ? "Manage Devices" : "Gestionar Dispositivos"}
                    </ButtonCustom>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
