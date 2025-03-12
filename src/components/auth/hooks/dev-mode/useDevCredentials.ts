
import { useEffect } from "react";
import { isDevelopmentMode, getTestCredentials } from "@/context/auth/utils";

interface LoginFormData {
  email: string;
  password: string;
}

export const useDevCredentials = (
  formData: LoginFormData,
  setFormData: (data: (prev: LoginFormData) => LoginFormData) => void
) => {
  // Initialize with test credentials in development mode
  useEffect(() => {
    const isDevMode = isDevelopmentMode();
    if (isDevMode && !formData.email) {
      const testCreds = getTestCredentials().admin;
      setFormData(prev => ({ 
        ...prev, 
        email: testCreds.email, 
        password: testCreds.password 
      }));
      console.log('Development mode detected, pre-filling admin test credentials');
    }
  }, [formData.email, setFormData]);
};
