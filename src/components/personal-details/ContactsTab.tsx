
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ContactsTabProps {
  language: string;
}

const ContactsTab: React.FC<ContactsTabProps> = ({ language }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Additional Contacts' : 'Contactos Adicionales'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Other important contacts (not for emergencies)' 
            : 'Otros contactos importantes (no para emergencias)'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6 text-muted-foreground">
          {language === 'en' 
            ? 'This section will be implemented soon.' 
            : 'Esta sección se implementará pronto.'}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsTab;
