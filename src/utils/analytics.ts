
import { logEvent as firebaseLogEvent } from '@/services/firebase/analytics';

type EventParams = Record<string, any>;

// Core tracking functions
export const trackPageView = (pageName: string, params?: EventParams) => {
  console.log(`Page view: ${pageName}`, params);
  firebaseLogEvent('page_view', { page_name: pageName, ...params });
};

export const trackButtonClick = (buttonName: string, params?: EventParams) => {
  console.log(`Button click: ${buttonName}`, params);
  firebaseLogEvent('button_click', { button_name: buttonName, ...params });
};

export const trackFeatureUsage = (featureName: string, params?: EventParams) => {
  console.log(`Feature usage: ${featureName}`, params);
  firebaseLogEvent('feature_use', { feature_name: featureName, ...params });
};

// Business-specific event tracking
export const trackProductView = (productId: string, productName: string, params?: EventParams) => {
  console.log(`Product view: ${productName} (${productId})`, params);
  firebaseLogEvent('product_view', { product_id: productId, product_name: productName, ...params });
};

export const trackAddToCart = (productId: string, productName: string, price: number, quantity: number) => {
  console.log(`Add to cart: ${productName} (${productId}), Quantity: ${quantity}, Price: ${price}`);
  firebaseLogEvent('add_to_cart', {
    product_id: productId,
    product_name: productName,
    price: price,
    quantity: quantity,
    value: price * quantity
  });
};

export const trackCheckoutStep = (step: number, params?: EventParams) => {
  console.log(`Checkout step: ${step}`, params);
  firebaseLogEvent('checkout_step', { step, ...params });
};

export const trackSignup = (method: string, params?: EventParams) => {
  console.log(`Signup: ${method}`, params);
  firebaseLogEvent('sign_up', { method, ...params });
};

export const trackLogin = (method: string, params?: EventParams) => {
  console.log(`Login: ${method}`, params);
  firebaseLogEvent('login', { method, ...params });
};
