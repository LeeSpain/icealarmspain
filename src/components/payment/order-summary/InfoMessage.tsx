
import React from "react";
import { Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const InfoMessage: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-ice-50 p-3 rounded-md text-xs flex mt-4">
      <Info className="h-4 w-4 text-ice-500 mr-2 flex-shrink-0 mt-0.5" />
      <p>
        {language === 'en' 
          ? "Your first payment will be processed now. Monthly charges will begin after your devices are delivered and activated." 
          : "Tu primer pago se procesará ahora. Los cargos mensuales comenzarán después de que tus dispositivos sean entregados y activados."}
      </p>
    </div>
  );
};

export default InfoMessage;
