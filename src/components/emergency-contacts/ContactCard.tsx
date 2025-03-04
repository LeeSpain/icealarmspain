
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  UserX, 
  Bell, 
  Phone, 
  Mail, 
  User,
  Clock 
} from "lucide-react";

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

interface ContactCardProps {
  contact: Contact;
  language: 'en' | 'es';
  onDelete: (id: string) => void;
  onToggleSetting: (id: string, setting: 'receivesAlerts' | 'receivesUpdates') => void;
  relations: {[key: string]: string};
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  language, 
  onDelete, 
  onToggleSetting,
  relations
}) => {
  const ct = {
    contactDetails: language === 'en' ? "Contact Details" : "Detalles del Contacto",
    notificationPreferences: language === 'en' ? "Notification Preferences" : "Preferencias de Notificación",
    alerts: language === 'en' ? "Emergency Alerts" : "Alertas de Emergencia",
    updates: language === 'en' ? "Regular Updates" : "Actualizaciones Regulares",
    priority: language === 'en' ? "Priority" : "Prioridad"
  };
  
  return (
    <Card key={contact.id} className="overflow-hidden">
      <CardHeader className="bg-ice-50 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-ice-600" />
              {contact.name}
            </CardTitle>
            <CardDescription>
              {relations[contact.relationship] || contact.relationship}
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
            onClick={() => onDelete(contact.id)}
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
                {ct.priority}: {contact.priority}
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
                onCheckedChange={() => onToggleSetting(contact.id, 'receivesAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-2 text-blue-500" />
                <span>{ct.updates}</span>
              </div>
              <Switch 
                checked={contact.receivesUpdates}
                onCheckedChange={() => onToggleSetting(contact.id, 'receivesUpdates')}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
