
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface OrderHeaderProps {
  language: boolean; // Using this prop to determine if we have a data issue
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ language: hasDataIssue }) => {
  const { language } = useLanguage();
  
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-ice-600" />
          {language === 'en' ? "Order Summary" : "Resumen del Pedido"}
        </CardTitle>
      </CardHeader>
      
      {hasDataIssue && (
        <div className="bg-yellow-50 p-3 rounded-md text-xs mb-4 border border-yellow-200">
          <p className="text-yellow-700">
            {language === 'en' 
              ? "Data is still loading. If this persists, please refresh the page." 
              : "Los datos aún se están cargando. Si persiste, actualice la página."}
          </p>
        </div>
      )}
    </>
  );
};

export default OrderHeader;
