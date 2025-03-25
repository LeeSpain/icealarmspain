
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { TestResult } from '../types';

interface TestResultAlertProps {
  testResult: TestResult | null;
}

const TestResultAlert: React.FC<TestResultAlertProps> = ({ testResult }) => {
  const { language } = useLanguage();

  if (!testResult) return null;

  const { success, type, recipients, timestamp } = testResult;

  const formattedTime = new Date(timestamp).toLocaleTimeString();
  const formattedDate = new Date(timestamp).toLocaleDateString();

  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    pending: <Clock className="h-5 w-5 text-amber-500" />
  };

  return (
    <Alert variant={success ? "default" : "destructive"} className="mb-6">
      <div className="flex items-start">
        {success ? iconMap.success : iconMap.error}
        <div className="ml-3">
          <AlertTitle className="mb-1 text-base">
            {success 
              ? (language === 'en' ? 'Test Successful' : 'Prueba Exitosa')
              : (language === 'en' ? 'Test Failed' : 'Prueba Fallida')}
          </AlertTitle>
          <AlertDescription className="text-sm">
            {success 
              ? (language === 'en' 
                  ? `Test ${type} alert sent to ${recipients.length} contact(s) at ${formattedTime} on ${formattedDate}.`
                  : `Alerta de prueba ${type} enviada a ${recipients.length} contacto(s) a las ${formattedTime} el ${formattedDate}.`)
              : (language === 'en'
                  ? testResult.error || testResult.errorMessage || "Failed to send test alerts."
                  : testResult.error || testResult.errorMessage || "Error al enviar alertas de prueba.")}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default TestResultAlert;
