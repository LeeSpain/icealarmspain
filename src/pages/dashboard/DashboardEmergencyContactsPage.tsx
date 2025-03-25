
// Update where Date is being used instead of string timestamps
const mockTestResult: TestResult = {
  id: 'test-123',
  timestamp: new Date().toISOString(), // Fix: convert Date to string
  success: true,
  type: 'emergency',
  recipients: ['contact@example.com', 'emergency@example.com'],
};

// And elsewhere in the file:
const result: TestResult = {
  id: `test-${Date.now()}`,
  timestamp: new Date().toISOString(), // Fix: convert Date to string
  type: alertType,
  success: true,
  recipients: contactNames,
};
