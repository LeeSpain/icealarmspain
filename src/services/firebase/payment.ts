
import { MockPayment } from './mockPayment';
import { hasRealFirebaseConfig } from './config';

// Initialize payment service
let payment: MockPayment;

// Create and export payment instance (currently only mock)
// In the future, you could implement real payment service here
payment = new MockPayment();

export { payment };
