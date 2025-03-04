
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Contact } from './types';
import { Mail, Phone, User, Bell, BellOff, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  isSelected,
  onSelect 
}) => {
  const { language } = useLanguage();
  
  const renderPriorityIndicator = (priority: number) => {
    let colorClass = "bg-gray-500";
    
    if (priority <= 2) {
      colorClass = "bg-red-500"; // High priority
    } else if (priority <= 5) {
      colorClass = "bg-amber-500"; // Medium priority
    } else {
      colorClass = "bg-blue-500"; // Low priority
    }
    
    return (
      <div className="flex items-center">
        <span className={`h-3 w-3 rounded-full ${colorClass} mr-1.5`}></span>
        <span className="text-sm text-muted-foreground">
          {language === 'en' ? 'Priority' : 'Prioridad'}: {priority}
        </span>
      </div>
    );
  };
  
  return (
    <Card 
      onClick={onSelect}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-ice-500 shadow-md' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1">
            <h3 className="font-medium flex items-center">
              <User className="h-4 w-4 mr-1.5 text-ice-600" />
              {contact.name}
            </h3>
            <Badge variant="outline">
              {contact.relationship}
            </Badge>
          </div>
          {renderPriorityIndicator(contact.priority)}
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            <span className="truncate">{contact.email}</span>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 pt-3 border-t">
          <div className="flex items-center">
            {contact.receivesAlerts ? (
              <Bell className="h-4 w-4 mr-1.5 text-green-500" />
            ) : (
              <BellOff className="h-4 w-4 mr-1.5 text-gray-400" />
            )}
            <span className="text-xs text-muted-foreground">
              {language === 'en' ? 'Alerts' : 'Alertas'}
            </span>
          </div>
          <div className="flex items-center">
            {contact.receivesUpdates ? (
              <CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-1.5 text-gray-400" />
            )}
            <span className="text-xs text-muted-foreground">
              {language === 'en' ? 'Updates' : 'Actualizaciones'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
