
import React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface BankTransferOptionProps {
  language: 'en' | 'es';
}

const BankTransferOption: React.FC<BankTransferOptionProps> = ({ language }) => {
  const content = {
    en: "Bank Transfer",
    es: "Transferencia Bancaria"
  };

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="bank_transfer" id="bank_transfer" />
      <Label htmlFor="bank_transfer">
        <span className="flex items-center">
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21H21M3 18H21M5 10H19C20.1046 10 21 9.10457 21 8V7C21 6.44772 20.5523 6 20 6H4C3.44772 6 3 6.44772 3 7V8C3 9.10457 3.89543 10 5 10ZM6 14H6.01M9 14H9.01M12 14H12.01M15 14H15.01M18 14H18.01M12 6L14 3H10L12 6Z" stroke="#6E56CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {language === 'en' ? content.en : content.es}
        </span>
      </Label>
    </div>
  );
};

export default BankTransferOption;
