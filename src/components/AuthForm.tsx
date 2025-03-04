
import React from "react";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import "react-toastify/dist/ReactToastify.css";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess?: (email: string, password: string, rememberMe?: boolean) => void;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  mode, 
  onSuccess, 
  isLoading, 
  error,
  redirectTo 
}) => {
  console.log("AuthForm rendering, mode:", mode, "redirectTo:", redirectTo, "error:", error);
  
  return (
    <>
      {mode === "login" ? (
        <LoginForm 
          onSuccess={onSuccess} 
          isLoading={isLoading} 
          error={error}
          redirectTo={redirectTo} 
        />
      ) : (
        <SignupForm 
          onSuccess={onSuccess} 
          isLoading={isLoading}
          error={error}
          redirectTo={redirectTo} 
        />
      )}
    </>
  );
};

export default AuthForm;
