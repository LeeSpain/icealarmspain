
// Mock payment service for Firebase to satisfy imports

export const initiatePayment = async (amount: number, userId: string) => {
  console.log(`Initiating payment of ${amount} for user ${userId}`);
  return { success: true, id: `payment-${Date.now()}` };
};

export const getPaymentStatus = async (paymentId: string) => {
  console.log(`Getting status for payment ${paymentId}`);
  return { status: 'completed', timestamp: new Date().toISOString() };
};

export const cancelPayment = async (paymentId: string) => {
  console.log(`Cancelling payment ${paymentId}`);
  return { success: true };
};
