
import React from "react";
import { ShoppingBag } from "lucide-react";

interface OrderSummaryHeaderProps {
  language: string;
}

const OrderSummaryHeader: React.FC<OrderSummaryHeaderProps> = ({ language }) => {
  return (
    <h2 className="text-xl font-semibold mb-6 flex items-center border-b pb-4 border-ice-100/50">
      <ShoppingBag className="mr-2 text-orange-500" />
      {language === 'en' ? "Your Package Summary" : "Resumen de su Paquete"}
    </h2>
  );
};

export default OrderSummaryHeader;
