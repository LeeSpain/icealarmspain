
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { PlusCircle, Pencil, Trash, Phone, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmergencyContactsTabContentProps {
  editMode: boolean;
  questionnaireData: any;
}

const EmergencyContactsTabContent: React.FC<EmergencyContactsTabContentProps> = ({ 
  editMode,
  questionnaireData
}) => {
  const { language } = useLanguage();
  
  // Extract emergency contacts from questionnaire data
  const emergencyContacts = questionnaireData?.multiEntries?.emergencyContacts || [];
  const doctors = questionnaireData?.multiEntries?.doctors || [];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Emergency Contacts Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg">
                {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
              </h3>
              
              {editMode && (
                <Button size="sm" className="bg-ice-600 hover:bg-ice-700">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Add Contact' : 'Añadir Contacto'}
                </Button>
              )}
            </div>
            
            {emergencyContacts.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border">
                <p className="text-gray-500">
                  {language === 'en'
                    ? 'No emergency contacts have been added yet.'
                    : 'No se han añadido contactos de emergencia todavía.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {emergencyContacts.map((contact: any, index: number) => (
                  <ContactCard 
                    key={contact._id || index}
                    contact={contact}
                    editMode={editMode}
                    language={language === 'en' ? 'en' : 'es'}
                    isPrimary={index === 0}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Doctors Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg">
                {language === 'en' ? 'Medical Professionals' : 'Profesionales Médicos'}
              </h3>
              
              {editMode && (
                <Button size="sm" className="bg-ice-600 hover:bg-ice-700">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Add Doctor' : 'Añadir Médico'}
                </Button>
              )}
            </div>
            
            {doctors.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border">
                <p className="text-gray-500">
                  {language === 'en'
                    ? 'No medical professionals have been added yet.'
                    : 'No se han añadido profesionales médicos todavía.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {doctors.map((doctor: any, index: number) => (
                  <DoctorCard 
                    key={doctor._id || index}
                    doctor={doctor}
                    editMode={editMode}
                    language={language === 'en' ? 'en' : 'es'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ContactCardProps {
  contact: any;
  editMode: boolean;
  language: 'en' | 'es';
  isPrimary: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  editMode,
  language,
  isPrimary
}) => {
  return (
    <div className="p-4 border rounded-md bg-white relative">
      {editMode && (
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="icon" variant="ghost" className="h-7 w-7">
            <Pencil className="h-4 w-4 text-gray-500" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:text-red-700">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-ice-100 flex items-center justify-center text-ice-600 font-medium">
          {contact.name ? contact.name.charAt(0).toUpperCase() : '?'}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center">
            <div className="font-medium">{contact.name || '-'}</div>
            {isPrimary && (
              <Badge className="ml-2 bg-ice-600">
                {language === 'en' ? 'Primary' : 'Principal'}
              </Badge>
            )}
            <Badge className="ml-2 bg-gray-100 text-gray-700 border">
              {contact.relationship || '-'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1 text-sm">
              <Phone className="h-3 w-3" />
              <span>{contact.phone || '-'}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Mail className="h-3 w-3" />
              <span>{contact.email || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DoctorCardProps {
  doctor: any;
  editMode: boolean;
  language: 'en' | 'es';
}

const DoctorCard: React.FC<DoctorCardProps> = ({ 
  doctor, 
  editMode,
  language
}) => {
  return (
    <div className="p-4 border rounded-md bg-white relative">
      {editMode && (
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="icon" variant="ghost" className="h-7 w-7">
            <Pencil className="h-4 w-4 text-gray-500" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600 hover:text-red-700">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
          {doctor.name ? doctor.name.charAt(0).toUpperCase() : '?'}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center">
            <div className="font-medium">Dr. {doctor.name || '-'}</div>
            <Badge className="ml-2 bg-blue-100 text-blue-700 border border-blue-200">
              {doctor.specialty || '-'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1 text-sm">
              <Phone className="h-3 w-3" />
              <span>{doctor.phone || '-'}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Mail className="h-3 w-3" />
              <span>{doctor.email || '-'}</span>
            </div>
            
            {doctor.clinic && (
              <div className="flex items-center gap-1 text-sm md:col-span-2">
                <MapPin className="h-3 w-3" />
                <span>{doctor.clinic || '-'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactsTabContent;
