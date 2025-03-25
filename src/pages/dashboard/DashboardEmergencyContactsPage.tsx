
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { TestResult } from '@/components/emergency-contacts/types';
import EmergencyContactsTabs from '@/components/emergency-contacts/EmergencyContactsTabs';
import { v4 as uuidv4 } from 'uuid';

const DashboardEmergencyContactsPage: React.FC = () => {
  const { user } = useAuth();
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Handler for test alerts
  const handleTestAlert = (
    type: string,
    contacts: string[],
    success: boolean,
    error?: string
  ) => {
    const result: TestResult = {
      success,
      type,
      recipients: contacts,
      error,
      timestamp: new Date().toISOString()
    };
    
    setTestResult(result);
    
    // Add to test logs (if we had persistent storage)
    const testLog = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      type,
      recipients: contacts,
      success,
      error
    };
    
    console.log('Test log created:', testLog);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Emergency Contacts</h1>
        
        <EmergencyContactsTabs 
          onTestAlert={handleTestAlert}
          testResult={testResult}
          clearTestResult={() => setTestResult(null)}
        />
      </div>
    </div>
  );
};

export default DashboardEmergencyContactsPage;
