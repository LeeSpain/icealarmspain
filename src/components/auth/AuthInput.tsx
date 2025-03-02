
import React from "react";
import { LucideIcon } from "lucide-react";

interface AuthInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete?: string;
  icon: LucideIcon | null;
  hasError: boolean;
  errorMessage?: string;
  rightElement?: React.ReactNode;
  language: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  icon: Icon,
  hasError,
  errorMessage,
  rightElement,
  language
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {name}{name !== (language === 'en' ? "Phone Number" : "Número de Teléfono") && "*"}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        </div>
        <input
          id={id}
          name={id} // Fixed: Now using the id prop directly as the name
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className={`${Icon ? 'pl-10' : 'pl-3'} ${rightElement ? 'pr-10' : ''} block w-full border ${
            hasError ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-ice-500 focus:border-ice-500`}
          placeholder={placeholder}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {hasError && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default AuthInput;
