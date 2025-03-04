import React from "react";
import { Info, ShoppingBag, Truck, Check, Users } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";

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

  return (
    <div className="max-w-3xl mx-auto glass-panel p-6 mb-10 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6 flex items-center border-b pb-4 border-ice-100/50">
        <ShoppingBag className="mr-2 text-orange-500" />
        {language === 'en' ? "Your Package Summary" : "Resumen de su Paquete"}
      </h2>
      
      <div className="border-b border-gray-100 pb-4 mb-4">
        <p className="font-medium text-ice-700 mb-2">
          {membershipTypes.find(t => t.id === membershipType)?.title || 'Individual'} {language === 'en' ? "Account" : "Cuenta"}
        </p>
        <div className="pl-4 space-y-1">
          {selectedDevices.map((selectedDevice) => {
            const device = devices.find(d => d.id === selectedDevice.id);
            return device && (
              <div key={selectedDevice.id} className="flex justify-between text-sm py-1">
                <span>{device.name} {selectedDevice.quantity > 1 ? `(${selectedDevice.quantity}x)` : ''}</span>
                <span>€{(device.price * selectedDevice.quantity).toFixed(2)}</span>
              </div>
            );
          })}
          
          {additionalUsers > 0 && (
            <div className="flex justify-between text-sm py-1">
              <span className="flex items-center">
                <Users size={14} className="mr-1" />
                {language === 'en' 
                  ? `Additional user${additionalUsers > 1 ? 's' : ''} (${additionalUsers}x)`
                  : `Usuario${additionalUsers > 1 ? 's' : ''} adicional${additionalUsers > 1 ? 'es' : ''} (${additionalUsers}x)`}
              </span>
              <span>€{(24.99 * additionalUsers).toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm py-1 text-guardian-600 font-medium">
            <span>AI Guardian Service</span>
            <span>{language === 'en' ? "Free" : "Gratis"}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "One-time devices cost" : "Costo único de dispositivos"}:
          </span>
          <span>€{totals.oneTimeTotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "IVA (21%)" : "IVA (21%)"}:
          </span>
          <span>€{totals.productTax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground flex items-center">
            <Truck size={14} className="mr-1" />
            {language === 'en' ? "Shipping" : "Envío"} (€14.99 × {totals.totalDeviceCount}):
          </span>
          <span>€{totals.totalShipping.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "Shipping IVA (21%)" : "IVA de envío (21%)"}:
          </span>
          <span>€{totals.shippingTax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-4 pt-2 border-t border-gray-100">
          <span className="font-medium">
            {language === 'en' ? "Total one-time cost" : "Costo único total"}:
          </span>
          <span className="font-bold">€{totals.totalWithShipping.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "Monthly subscription" : "Suscripción mensual"}:
          </span>
          <span>€{totals.totalMonthlyBase.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "IVA (10%)" : "IVA (10%)"}:
          </span>
          <span>€{totals.monthlyTax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between pt-2 border-t border-gray-100">
          <span className="font-medium">
            {language === 'en' ? "Total monthly cost" : "Costo mensual total"}:
          </span>
          <span className="font-bold">€{totals.totalWithMonthlyTax.toFixed(2)}</span>
        </div>
      </div>
      
      {getDiscountText() && (
        <div className="text-sm text-green-600 italic mt-2 text-right">
          {getDiscountText()}
        </div>
      )}
      
      <div className="bg-ice-50 p-4 text-sm rounded-lg my-6 flex items-start">
        <Info size={16} className="text-ice-600 mr-2 mt-0.5 flex-shrink-0" />
        <span>
          {language === 'en' 
            ? "All prices are subject to IVA. One-time purchases include 21% IVA, monthly fees include 10% IVA. Shipping fee of €14.99 applies per device. AI Guardian service is included free of charge." 
            : "Todos los precios incluyen IVA. Las compras únicas incluyen 21% de IVA, las cuotas mensuales incluyen 10% de IVA. Se aplica una tarifa de envío de €14.99 por dispositivo. El servicio AI Guardian se incluye de forma gratuita."}
        </span>
      </div>
      
      <ButtonCustom 
        className="w-full mt-4 text-lg py-6" 
        onClick={onCheckout}
      >
        {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
      </ButtonCustom>
    </div>
  );
};

export default OrderSummary;
