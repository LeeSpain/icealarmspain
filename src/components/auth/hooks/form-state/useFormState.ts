
import { useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

export const useFormState = (initialEmail: string = "") => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: initialEmail,
    password: "",
  });
  
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  };

  return {
    formData,
    setFormData,
    rememberMe,
    setRememberMe,
    errors,
    setErrors,
    handleChange,
    handleRememberMeChange,
    clearFieldError
  };
};
