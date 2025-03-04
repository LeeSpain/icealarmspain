
import React from "react";
import OrderHeader from "./OrderHeader";
import ItemsList from "./ItemsList";
import OneTimeCosts from "./OneTimeCosts";
import MonthlyCosts from "./MonthlyCosts";
import InfoMessage from "./InfoMessage";

interface OrderSummaryProps {
  orderData: {
    total: number;
    items: any[];
    membershipType: string;
    deviceCount: number;
    oneTimeTotal: number;
    productTax: number;
    shippingTotal: number;
    shippingTax?: number;
    monthlyTotal: number;
    monthlyTax: number;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderData }) => {
  console.log("OrderSummary component received data:", orderData);
  
  // Check if we have items but zero values
  const hasItems = orderData.items && Array.isArray(orderData.items) && orderData.items.length > 0;
  const hasDataIssue = hasItems && orderData.total === 0;
  
  return (
    <div className="space-y-4">
      <OrderHeader language={hasDataIssue} />
      <ItemsList 
        items={orderData.items} 
        deviceCount={orderData.deviceCount} 
        membershipType={orderData.membershipType} 
      />
      <OneTimeCosts 
        oneTimeTotal={orderData.oneTimeTotal}
        productTax={orderData.productTax}
        shippingTotal={orderData.shippingTotal}
        shippingTax={orderData.shippingTax || 0}
        total={orderData.total}
      />
      <MonthlyCosts 
        monthlyTotal={orderData.monthlyTotal}
        monthlyTax={orderData.monthlyTax}
      />
      <InfoMessage />
    </div>
  );
};

export default OrderSummary;
