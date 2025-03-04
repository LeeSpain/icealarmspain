
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Loader2, Bell, CheckCircle2, XCircle, AlertTriangle, Shield, HeartPulse, Activity } from 'lucide-react';
import { Contact, AlertType, TestResult, TestStatus } from './types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');

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
  }

  if (contacts.length === 0) {
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
        {lastTestResult && (
          <Alert variant={lastTestResult.success ? "default" : "destructive"} className="mb-6">
            <div className="flex items-start">
              {lastTestResult.success ? (
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 mr-2 text-destructive" />
              )}
              <div>
                <AlertTitle>
                  {lastTestResult.success 
                    ? (language === 'en' ? 'Test Successful' : 'Prueba Exitosa')
                    : (language === 'en' ? 'Test Failed' : 'Prueba Fallida')}
                </AlertTitle>
                <AlertDescription>
                  {lastTestResult.success
                    ? (language === 'en' 
                        ? `Test ${lastTestResult.type} alerts were sent to ${lastTestResult.recipients.join(', ')}.`
                        : `Alertas de prueba de tipo ${lastTestResult.type} fueron enviadas a ${lastTestResult.recipients.join(', ')}.`)
                    : (lastTestResult.errorMessage || (language === 'en' ? 'An error occurred' : 'Ocurrió un error'))}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <div>
          <h3 className="text-lg font-medium mb-3">
            {language === 'en' ? 'Alert Type' : 'Tipo de Alerta'}
          </h3>
          <RadioGroup 
            defaultValue="emergency" 
            value={selectedAlertType}
            onValueChange={handleAlertTypeChange}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="emergency" id="emergency" />
              <Label htmlFor="emergency" className="flex items-center cursor-pointer">
                <Shield className="h-5 w-5 mr-2 text-red-500" />
                {language === 'en' ? 'Emergency' : 'Emergencia'}
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="medical" id="medical" />
              <Label htmlFor="medical" className="flex items-center cursor-pointer">
                <HeartPulse className="h-5 w-5 mr-2 text-pink-500" />
                {language === 'en' ? 'Medical' : 'Médica'}
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="activity" id="activity" />
              <Label htmlFor="activity" className="flex items-center cursor-pointer">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                {language === 'en' ? 'Activity' : 'Actividad'}
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="flex items-center cursor-pointer">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                {language === 'en' ? 'All Types' : 'Todos los Tipos'}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">
            {language === 'en' ? 'Select Contacts to Test' : 'Seleccionar Contactos para Probar'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                className="flex items-start space-x-3 border p-4 rounded-md"
              >
                <Checkbox 
                  id={`contact-${contact.id}`} 
                  checked={selectedContactIds.includes(contact.id)}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(contact.id, checked as boolean)
                  }
                />
                <div className="grid gap-1.5">
                  <Label 
                    htmlFor={`contact-${contact.id}`}
                    className="font-medium cursor-pointer"
                  >
                    {contact.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {contact.relationship} • {contact.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedContactIds.length === 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {language === 'en' 
                ? 'Please select at least one contact to send test alerts.'
                : 'Selecciona al menos un contacto para enviar alertas de prueba.'}
            </AlertDescription>
          </Alert>
        )}

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
