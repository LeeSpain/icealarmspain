
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Phone, Edit, Save } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import PersonalDetailsTabContent from "@/components/personal-details/PersonalDetailsTabContent";
import EmergencyContactsTabContent from "@/components/personal-details/EmergencyContactsTabContent";

const PersonalDetailsPage: React.FC = () => {
  const { language } = useLanguage();
  const [editMode, setEditMode] = useState(false);
  
  // Mock questionnaire data
  const mockQuestionnaireData = {
    personal: {
      fullName: "Elena Martinez",
      dob: "1965-07-15",
      gender: "Female",
      nationalId: "X1234567Z",
      bloodType: "O+",
      phone: "+34 612 345 678"
    },
    address: {
      street: "Calle Serrano 123",
      city: "Madrid",
      postalCode: "28006",
      province: "Madrid"
    },
    multiEntries: {
      emergencyContacts: [
        {
          _id: "ec1",
          name: "Carlos Martinez",
          relationship: "Son",
          phone: "+34 623 456 789",
          email: "carlos@example.com"
        },
        {
          _id: "ec2",
          name: "Ana Lopez",
          relationship: "Neighbor",
          phone: "+34 634 567 890",
          email: "ana@example.com"
        }
      ],
      doctors: [
        {
          _id: "dr1",
          name: "Manuel Gomez",
          specialty: "General Practitioner",
          phone: "+34 912 345 678",
          email: "dr.gomez@clinic.es",
          clinic: "Centro Médico Madrid"
        }
      ]
    }
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-ice-600" />
            {language === 'en' ? 'Personal Details' : 'Datos Personales'}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleEditMode}
            className="flex items-center gap-2"
          >
            {editMode ? (
              <>
                <Save className="h-4 w-4" />
                {language === 'en' ? 'Save' : 'Guardar'}
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                {language === 'en' ? 'Edit' : 'Editar'}
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal">
            <TabsList className="mb-4">
              <TabsTrigger value="personal">
                <FileText className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Personal Information' : 'Información Personal'}
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <Phone className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <PersonalDetailsTabContent 
                editMode={editMode}
                questionnaireData={mockQuestionnaireData}
              />
            </TabsContent>
            
            <TabsContent value="contacts">
              <EmergencyContactsTabContent 
                editMode={editMode}
                questionnaireData={mockQuestionnaireData}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDetailsPage;
