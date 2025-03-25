import { useState, useEffect } from 'react';
import { Contact, AlertType, TestResult } from '@/components/emergency-contacts/types';
import { v4 as uuidv4 } from 'uuid';

// Mock function to simulate sending test notifications
export const testContactNotifications = async (contactId: string, type: AlertType): Promise<TestResult> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 1500));

  const result: TestResult = {
    id: `test-${Date.now()}`,
    timestamp: new Date().toISOString(), // Convert Date to string
    success: Math.random() > 0.2, // 80% success rate
    type: type,
    recipients: ['contact@example.com'],
  };

  if (!result.success) {
    result.error = 'Failed to send test notification';
  }

  return result;
};
