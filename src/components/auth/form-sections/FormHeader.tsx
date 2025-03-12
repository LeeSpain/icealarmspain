
import React from "react";
import { DevelopmentModeAlert } from "../form-elements/DevelopmentModeAlert";
import { LoginError } from "../form-elements/LoginError";

interface FormHeaderProps {
  error: string | null;
  language: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ error, language }) => {
  return (
    <>
      <DevelopmentModeAlert language={language} />
      <LoginError error={error} />
    </>
  );
};
