
import React, { useState } from "react";
import { Info, Copy, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { paymentContent } from "../constants/paymentContent";

interface BankTransferInfoProps {
  language: 'en' | 'es';
}

const BankTransferInfo: React.FC<BankTransferInfoProps> = ({ language }) => {
  const content = paymentContent[language];
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const bankDetails = {
    bankName: "Banco Santander",
    accountName: "ICE Alarm España S.L.",
    iban: "ES91 2100 0418 4502 0005 1332",
    swift: "CAIXESBBXXX",
    reference: "ORD-" + Math.floor(100000 + Math.random() * 900000)
  };
  
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast({
        description: language === 'en' 
          ? `Copied ${field} to clipboard` 
          : `${field} copiado al portapapeles`,
        duration: 2000,
      });
      
      setTimeout(() => setCopiedField(null), 2000);
    });
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
      
      {/* Changed from variant="warning" to variant="default" with custom styling */}
      <Alert variant="default" className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-sm">
          {language === 'en'
            ? "Important: Please include your reference number in the transfer description so we can identify your payment."
            : "Importante: Por favor incluya su número de referencia en la descripción de la transferencia para que podamos identificar su pago."}
        </AlertDescription>
      </Alert>
      
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
                onClick={() => copyToClipboard(bankDetails.iban, language === 'en' ? "IBAN" : "IBAN")}
                aria-label={language === 'en' ? "Copy IBAN" : "Copiar IBAN"}
              >
                {copiedField === "IBAN" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {language === 'en' ? "SWIFT/BIC:" : "SWIFT/BIC:"}
            </span>
            <div className="flex items-center">
              <span className="font-mono">{bankDetails.swift}</span>
              <Button 
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-1"
                onClick={() => copyToClipboard(bankDetails.swift, language === 'en' ? "SWIFT" : "SWIFT")}
                aria-label={language === 'en' ? "Copy SWIFT" : "Copiar SWIFT"}
              >
                {copiedField === "SWIFT" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-medium">
              {language === 'en' ? "Reference:" : "Referencia:"}
            </span>
            <div className="flex items-center">
              <span className="font-medium text-ice-600">{bankDetails.reference}</span>
              <Button 
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-1"
                onClick={() => copyToClipboard(bankDetails.reference, language === 'en' ? "Reference" : "Referencia")}
                aria-label={language === 'en' ? "Copy Reference" : "Copiar Referencia"}
              >
                {copiedField === "Reference" || copiedField === "Referencia" ? 
                  <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border rounded-md bg-white">
        <h3 className="font-medium text-sm mb-2">
          {language === 'en' ? "Transfer Instructions" : "Instrucciones de Transferencia"}
        </h3>
        <ol className="space-y-2 text-sm list-decimal pl-5">
          <li>
            {language === 'en'
              ? "Log in to your online banking or visit your local bank branch."
              : "Inicie sesión en su banca online o visite su sucursal bancaria local."}
          </li>
          <li>
            {language === 'en'
              ? "Set up a new payee/recipient using the bank details above."
              : "Configure un nuevo beneficiario utilizando los datos bancarios anteriores."}
          </li>
          <li>
            {language === 'en'
              ? "Enter the amount to be transferred."
              : "Ingrese el monto a transferir."}
          </li>
          <li className="font-medium">
            {language === 'en'
              ? "IMPORTANT: Include your reference number in the transfer description."
              : "IMPORTANTE: Incluya su número de referencia en la descripción de la transferencia."}
          </li>
          <li>
            {language === 'en'
              ? "Complete the transfer and save or take a screenshot of the confirmation."
              : "Complete la transferencia y guarde o tome una captura de pantalla de la confirmación."}
          </li>
        </ol>
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
