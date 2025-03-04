
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, BellOff, Send, CheckCircle, AlertTriangle, History, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertType, TestResult, TestLog, TestStatus } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
  receivesAlerts: boolean;
  receivesUpdates: boolean;
}

interface TestAlertsTabProps {
  contacts: Contact[];
  language: 'en' | 'es';
  testStatus: TestStatus;
  selectedAlertType: AlertType;
  testResults: TestResult[];
  testLogs: TestLog[];
  onTestAlerts: () => void;
  onChangeAlertType: (type: AlertType) => void;
  onClearHistory: () => void;
  setActiveTab: (tab: string) => void;
}

const TestAlertsTab: React.FC<TestAlertsTabProps> = ({
  contacts,
  language,
  testStatus,
  selectedAlertType,
  testResults,
  testLogs,
  onTestAlerts,
  onChangeAlertType,
  onClearHistory,
  setActiveTab
}) => {
  const ct = language === 'en' ? {
    title: 'Test Emergency Alerts',
    description: 'Send a test emergency alert to verify your contacts receive notifications correctly',
    alertsWillBeSent: 'Alerts will be sent to:',
    noContactsForTest: 'No contacts configured to receive alerts',
    addContactFirst: 'Please add contacts and enable alerts first',
    tabAdd: 'Add Contact',
    sendTestAlert: 'Send Test Alert',
    testingAlert: 'Sending test alerts...',
    testSuccess: 'Test completed successfully',
    testError: 'Test completed with errors',
    history: 'Test History',
    logs: 'Alert Logs',
    alertTypeLabel: 'Alert Type',
    alertTypes: {
      all: 'All Alerts',
      emergency: 'Emergency',
      medical: 'Medical',
      activity: 'Activity'
    },
    clearHistory: 'Clear History',
    noTestResults: 'No test results yet',
    runFirstTest: 'Run your first test to see results',
    noTestLogs: 'No test logs available',
    testDetails: 'Test Details',
    timestamp: 'Timestamp',
    alertType: 'Alert Type',
    status: 'Status',
    recipients: 'Recipients',
    deliveryMethod: 'Delivery Method',
    message: 'Message',
    sms: 'SMS',
    email: 'Email',
    call: 'Phone Call',
    delivered: 'Delivered',
    failed: 'Failed',
    primary: 'Primary',
    tabResults: 'Results',
    tabContacts: 'Recipients',
    tabLogs: 'Delivery Logs'
  } : {
    title: 'Probar Alertas de Emergencia',
    description: 'Envíe una alerta de emergencia de prueba para verificar que sus contactos reciban las notificaciones correctamente',
    alertsWillBeSent: 'Se enviarán alertas a:',
    noContactsForTest: 'No hay contactos configurados para recibir alertas',
    addContactFirst: 'Por favor agregue contactos y habilite las alertas primero',
    tabAdd: 'Agregar Contacto',
    sendTestAlert: 'Enviar Alerta de Prueba',
    testingAlert: 'Enviando alertas de prueba...',
    testSuccess: 'Prueba completada exitosamente',
    testError: 'Prueba completada con errores',
    history: 'Historial de Pruebas',
    logs: 'Registros de Alertas',
    alertTypeLabel: 'Tipo de Alerta',
    alertTypes: {
      all: 'Todas las Alertas',
      emergency: 'Emergencia',
      medical: 'Médica',
      activity: 'Actividad'
    },
    clearHistory: 'Borrar Historial',
    noTestResults: 'No hay resultados de pruebas aún',
    runFirstTest: 'Ejecute su primera prueba para ver resultados',
    noTestLogs: 'No hay registros de prueba disponibles',
    testDetails: 'Detalles de la Prueba',
    timestamp: 'Hora',
    alertType: 'Tipo de Alerta',
    status: 'Estado',
    recipients: 'Destinatarios',
    deliveryMethod: 'Método de Entrega',
    message: 'Mensaje',
    sms: 'SMS',
    email: 'Correo',
    call: 'Llamada',
    delivered: 'Entregado',
    failed: 'Fallido',
    primary: 'Primario',
    tabResults: 'Resultados',
    tabContacts: 'Destinatarios',
    tabLogs: 'Registros de Entrega'
  };

  const alertEnabledContacts = contacts.filter(c => c.receivesAlerts);
  
  if (alertEnabledContacts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-ice-100 p-3 mb-4">
              <BellOff className="h-6 w-6 text-ice-600" />
            </div>
            <h3 className="mb-2 font-medium">{ct.noContactsForTest}</h3>
            <p className="text-muted-foreground mb-4">{ct.addContactFirst}</p>
            <Button onClick={() => setActiveTab("add")}>
              {ct.tabAdd}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const getTestResultStatusBadge = (success: boolean) => {
    return success ? (
      <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        {ct.testSuccess}
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        {ct.testError}
      </Badge>
    );
  };
  
  const getContactNameById = (id: string): string => {
    const contact = contacts.find(c => c.id === id);
    return contact ? contact.name : 'Unknown';
  };
  
  const getAlertTypeName = (type: AlertType): string => {
    return ct.alertTypes[type];
  };
  
  const getDeliveryMethodIcon = (method: 'sms' | 'email' | 'call') => {
    switch (method) {
      case 'sms':
        return <Badge variant="outline" className="text-blue-600">SMS</Badge>;
      case 'email':
        return <Badge variant="outline" className="text-purple-600">Email</Badge>;
      case 'call':
        return <Badge variant="outline" className="text-orange-600">Call</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ct.title}</CardTitle>
        <CardDescription>{ct.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-ice-50 p-4 rounded-md">
          <h3 className="text-sm font-medium mb-3">{ct.alertTypeLabel}</h3>
          
          <RadioGroup 
            value={selectedAlertType} 
            onValueChange={(value) => onChangeAlertType(value as AlertType)}
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">{ct.alertTypes.all}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="emergency" id="emergency" />
              <Label htmlFor="emergency">{ct.alertTypes.emergency}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medical" id="medical" />
              <Label htmlFor="medical">{ct.alertTypes.medical}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="activity" id="activity" />
              <Label htmlFor="activity">{ct.alertTypes.activity}</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contacts">{ct.tabContacts}</TabsTrigger>
            <TabsTrigger value="results">{ct.tabResults}</TabsTrigger>
            <TabsTrigger value="logs">{ct.tabLogs}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="space-y-4 mt-4">
            <h3 className="text-sm font-medium">{ct.alertsWillBeSent}</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {alertEnabledContacts
                .sort((a, b) => a.priority - b.priority)
                .map(contact => (
                  <div key={contact.id} className="flex items-center p-3 bg-ice-50 rounded-md">
                    <User className="h-5 w-5 mr-2 text-ice-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{contact.phone}</div>
                      {contact.email && (
                        <div className="text-sm text-muted-foreground truncate">{contact.email}</div>
                      )}
                    </div>
                    {contact.priority === 1 && (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 ml-2 flex-shrink-0">
                        {ct.primary}
                      </Badge>
                    )}
                  </div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">{ct.history}</h3>
              {testResults.length > 0 && (
                <Button variant="outline" size="sm" onClick={onClearHistory} className="h-8">
                  <Trash2 className="h-4 w-4 mr-1" />
                  {ct.clearHistory}
                </Button>
              )}
            </div>
            
            {testResults.length === 0 ? (
              <div className="text-center py-8 bg-ice-50 rounded-md">
                <History className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">{ct.noTestResults}</h3>
                <p className="text-sm text-muted-foreground">{ct.runFirstTest}</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {testResults.map((result) => (
                  <div key={result.id} className="bg-ice-50 rounded-md p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-medium">
                          {getAlertTypeName(result.type)}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(result.timestamp), 'PPpp')}
                        </div>
                      </div>
                      {getTestResultStatusBadge(result.success)}
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">{ct.recipients}: </span>
                      <span>
                        {result.recipients.map(id => getContactNameById(id)).join(', ')}
                      </span>
                    </div>
                    
                    {result.errorMessage && (
                      <div className="text-sm text-red-600">
                        {result.errorMessage}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4 mt-4">
            <h3 className="text-sm font-medium">{ct.logs}</h3>
            
            {testLogs.length === 0 ? (
              <div className="text-center py-8 bg-ice-50 rounded-md">
                <History className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">{ct.noTestLogs}</h3>
                <p className="text-sm text-muted-foreground">{ct.runFirstTest}</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {testLogs.map((log, index) => (
                  <div key={index} className="bg-ice-50 rounded-md p-3 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{getContactNameById(log.contactId)}</div>
                      <div className="flex items-center gap-2">
                        {getDeliveryMethodIcon(log.deliveryMethod)}
                        {log.delivered ? (
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            {ct.delivered}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                            {ct.failed}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {format(new Date(log.timestamp), 'PPpp')} - {getAlertTypeName(log.alertType)}
                    </div>
                    <div className="text-xs bg-white p-2 rounded border">
                      {log.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Button 
          onClick={onTestAlerts}
          className="w-full"
          disabled={testStatus !== 'idle'}
        >
          {testStatus === 'idle' && (
            <>
              <Send className="mr-2 h-4 w-4" />
              {ct.sendTestAlert}
            </>
          )}
          {testStatus === 'sending' && (
            <>
              <span className="animate-spin mr-2">⏳</span>
              {ct.testingAlert}
            </>
          )}
          {testStatus === 'success' && (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              {ct.testSuccess}
            </>
          )}
          {testStatus === 'error' && (
            <>
              <AlertTriangle className="mr-2 h-4 w-4" />
              {ct.testError}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestAlertsTab;
