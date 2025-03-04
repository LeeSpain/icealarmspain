
import React from "react";
import { Mail } from "lucide-react";
import AuthInput from "../AuthInput";

interface EmailSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  errorMessage?: string;
  language: string;
}

export const EmailSection: React.FC<EmailSectionProps> = ({
  value,
  onChange,
  hasError,
  errorMessage,
  language
}) => {
  const emailLabel = language === 'en' ? "Email" : "Correo electrónico";
  
  return (
    <AuthInput
      id="email"
      name={emailLabel}
      type="email"
      value={value}
      onChange={onChange}
      placeholder={language === 'en' ? "your.email@example.com" : "tu.correo@ejemplo.com"}
      autoComplete="email"
      icon={Mail}
      hasError={hasError}
      errorMessage={errorMessage}
      language={language}
    />
  );
};
