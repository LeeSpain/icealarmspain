
/**
 * Mock payment service that replaces Firebase payment functionality
 */

import { MockPayment } from './mockPayment';

// Create a singleton instance of our mock payment service
const mockPayment = new MockPayment();

// Process a payment
export const processPayment = async (paymentDetails: any) => {
  return mockPayment.processPayment(paymentDetails);
};

// Get orders for a user
export const getUserOrders = async (userId: string) => {
  return mockPayment.getUserOrders(userId);
};

// Get a specific order
export const getOrder = async (orderId: string) => {
  return mockPayment.getOrder(orderId);
};

// Export the mock payment object for direct use
export const payment = mockPayment;
