
import React from "react";
import { Info } from "lucide-react";

interface InfoNoticeProps {
  language: string;
}

const InfoNotice: React.FC<InfoNoticeProps> = ({ language }) => {
  return (
    <div className="bg-ice-50 p-4 text-sm rounded-lg my-6 flex items-start">
      <Info size={16} className="text-ice-600 mr-2 mt-0.5 flex-shrink-0" />
      <span>
        {language === 'en' 
          ? "All prices are subject to IVA. One-time purchases include 21% IVA, monthly fees include 10% IVA. Shipping fee of €14.99 applies per device. AI Guardian service is included free of charge." 
          : "Todos los precios incluyen IVA. Las compras únicas incluyen 21% de IVA, las cuotas mensuales incluyen 10% de IVA. Se aplica una tarifa de envío de €14.99 por dispositivo. El servicio AI Guardian se incluye de forma gratuita."}
      </span>
    </div>
  );
};

export default InfoNotice;
