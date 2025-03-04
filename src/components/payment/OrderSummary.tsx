
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
  
  // Add even more detailed debugging
  useEffect(() => {
    console.log("OrderSummary component received data:", orderData);
    console.log("OrderSummary items:", orderData.items);
    console.log("OrderSummary deviceCount:", orderData.deviceCount);
    console.log("OrderSummary oneTimeTotal:", orderData.oneTimeTotal);
    console.log("OrderSummary productTax:", orderData.productTax);
    console.log("OrderSummary shippingTotal:", orderData.shippingTotal);
    console.log("OrderSummary total:", orderData.total);
    
    // Check for problematic values
    if (orderData.items && orderData.items.length > 0 && orderData.total === 0) {
      console.warn("Warning: OrderSummary has items but total is zero - possible calculation issue");
      console.log("Items details:", JSON.stringify(orderData.items));
    }
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

  // Ensure we have valid numbers for display
  const ensureNumber = (value: any): number => {
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn(`Invalid number value: ${value}, type: ${typeof value}`);
      return 0;
    }
    return value;
  };
  
  const safeTotal = ensureNumber(orderData.total);
  const safeOneTimeTotal = ensureNumber(orderData.oneTimeTotal);
  const safeProductTax = ensureNumber(orderData.productTax);
  const safeShippingTotal = ensureNumber(orderData.shippingTotal);
  const safeShippingTax = ensureNumber(orderData.shippingTax || 0);
  const safeMonthlyTotal = ensureNumber(orderData.monthlyTotal);
  const safeMonthlyTax = ensureNumber(orderData.monthlyTax);
  
  // Check if we have items but zero values
  const hasDataIssue = orderData.items && orderData.items.length > 0 && safeTotal === 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-ice-600" />
          {language === 'en' ? "Order Summary" : "Resumen del Pedido"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {hasDataIssue && (
          <div className="bg-yellow-50 p-3 rounded-md text-xs mb-4 border border-yellow-200">
            <p className="text-yellow-700">
              {language === 'en' 
                ? "Data is still loading. If this persists, please refresh the page." 
                : "Los datos aún se están cargando. Si persiste, actualice la página."}
            </p>
          </div>
        )}
        
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
            {orderData.items && orderData.items.length > 0 ? (
              orderData.items.map((item, index) => (
                <li key={index} className="flex justify-between text-sm py-1">
                  <span>{item.name} {item.quantity > 1 ? `(${item.quantity}x)` : ''}</span>
                  <span>€{(ensureNumber(item.price) * ensureNumber(item.quantity)).toFixed(2)}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">
                {language === 'en' ? "No items in cart" : "No hay artículos en el carrito"}
              </li>
            )}
          </ul>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "One-time devices cost" : "Costo único de dispositivos"}:
            </span>
            <span>€{safeOneTimeTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "IVA (21%)" : "IVA (21%)"}:
            </span>
            <span>€{safeProductTax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "Shipping" : "Envío"}:
            </span>
            <span>€{safeShippingTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "Shipping IVA (21%)" : "IVA de envío (21%)"}:
            </span>
            <span>€{safeShippingTax.toFixed(2)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-medium">
            <span>
              {language === 'en' ? "Total one-time payment" : "Pago único total"}:
            </span>
            <span className="text-lg">€{safeTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="pt-2 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "Monthly subscription" : "Suscripción mensual"}:
            </span>
            <span>€{safeMonthlyTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === 'en' ? "IVA (10%)" : "IVA (10%)"}:
            </span>
            <span>€{safeMonthlyTax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between font-medium">
            <span>
              {language === 'en' ? "Total monthly charge" : "Cargo mensual total"}:
            </span>
            <span>€{(safeMonthlyTotal + safeMonthlyTax).toFixed(2)}</span>
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
