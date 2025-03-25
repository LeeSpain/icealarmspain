
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TestResult, AlertType } from '@/components/emergency-contacts/types';
import EmergencyContactsTabs from '@/components/emergency-contacts/EmergencyContactsTabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageHeader from '@/components/common/PageHeader';
import { useEmergencyContactsManager } from '@/hooks/useEmergencyContactsManager';

// Create a mock test result for demonstration purposes
const mockTestResult: TestResult = {
  id: 'test-123',
  timestamp: new Date().toISOString(), // Use string timestamp
  success: true,
  type: 'emergency',
  recipients: ['contact@example.com', 'emergency@example.com'],
};

const DashboardEmergencyContactsPage: React.FC = () => {
  const { language } = useLanguage();
  const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);
  const [testInProgress, setTestInProgress] = useState(false);

  // Simulate test alert submission
  const handleTestAlert = async (alertType: AlertType, contactIds: string[]) => {
    setTestInProgress(true);
    
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const contactNames = ['John Doe', 'Jane Smith']; // Mock contact names
    
    // Create test result
    const result: TestResult = {
      id: `test-${Date.now()}`,
      timestamp: new Date().toISOString(), // Use string timestamp
      type: alertType,
      success: true,
      recipients: contactNames,
    };
    
    setLastTestResult(result);
    setTestInProgress(false);
    return true;
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <PageHeader
          title={language === 'en' ? "Emergency Contacts" : "Contactos de Emergencia"}
          subtitle={language === 'en' 
            ? "Manage your emergency contacts and test alert notifications." 
            : "Administra tus contactos de emergencia y prueba las notificaciones de alerta."}
        />
        
        <div className="mt-8">
          {/* Mock data for demonstration */}
          <EmergencyContactsTabs 
            contacts={[]}
            isLoading={false}
            selectedContactId={null}
            onSelectContact={() => {}}
            lastTestResult={lastTestResult}
            testInProgress={testInProgress}
            onAddContact={async () => true}
            onUpdateContact={async () => true}
            onDeleteContact={async () => true}
            onTestAlert={handleTestAlert}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEmergencyContactsPage;
