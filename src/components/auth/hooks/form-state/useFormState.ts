
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
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    
    // Direct state update using function form
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const clearFieldError = (fieldName: string) => {
    setErrors(prev => ({ ...prev, [fieldName]: "" }));
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    clearFieldError
  };
};
