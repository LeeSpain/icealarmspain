
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TestResult } from '../types';

interface TestResultAlertProps {
  testResult: TestResult | null;
}

const TestResultAlert: React.FC<TestResultAlertProps> = ({ testResult }) => {
  const { language } = useLanguage();
  
  if (!testResult) return null;
  
  return (
    <Alert variant={testResult.success ? "default" : "destructive"} className="mb-6">
      <div className="flex items-start">
        {testResult.success ? (
          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 mr-2 text-destructive" />
        )}
        <div>
          <AlertTitle>
            {testResult.success 
              ? (language === 'en' ? 'Test Successful' : 'Prueba Exitosa')
              : (language === 'en' ? 'Test Failed' : 'Prueba Fallida')}
          </AlertTitle>
          <AlertDescription>
            {testResult.success
              ? (language === 'en' 
                  ? `Test ${testResult.type} alerts were sent to ${testResult.recipients.join(', ')}.`
                  : `Alertas de prueba de tipo ${testResult.type} fueron enviadas a ${testResult.recipients.join(', ')}.`)
              : (testResult.errorMessage || (language === 'en' ? 'An error occurred' : 'Ocurrió un error'))}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default TestResultAlert;
