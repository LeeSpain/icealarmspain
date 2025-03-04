
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, BellOff, Send, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  testStatus: 'idle' | 'sending' | 'success' | 'error';
  onTestAlerts: () => void;
  setActiveTab: (tab: string) => void;
}

const TestAlertsTab: React.FC<TestAlertsTabProps> = ({
  contacts,
  language,
  testStatus,
  onTestAlerts,
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
    testSuccess: 'Test completed successfully'
  } : {
    title: 'Probar Alertas de Emergencia',
    description: 'Envíe una alerta de emergencia de prueba para verificar que sus contactos reciban las notificaciones correctamente',
    alertsWillBeSent: 'Se enviarán alertas a:',
    noContactsForTest: 'No hay contactos configurados para recibir alertas',
    addContactFirst: 'Por favor agregue contactos y habilite las alertas primero',
    tabAdd: 'Agregar Contacto',
    sendTestAlert: 'Enviar Alerta de Prueba',
    testingAlert: 'Enviando alertas de prueba...',
    testSuccess: 'Prueba completada exitosamente'
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ct.title}</CardTitle>
        <CardDescription>{ct.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">{ct.alertsWillBeSent}</h3>
          <div className="space-y-2">
            {alertEnabledContacts
              .sort((a, b) => a.priority - b.priority)
              .map(contact => (
                <div key={contact.id} className="flex items-center p-2 bg-ice-50 rounded-md">
                  <User className="h-5 w-5 mr-2 text-ice-600" />
                  <div className="flex-1">
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.phone}</div>
                  </div>
                  {contact.priority === 1 && (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                      Primary
                    </Badge>
                  )}
                </div>
              ))}
          </div>
        </div>
        
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
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestAlertsTab;
