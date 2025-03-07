
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ButtonCustom } from '@/components/ui/button-custom';

const EmptyContactsState: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'No Contacts Available' : 'No Hay Contactos Disponibles'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'You need to add emergency contacts before testing the alert system.'
            : 'Necesitas añadir contactos de emergencia antes de probar el sistema de alertas.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-8 text-center">
        <p className="mb-4 text-muted-foreground">
          {language === 'en'
            ? 'Add emergency contacts first to test the alert system.'
            : 'Añade contactos de emergencia primero para probar el sistema de alertas.'}
        </p>
        <ButtonCustom onClick={() => window.location.hash = '#add-contact'}>
          {language === 'en' ? 'Add Contact' : 'Añadir Contacto'}
        </ButtonCustom>
      </CardContent>
    </Card>
  );
};

export default EmptyContactsState;
