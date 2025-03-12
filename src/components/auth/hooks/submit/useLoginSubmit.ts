
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../AuthFormUtils";

interface LoginFormData {
  email: string;
  password: string;
}

interface UseLoginSubmitProps {
  language: string;
  setErrors: (errors: {[key: string]: string}) => void;
  setInternalLoading: (loading: boolean) => void;
  setInternalError: (error: string | null) => void;
  clearError: () => void;
  externalLoading?: boolean;
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  redirectTo?: string;
}

export const useLoginSubmit = ({
  language,
  setErrors,
  setInternalLoading,
  setInternalError,
  clearError,
  externalLoading,
  onSubmit,
  onSuccess,
  redirectTo
}: UseLoginSubmitProps) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (
    e: React.FormEvent,
    formData: LoginFormData,
    rememberMe: boolean,
    handleRememberMe: (email: string, remember: boolean) => void,
    isLoading: boolean
  ) => {
    e.preventDefault();
    console.log("Login form submitted with:", formData);
    
    // Validate form
    const newErrors = validateForm(formData, "login", language);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors);
      return;
    }
    
    // Clear any previous errors
    clearError();
    
    // Set loading state if external loading is not being managed
    if (externalLoading === undefined) {
      setInternalLoading(true);
    }
    
    try {
      console.log("Attempting login with credential:", formData.email);
      
      if (onSuccess) {
        console.log("Using external onSuccess handler");
        await onSuccess(formData.email, formData.password, rememberMe);
      } else if (onSubmit) {
        console.log("Using external onSubmit handler");
        await onSubmit(formData.email, formData.password, rememberMe);
      } else {
        console.log("Using internal login flow");
        // Use the provided password for login
        const userData = await login(formData.email, formData.password, rememberMe);
        
        console.log("Login successful, user data:", userData);
        
        // Handle remember me preference
        handleRememberMe(formData.email, rememberMe);
        
        // Show success toast
        toast({
          title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
          description: language === 'en' 
            ? `Welcome back, ${userData.displayName || userData.email?.split('@')[0] || 'User'}!` 
            : `Bienvenido de nuevo, ${userData.displayName || userData.email?.split('@')[0] || 'Usuario'}!`,
          duration: 3000,
        });
        
        // Determine correct redirect based on role
        let targetUrl = "/dashboard";
        
        if (userData.role === 'admin') {
          targetUrl = "/admin";
          console.log("Admin role detected, redirecting to /admin");
        } else if (userData.role === 'callcenter') {
          targetUrl = "/call-center";
          console.log("Call center role detected, redirecting to /call-center");
        } else {
          console.log("Member role detected, redirecting to /dashboard");
        }
        
        // Override with redirectTo if specified
        if (redirectTo) {
          console.log("Override redirect to:", redirectTo);
          targetUrl = redirectTo;
        }
        
        console.log("Final redirect target:", targetUrl);
        
        // CRITICAL FIX: Use navigate instead of window.location to prevent page freeze
        navigate(targetUrl);
      }
    } catch (error) {
      console.error("Login error:", error);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log("Login error message:", errorMessage);
      setInternalError(errorMessage);
      
      toast({
        title: language === 'en' ? "Login Failed" : "Error de inicio de sesión",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      if (externalLoading === undefined) {
        setInternalLoading(false);
      }
    }
  };

  return { handleSubmit };
};
