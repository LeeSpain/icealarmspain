
import React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PayPalOptionProps {
  language: 'en' | 'es';
}

const PayPalOption: React.FC<PayPalOptionProps> = ({ language }) => {
  const content = {
    en: "PayPal",
    es: "PayPal"
  };

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="paypal" id="paypal" />
      <Label htmlFor="paypal">
        <span className="flex items-center">
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.067 8.307C20.067 11.328 18.24 13.25 15.5 13.25H14.346C14.051 13.25 13.792 13.47 13.729 13.759L13.052 17.308L12.555 20.199C12.538 20.312 12.443 20.396 12.329 20.396H9.8C9.57 20.396 9.39 20.191 9.425 19.965L9.95 16.682L10.822 11.517C10.859 11.269 11.071 11.089 11.324 11.089H15C17.73 11.089 19.5 9.322 19.5 6.695C19.5 4.912 18.488 3.5 16.5 3.5H9.5C9.224 3.5 8.98 3.706 8.914 3.975L6 17C5.946 17.229 6.118 17.45 6.353 17.45H9C9.224 17.45 9.425 17.28 9.477 17.062L10.151 13.607" stroke="#26A0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {language === 'en' ? content.en : content.es}
        </span>
      </Label>
    </div>
  );
};

export default PayPalOption;
