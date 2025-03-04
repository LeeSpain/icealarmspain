
import React from "react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight } from "lucide-react";

interface LoginFormActionsProps {
  isLoading: boolean;
  loginText: string;
  loadingText: string;
}

export const LoginFormActions: React.FC<LoginFormActionsProps> = ({ 
  isLoading, 
  loginText, 
  loadingText 
}) => {
  return (
    <div>
      <ButtonCustom
        type="submit"
        className="w-full flex justify-center"
        isLoading={isLoading}
        disabled={isLoading}
      >
        {!isLoading && (
          <>
            {loginText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
        {isLoading && (loadingText)}
      </ButtonCustom>
    </div>
  );
};
