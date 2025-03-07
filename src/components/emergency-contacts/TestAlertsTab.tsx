
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Bell } from 'lucide-react';
import { Contact, AlertType, TestResult } from './types';

// Import refactored components
import AlertTypeSelector from './test-alerts/AlertTypeSelector';
import ContactSelection from './test-alerts/ContactSelection';
import ImportantNotice from './test-alerts/ImportantNotice';
import TestResultAlert from './test-alerts/TestResultAlert';
import EmptyContactsState from './test-alerts/EmptyContactsState';
import LoadingState from './test-alerts/LoadingState';

interface TestAlertsTabProps {
  contacts: Contact[];
  isLoading: boolean;
  testInProgress: boolean;
  lastTestResult: TestResult | null;
  onTestAlert: (type: AlertType, contactIds: string[]) => Promise<boolean>;
}

const TestAlertsTab: React.FC<TestAlertsTabProps> = ({
  contacts,
  isLoading,
  testInProgress,
  lastTestResult,
  onTestAlert,
}) => {
  const { language } = useLanguage();
  const [selectedAlertType, setSelectedAlertType] = useState<AlertType>('emergency');
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleCheckboxChange = (contactId: string, checked: boolean) => {
    if (checked) {
      setSelectedContactIds(prev => [...prev, contactId]);
    } else {
      setSelectedContactIds(prev => prev.filter(id => id !== contactId));
    }
  };

  const handleAlertTypeChange = (value: string) => {
    setSelectedAlertType(value as AlertType);
  };

  const handleTestAlert = async () => {
    if (selectedContactIds.length === 0) {
      return; // No contacts selected
    }

    setTestStatus('sending');
    const success = await onTestAlert(selectedAlertType, selectedContactIds);
    setTestStatus(success ? 'success' : 'error');
    
    // Reset status after a few seconds
    setTimeout(() => {
      setTestStatus('idle');
    }, 5000);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (contacts.length === 0) {
    return <EmptyContactsState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Test Alert System' : 'Probar Sistema de Alertas'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Send test alerts to verify your emergency contact system.'
            : 'Envía alertas de prueba para verificar tu sistema de contactos de emergencia.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <TestResultAlert testResult={lastTestResult} />
        
        <AlertTypeSelector 
          selectedAlertType={selectedAlertType}
          onAlertTypeChange={handleAlertTypeChange}
        />

        <ContactSelection 
          contacts={contacts}
          selectedContactIds={selectedContactIds}
          onContactSelectionChange={handleCheckboxChange}
        />

        <ImportantNotice />
      </CardContent>

      <CardFooter>
        <ButtonCustom 
          className="w-full"
          onClick={handleTestAlert}
          disabled={testInProgress || selectedContactIds.length === 0}
          isLoading={testInProgress}
        >
          {!testInProgress && (
            <>
              <Bell className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Send Test Alert' : 'Enviar Alerta de Prueba'}
            </>
          )}
          {testInProgress && (language === 'en' ? 'Sending Test Alert...' : 'Enviando Alerta de Prueba...')}
        </ButtonCustom>
      </CardFooter>
    </Card>
  );
};

export default TestAlertsTab;
