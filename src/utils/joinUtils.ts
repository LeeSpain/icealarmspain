
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

export const calculateTotals = (
  devices: Device[], 
  selectedDevices: DeviceWithQuantity[],
  membershipType: string = 'individual'
): CalculatedTotals => {
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
  
  // Add additional service fees based on membership type
  if (membershipType === 'couple') {
    // Add one extra base fee for the additional person (€24.99)
    totalMonthlyBase += 24.99;
    // Apply 10% discount for couple membership
    totalMonthlyBase *= 0.9;
  } else if (membershipType === 'family') {
    // Add two extra base fees for additional family members (€24.99 x 2)
    totalMonthlyBase += 24.99 * 2;
    // Apply 20% discount for family membership (10% per additional person)
    totalMonthlyBase *= 0.8;
  } else if (membershipType === 'caregiver') {
    // Add one extra base fee for the caregiver (€24.99)
    totalMonthlyBase += 24.99;
    // Apply 10% discount for caregiver membership
    totalMonthlyBase *= 0.9;
  }
  
  // Apply device count based discounts (only for individual plans - other plans already have discounts)
  if (membershipType === 'individual') {
    if (totalDeviceCount === 2) {
      // 10% discount for 2 devices (individual plan)
      totalMonthlyBase *= 0.9;
    } else if (totalDeviceCount >= 3) {
      // 20% discount for 3 or more devices (individual plan)
      totalMonthlyBase *= 0.8;
    }
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
