
import { useEffect } from "react";

export const useRememberMe = (
  setEmail: (email: string) => void, 
  setRememberMeState: (state: boolean) => void
) => {
  // Load saved email if it exists
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMeState(true);
    }
  }, [setEmail, setRememberMeState]);

  // Save or remove email from storage based on remember me setting
  const handleRememberMe = (email: string, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  return { handleRememberMe };
};
