
import { useState, useEffect } from "react";

export const useRememberMe = (
  formData: { email: string; password: string }, 
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  const [rememberMe, setRememberMe] = useState(false);
  
  // Check for remembered email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      handleChange({ target: { name: 'email', value: savedEmail } } as React.ChangeEvent<HTMLInputElement>);
      setRememberMe(true);
    }
  }, [handleChange]);
  
  // Handle remember me changes
  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };
  
  // Save email for next login if rememberMe is checked
  const handleRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };
  
  return { rememberMe, handleRememberMeChange, handleRememberMe };
};
