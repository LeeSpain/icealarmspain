
import React from "react";

interface BankTransferInfoProps {
  language: 'en' | 'es';
}

const BankTransferInfo: React.FC<BankTransferInfoProps> = ({ language }) => {
  return (
    <div className="mt-6 p-4 bg-muted rounded-md">
      <p className="text-sm">
        {language === 'en' 
          ? "You will receive our bank details to complete the transfer. Your order will be processed after payment confirmation."
          : "Recibirá nuestros datos bancarios para completar la transferencia. Su pedido se procesará después de la confirmación del pago."}
      </p>
    </div>
  );
};

export default BankTransferInfo;
