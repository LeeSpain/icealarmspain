
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RememberMeProps {
  checked: boolean;
  onChange: () => void;
  language: string;
}

export const RememberMe: React.FC<RememberMeProps> = ({ 
  checked, 
  onChange, 
  language 
}) => {
  const rememberMeText = language === 'en' ? "Remember me" : "Recordarme";
  
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="rememberMe" 
        checked={checked} 
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-ice-600 data-[state=checked]:border-ice-600"
      />
      <Label 
        htmlFor="rememberMe" 
        className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
      >
        {rememberMeText}
      </Label>
    </div>
  );
};
