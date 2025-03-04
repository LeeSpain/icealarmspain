
import React from "react";
import OrderSummaryHeader from "./OrderSummaryHeader";
import SelectedDevicesList from "./SelectedDevicesList";
import CostsSummary from "./CostsSummary";
import InfoNotice from "./InfoNotice";
import CheckoutButton from "./CheckoutButton";

interface MembershipType {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface Device {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  image: string;
  description: string;
}

interface DeviceWithQuantity {
  id: string;
  quantity: number;
}

interface OrderSummaryProps {
  totals: {
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
  };
  selectedDevices: DeviceWithQuantity[];
  devices: Device[];
  membershipType: string;
  membershipTypes: MembershipType[];
  onCheckout: () => void;
  language: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totals,
  selectedDevices,
  devices,
  membershipType,
  membershipTypes,
  onCheckout,
  language,
}) => {
  if (!totals.hasDevices) return null;

  const getAdditionalUsers = () => {
    switch (membershipType) {
      case 'couple':
      case 'caregiver':
        return 1;
      case 'family':
        return 2;
      default:
        return 0;
    }
  };

  const additionalUsers = getAdditionalUsers();
  
  const getDiscountText = () => {
    if (membershipType === 'individual') {
      if (totals.totalDeviceCount === 2) {
        return language === 'en' ? "10% discount on devices" : "10% de descuento en dispositivos";
      } else if (totals.totalDeviceCount >= 3) {
        return language === 'en' ? "20% discount on devices" : "20% de descuento en dispositivos";
      }
    } else if (membershipType === 'couple' || membershipType === 'caregiver') {
      return language === 'en' ? "10% discount on membership" : "10% de descuento en membresía"; 
    } else if (membershipType === 'family') {
      return language === 'en' ? "20% discount on membership" : "20% de descuento en membresía";
    }
    return "";
  };

  const discountText = getDiscountText();

  // Debug the checkout function to ensure it's working
  const handleCheckoutClick = () => {
    console.log("OrderSummary: Checkout button clicked, forwarding to parent handler");
    onCheckout();
  };

  return (
    <div className="max-w-3xl mx-auto glass-panel p-6 mb-10 animate-fade-in">
      <OrderSummaryHeader language={language} />
      
      <SelectedDevicesList 
        selectedDevices={selectedDevices}
        devices={devices}
        additionalUsers={additionalUsers}
        language={language}
      />
      
      <CostsSummary 
        totals={totals}
        language={language}
        discountText={discountText}
      />
      
      <InfoNotice language={language} />
      
      <CheckoutButton 
        onCheckout={handleCheckoutClick}
        language={language}
      />
    </div>
  );
};

export default OrderSummary;
