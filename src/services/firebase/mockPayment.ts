
// Mock Payment implementation for development

export class MockPayment {
  orders: any[] = [];
  
  async processPayment(paymentDetails: {
    amount: number,
    cardNumber: string,
    expiryDate: string,
    cvc: string,
    name: string,
    items: any[],
    userId?: string,
    email?: string,
    address?: any
  }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Basic validation
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
      throw new Error("Payment details are incomplete");
    }
    
    // Validate card number format (simple check)
    if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
      throw new Error("Invalid card number format");
    }
    
    // Validate expiry date (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      throw new Error("Invalid expiry date format (use MM/YY)");
    }
    
    // Validate CVC
    if (!/^\d{3,4}$/.test(paymentDetails.cvc)) {
      throw new Error("Invalid CVC code");
    }
    
    // For demo purposes, we'll decline specific test cards
    if (paymentDetails.cardNumber.replace(/\s/g, '') === '4111111111111111') {
      throw new Error("Your card was declined. Please try a different card.");
    }
    
    // Create new order with unique ID
    const orderId = 'order-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const orderDate = new Date().toISOString();
    
    const order = {
      id: orderId,
      date: orderDate,
      amount: paymentDetails.amount,
      items: paymentDetails.items,
      status: 'completed',
      user: {
        id: paymentDetails.userId || 'guest-' + Date.now(),
        email: paymentDetails.email || 'guest@example.com'
      },
      paymentMethod: {
        type: 'card',
        last4: paymentDetails.cardNumber.slice(-4)
      },
      shippingAddress: paymentDetails.address || null
    };
    
    // Add to orders
    this.orders.push(order);
    
    console.log("Payment processed successfully:", order);
    
    return {
      success: true,
      orderId,
      orderDate,
      amount: paymentDetails.amount,
      last4: paymentDetails.cardNumber.slice(-4)
    };
  }
  
  // Get orders for a user
  async getUserOrders(userId: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return orders for this user
    return this.orders.filter(order => order.user.id === userId);
  }
  
  // Get a specific order by ID
  async getOrder(orderId: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.orders.find(order => order.id === orderId) || null;
  }
}
