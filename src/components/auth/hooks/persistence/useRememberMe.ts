
import { useState, useEffect } from "react";

export const useRememberMe = () => {
  const [rememberMe, setRememberMe] = useState(false);

  // Load remembered state from localStorage
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setRememberMe(true);
    }
  }, []);

  const handleRememberMe = (email: string, checked: boolean) => {
    console.log("Remember me changed:", checked, "for email:", email);
    
    if (checked) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    console.log("Setting remember me state to:", checked);
    setRememberMe(checked);
  };

  return {
    rememberMe,
    handleRememberMe,
    handleRememberMeChange
  };
};
