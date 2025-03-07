
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Test Alert System' : 'Probar Sistema de Alertas'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Send test alerts to your emergency contacts.'
            : 'Enviar alertas de prueba a tus contactos de emergencia.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-ice-600" />
      </CardContent>
    </Card>
  );
};

export default LoadingState;
