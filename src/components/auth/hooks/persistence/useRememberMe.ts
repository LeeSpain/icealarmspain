
import { useState, useEffect } from "react";

export const useRememberMe = () => {
  const [rememberMe, setRememberMe] = useState(false);
  
  // Load saved email if it exists
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setRememberMe(true);
    }
  }, []);

  // Handle remember me toggle
  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  // Save or remove email from storage based on remember me setting
  const handleRememberMe = () => {
    console.log("Remember me handler executed, state:", rememberMe);
  };

  return { 
    rememberMe, 
    handleRememberMeChange, 
    handleRememberMe 
  };
};
