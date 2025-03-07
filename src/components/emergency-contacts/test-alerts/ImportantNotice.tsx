
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AlertTriangle } from 'lucide-react';

const ImportantNotice: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mt-6">
      <div className="flex items-center mb-2">
        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
        <h3 className="font-medium">
          {language === 'en' ? 'Important Notice' : 'Aviso Importante'}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {language === 'en' 
          ? 'This will send real test messages to the selected contacts. Please use this feature responsibly and inform your contacts in advance about potential test alerts.'
          : 'Esto enviará mensajes de prueba reales a los contactos seleccionados. Utiliza esta función de manera responsable e informa a tus contactos con antelación sobre posibles alertas de prueba.'}
      </p>
    </div>
  );
};

export default ImportantNotice;
