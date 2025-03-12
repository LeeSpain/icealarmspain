
import React from "react";
import PasswordInput from "../PasswordInput";

interface PasswordSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  errorMessage?: string;
  language: string;
}

export const PasswordSection: React.FC<PasswordSectionProps> = ({
  value,
  onChange,
  hasError,
  errorMessage,
  language
}) => {
  return (
    <PasswordInput
      id="password"
      name="password"
      value={value}
      onChange={onChange}
      placeholder={language === 'en' ? "••••••••" : "••••••••"}
      autoComplete="current-password"
      hasError={hasError}
      errorMessage={errorMessage}
      language={language}
    />
  );
};
