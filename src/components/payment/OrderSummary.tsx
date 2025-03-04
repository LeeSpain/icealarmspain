
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import OrderSummary from "./order-summary";

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

// This is now just a wrapper component that uses the refactored OrderSummary
const OrderSummaryWrapper: React.FC<OrderSummaryProps> = ({ orderData }) => {
  return (
    <Card>
      <CardContent className="py-6">
        <OrderSummary orderData={orderData} />
      </CardContent>
    </Card>
  );
};

export default OrderSummaryWrapper;
