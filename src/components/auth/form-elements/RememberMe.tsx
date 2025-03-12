
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  language: string;
}

export const RememberMe: React.FC<RememberMeProps> = ({ 
  checked, 
  onChange,
  language
}) => {
  const handleToggle = (checked: boolean) => {
    console.log(`Remember me toggleCheck: ${checked}`);
    onChange(checked);
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="remember-me" 
        checked={checked} 
        onCheckedChange={handleToggle}
      />
      <label
        htmlFor="remember-me"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {language === 'en' ? "Remember me" : "Recordar"}
      </label>
    </div>
  );
};
