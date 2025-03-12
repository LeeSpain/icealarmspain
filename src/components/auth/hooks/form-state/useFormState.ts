
import { useState, useEffect } from "react";

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

  // Make sure the handleChange function properly updates the form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changing to: ${value}`);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
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
