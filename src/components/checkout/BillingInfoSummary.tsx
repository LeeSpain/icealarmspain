
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import OrderSummary from "@/components/payment/OrderSummary";

interface BillingInfoSummaryProps {
  billingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
  };
  orderData: any;
  onEditClick: () => void;
}

const BillingInfoSummary: React.FC<BillingInfoSummaryProps> = ({
  billingInfo,
  orderData,
  onEditClick
}) => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="font-medium">
            {language === 'en' ? 'Billing Information' : 'Información de Facturación'}
          </h3>
          
          <div className="text-sm space-y-2">
            <p><span className="font-medium">{language === 'en' ? 'Name:' : 'Nombre:'}</span> {billingInfo.firstName} {billingInfo.lastName}</p>
            <p><span className="font-medium">{language === 'en' ? 'Email:' : 'Correo:'}</span> {billingInfo.email}</p>
            <p><span className="font-medium">{language === 'en' ? 'Address:' : 'Dirección:'}</span> {billingInfo.address}</p>
            <p><span className="font-medium">{language === 'en' ? 'City:' : 'Ciudad:'}</span> {billingInfo.city}</p>
            <p><span className="font-medium">{language === 'en' ? 'Country:' : 'País:'}</span> {billingInfo.country}</p>
            <p><span className="font-medium">{language === 'en' ? 'Postal Code:' : 'Código Postal:'}</span> {billingInfo.postalCode}</p>
            <p><span className="font-medium">{language === 'en' ? 'Phone:' : 'Teléfono:'}</span> {billingInfo.phone}</p>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={onEditClick}
          >
            {language === 'en' ? 'Edit Billing Info' : 'Editar Información de Facturación'}
          </Button>
        </div>
        
        <Separator className="my-6" />
        
        <OrderSummary orderData={orderData} />
      </CardContent>
    </Card>
  );
};

export default BillingInfoSummary;
