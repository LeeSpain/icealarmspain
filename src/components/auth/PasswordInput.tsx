
import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import AuthInput from "./AuthInput";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete?: string;
  hasError: boolean;
  errorMessage?: string;
  language: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  hasError,
  errorMessage,
  language
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <AuthInput
      id={id}
      name={name}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      icon={Lock}
      hasError={hasError}
      errorMessage={errorMessage}
      language={language}
      rightElement={
        <button
          type="button"
          onClick={togglePassword}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      }
    />
  );
};

export default PasswordInput;
