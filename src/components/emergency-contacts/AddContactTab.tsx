
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Bell } from "lucide-react";

interface AddContactTabProps {
  newContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
    priority: number;
    receivesAlerts: boolean;
    receivesUpdates: boolean;
  };
  onInputChange: (field: string, value: string | number | boolean) => void;
  onAddContact: () => void;
  language: 'en' | 'es';
  relations: {[key: string]: string};
}

const AddContactTab: React.FC<AddContactTabProps> = ({
  newContact,
  onInputChange,
  onAddContact,
  language,
  relations
}) => {
  const ct = language === 'en' ? {
    addContact: "Add Contact",
    description: "Add a new emergency contact to be notified in case of emergencies",
    name: "Full Name",
    relationship: "Relationship",
    phone: "Phone Number",
    email: "Email Address",
    priority: "Priority",
    notificationPreferences: "Notification Preferences",
    alerts: "Emergency Alerts",
    updates: "Regular Updates"
  } : {
    addContact: "Agregar Contacto",
    description: "Agregue un nuevo contacto de emergencia para ser notificado en caso de emergencias",
    name: "Nombre Completo",
    relationship: "Relación",
    phone: "Número de Teléfono",
    email: "Dirección de Email",
    priority: "Prioridad",
    notificationPreferences: "Preferencias de Notificación",
    alerts: "Alertas de Emergencia",
    updates: "Actualizaciones Regulares"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ct.addContact}</CardTitle>
        <CardDescription>{ct.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{ct.name}</Label>
            <Input 
              id="name" 
              value={newContact.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              placeholder={language === 'en' ? "John Doe" : "Juan Pérez"}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relationship">{ct.relationship}</Label>
            <Select 
              value={newContact.relationship}
              onValueChange={(value) => onInputChange("relationship", value)}
            >
              <SelectTrigger id="relationship">
                <SelectValue placeholder={ct.relationship} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(relations).map(([key, value]) => (
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
              onChange={(e) => onInputChange("phone", e.target.value)}
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
              onChange={(e) => onInputChange("email", e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">{ct.priority}</Label>
            <Select 
              value={newContact.priority.toString()}
              onValueChange={(value) => onInputChange("priority", parseInt(value))}
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
              onCheckedChange={(checked) => onInputChange("receivesAlerts", checked)}
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
              onCheckedChange={(checked) => onInputChange("receivesUpdates", checked)}
            />
          </div>
        </div>
        
        <Button onClick={onAddContact} className="w-full mt-6">
          {ct.addContact}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddContactTab;
