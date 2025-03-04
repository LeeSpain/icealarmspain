
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CardFooter } from '@/components/ui/card';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Bell } from 'lucide-react';

interface FormActionsProps {
  isSubmitting: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ isSubmitting }) => {
  const { language } = useLanguage();
  
  return (
    <CardFooter className="px-0 pt-6">
      <ButtonCustom 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {!isSubmitting && (
          <>
            <Bell className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Add Emergency Contact' : 'Añadir Contacto de Emergencia'}
          </>
        )}
        {isSubmitting && (language === 'en' ? 'Adding contact...' : 'Añadiendo contacto...')}
      </ButtonCustom>
    </CardFooter>
  );
};

export default FormActions;
