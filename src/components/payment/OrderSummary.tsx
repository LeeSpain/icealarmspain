
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  const { language } = useLanguage();
  
  // Add more detailed debugging to identify issues
  useEffect(() => {
    console.log("OrderSummary received data:", orderData);
    console.log("OrderSummary total:", orderData.total);
    console.log("OrderSummary oneTimeTotal:", orderData.oneTimeTotal);
    console.log("OrderSummary productTax:", orderData.productTax);
    console.log("OrderSummary items:", orderData.items);
  }, [orderData]);
  
  // Get membership type display name
  const getMembershipTypeName = (type: string) => {
    switch (type) {
      case 'individual':
        return language === 'en' ? 'Individual' : 'Individual';
      case 'couple':
        return language === 'en' ? 'Couple' : 'Pareja';
      case 'family':
        return language === 'en' ? 'Family' : 'Familia';
      case 'caregiver':
        return language === 'en' ? 'Caregiver' : 'Cuidador';
      default:
        return language === 'en' ? 'Individual' : 'Individual';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-ice-600" />
          {language === 'en' ? "Order Summary" : "Resumen del Pedido"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2 flex items-center">
            <Users className="mr-2 h-4 w-4 text-ice-500" />
            {language === 'en' ? "Membership Type" : "Tipo de Membresía"}:
            <span className="ml-2 text-ice-600">{getMembershipTypeName(orderData.membershipType)}</span>
          </h3>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">
            {language === 'en' ? "Items" : "Artículos"} ({orderData.deviceCount || 0})
          </h3>
          <ul className="space-y-2">
            {orderData.items && orderData.items.map((item, index) => (
              <li key={index} className="flex justify-between text-sm py-1">
                <span>{item.name} {item.quantity > 1 ? `(${item.quantity}x)` : ''}</span>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "One-time devices cost" : "Costo único de dispositivos"}:
            </span>
            <span>€{orderData.oneTimeTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "IVA (21%)" : "IVA (21%)"}:
            </span>
            <span>€{orderData.productTax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "Shipping" : "Envío"}:
            </span>
            <span>€{orderData.shippingTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "Shipping IVA (21%)" : "IVA de envío (21%)"}:
            </span>
            <span>€{(orderData.shippingTax || 0).toFixed(2)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-medium">
            <span>
              {language === 'en' ? "Total one-time payment" : "Pago único total"}:
            </span>
            <span className="text-lg">€{orderData.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="pt-2 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "Monthly subscription" : "Suscripción mensual"}:
            </span>
            <span>€{orderData.monthlyTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "IVA (10%)" : "IVA (10%)"}:
            </span>
            <span>€{orderData.monthlyTax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between font-medium">
            <span>
              {language === 'en' ? "Total monthly charge" : "Cargo mensual total"}:
            </span>
            <span>€{(orderData.monthlyTotal + orderData.monthlyTax).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="bg-ice-50 p-3 rounded-md text-xs flex mt-4">
          <Info className="h-4 w-4 text-ice-500 mr-2 flex-shrink-0 mt-0.5" />
          <p>
            {language === 'en' 
              ? "Your first payment will be processed now. Monthly charges will begin after your devices are delivered and activated." 
              : "Tu primer pago se procesará ahora. Los cargos mensuales comenzarán después de que tus dispositivos sean entregados y activados."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
