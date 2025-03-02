
import { DeviceWithQuantity } from "@/components/join/DeviceSelection";

export interface Device {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  image: string;
  description: string;
}

export interface CalculatedTotals {
  oneTimeTotal: number;
  totalMonthlyBase: number;
  productTax: number;
  monthlyTax: number;
  totalShipping: number;
  shippingTax: number;
  totalWithProductTax: number;
  totalWithShipping: number;
  totalWithMonthlyTax: number;
  totalDeviceCount: number;
  hasDevices: boolean;
}

export const calculateTotals = (devices: Device[], selectedDevices: DeviceWithQuantity[]): CalculatedTotals => {
  let oneTimeTotal = 0;
  let totalMonthlyBase = 0;
  let totalShipping = 0;
  let totalDeviceCount = 0;
  
  // Add up device costs
  selectedDevices.forEach(device => {
    const deviceInfo = devices.find(d => d.id === device.id);
    if (deviceInfo) {
      oneTimeTotal += deviceInfo.price * device.quantity;
      totalMonthlyBase += deviceInfo.monthlyPrice * device.quantity;
      totalDeviceCount += device.quantity;
    }
  });
  
  // Add shipping costs (€14.99 per device)
  totalShipping = totalDeviceCount * 14.99;
  
  // Removed AI Guardian base service (€49.99) - AI service is now free
  // Only charge for each device's monthly fee (€24.99 per device)
  
  // Apply discounts based on number of devices
  if (totalDeviceCount === 2) {
    // 10% discount for 2 devices
    totalMonthlyBase *= 0.9;
  } else if (totalDeviceCount >= 3) {
    // 20% discount for 3 or more devices
    totalMonthlyBase *= 0.8;
  }
  
  // Calculate taxes
  const productTaxRate = 0.21; // 21% IVA for products
  const monthlyTaxRate = 0.10; // 10% IVA for monthly services
  
  const productTax = oneTimeTotal * productTaxRate;
  const monthlyTax = totalMonthlyBase * monthlyTaxRate;
  const shippingTax = totalShipping * productTaxRate;
  
  const totalWithProductTax = oneTimeTotal + productTax;
  const totalWithShipping = totalWithProductTax + totalShipping + shippingTax;
  const totalWithMonthlyTax = totalMonthlyBase + monthlyTax;
  
  return {
    oneTimeTotal,
    totalMonthlyBase,
    productTax,
    monthlyTax,
    totalShipping,
    shippingTax,
    totalWithProductTax,
    totalWithShipping,
    totalWithMonthlyTax,
    totalDeviceCount,
    hasDevices: totalDeviceCount > 0
  };
};
