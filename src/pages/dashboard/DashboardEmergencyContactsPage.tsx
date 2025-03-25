
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { TestResult, AlertType } from '@/components/emergency-contacts/types';
import EmergencyContactsTabs from '@/components/emergency-contacts/EmergencyContactsTabs';
import { v4 as uuidv4 } from 'uuid';

const DashboardEmergencyContactsPage: React.FC = () => {
  const { user } = useAuth();
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Handler for test alerts
  const handleTestAlert = async (
    type: AlertType,
    contactIds: string[]
  ): Promise<boolean> => {
    try {
      const result: TestResult = {
        success: true, // Default to success
        type,
        recipients: contactIds,
        timestamp: new Date().toISOString()
      };
      
      setTestResult(result);
      
      // Add to test logs (if we had persistent storage)
      const testLog = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        type,
        recipients: contactIds,
        success: true
      };
      
      console.log('Test log created:', testLog);
      return true;
    } catch (error) {
      console.error('Test alert error:', error);
      setTestResult({
        success: false,
        type,
        recipients: contactIds,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      return false;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Emergency Contacts</h1>
        
        <EmergencyContactsTabs 
          contacts={[]}
          isLoading={false}
          selectedContactId={null}
          onSelectContact={() => {}}
          lastTestResult={testResult}
          testInProgress={false}
          onAddContact={async () => false}
          onUpdateContact={async () => false}
          onDeleteContact={async () => false}
          onTestAlert={handleTestAlert}
        />
      </div>
    </div>
  );
};

export default DashboardEmergencyContactsPage;
