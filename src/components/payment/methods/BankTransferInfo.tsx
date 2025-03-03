
import React from "react";
import { Info, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BankTransferInfoProps {
  language: 'en' | 'es';
}

const BankTransferInfo: React.FC<BankTransferInfoProps> = ({ language }) => {
  const [copied, setCopied] = React.useState(false);
  
  const bankDetails = {
    bankName: "Banco Santander",
    accountName: "ICE Alarm España S.L.",
    iban: "ES91 2100 0418 4502 0005 1332",
    swift: "CAIXESBBXXX",
    reference: "ORD-" + Math.floor(100000 + Math.random() * 900000)
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="mt-6 space-y-4">
      <div className="p-4 bg-muted rounded-md flex items-start">
        <Info className="w-5 h-5 text-ice-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm">
          {language === 'en' 
            ? "You will receive our bank details to complete the transfer. Your order will be processed after payment confirmation."
            : "Recibirá nuestros datos bancarios para completar la transferencia. Su pedido se procesará después de la confirmación del pago."}
        </p>
      </div>
      
      <div className="border rounded-md p-4">
        <h3 className="font-medium text-sm mb-3">
          {language === 'en' ? "Bank Transfer Details" : "Detalles de Transferencia Bancaria"}
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {language === 'en' ? "Bank:" : "Banco:"}
            </span>
            <span>{bankDetails.bankName}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {language === 'en' ? "Account Name:" : "Nombre de Cuenta:"}
            </span>
            <span>{bankDetails.accountName}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">
              {language === 'en' ? "IBAN:" : "IBAN:"}
            </span>
            <div className="flex items-center">
              <span className="font-mono">{bankDetails.iban}</span>
              <Button 
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-1"
                onClick={() => copyToClipboard(bankDetails.iban)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {language === 'en' ? "SWIFT/BIC:" : "SWIFT/BIC:"}
            </span>
            <span className="font-mono">{bankDetails.swift}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">
              {language === 'en' ? "Reference:" : "Referencia:"}
            </span>
            <div className="flex items-center">
              <span className="font-medium text-ice-600">{bankDetails.reference}</span>
              <Button 
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-1"
                onClick={() => copyToClipboard(bankDetails.reference)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        <p>
          {language === 'en' 
            ? "Please include the reference number in your transfer. Payments typically process within 1-3 business days."
            : "Por favor incluya el número de referencia en su transferencia. Los pagos generalmente se procesan dentro de 1-3 días hábiles."}
        </p>
      </div>
    </div>
  );
};

export default BankTransferInfo;
